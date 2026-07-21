import net from "net";
import tls from "tls";

const user = process.argv[2] || "lgh333@protonmail.com";
const pass = process.argv[3] || "wQmXPxzrN4MmVhQ9CZPVVg";

function testIMAP(mode) {
  return new Promise((resolve) => {
    let socket = net.connect(1143, "127.0.0.1");
    let step = 0;
    let buf = "";
    const send = (cmd) => {
      if (cmd) socket.write(`${cmd}\r\n`);
    };
    const finish = (msg) => {
      try {
        socket.destroy();
      } catch {}
      resolve(msg);
    };

    socket.on("data", (d) => {
      buf += d.toString();
      if (step === 0 && buf.includes("* OK")) {
        step = 1;
        if (mode === "starttls") send("A001 STARTTLS");
        else {
          send(`A002 LOGIN "${user}" "${pass}"`);
          step = 3;
        }
      } else if (step === 1 && buf.includes("A001 OK")) {
        step = 2;
        socket = tls.connect({
          socket,
          servername: "127.0.0.1",
          rejectUnauthorized: false,
        });
        buf = "";
        socket.on("data", (d2) => {
          buf += d2.toString();
          if (step === 2 && buf.includes("* OK")) {
            step = 3;
            send(`A002 LOGIN "${user}" "${pass}"`);
          } else if (
            step === 3 &&
            (buf.includes("A002 OK") ||
              buf.includes("A002 NO") ||
              buf.includes("A002 BAD"))
          ) {
            finish(
              `${mode}: ${buf
                .split("\r\n")
                .filter((l) => l.startsWith("A002"))
                .join(" | ")}`
            );
          }
        });
        socket.on("error", (e) => finish(`${mode} TLS error: ${e.message}`));
      } else if (
        step === 3 &&
        (buf.includes("A002 OK") ||
          buf.includes("A002 NO") ||
          buf.includes("A002 BAD"))
      ) {
        finish(
          `${mode}: ${buf
            .split("\r\n")
            .filter((l) => l.startsWith("A002"))
            .join(" | ")}`
        );
      }
    });

    socket.on("error", (e) => finish(`${mode} error: ${e.message}`));
    setTimeout(
      () => finish(`${mode}: timeout buf=${buf.slice(0, 300)}`),
      8000
    );
  });
}

console.log(await testIMAP("starttls"));
console.log(await testIMAP("plain"));

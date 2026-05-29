const fs = require('fs');
const readline = require('readline');

async function extractProtocol() {
  const fileStream = fs.createReadStream('C:\\Users\\zh577\\.gemini\\antigravity\\brain\\201ac977-c3b7-4c3f-985b-76cd56355cbf\\.system_generated\\logs\\transcript.jsonl');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const obj = JSON.parse(line);
      if (obj.type === 'USER_INPUT' && obj.content && obj.content.includes('# THE LIGHTHOUSE PROTOCOL')) {
        fs.writeFileSync('C:\\Users\\zh577\\.gemini\\antigravity\\scratch\\jasoncholloway\\protocol.md', obj.content);
        console.log('Protocol extracted to protocol.md');
        return;
      }
    } catch (e) {
      // ignore
    }
  }
}

extractProtocol();

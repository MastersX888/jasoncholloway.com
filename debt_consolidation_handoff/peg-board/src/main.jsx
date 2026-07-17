import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PegBoard from "../../scp-peg-board.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PegBoard />
  </StrictMode>,
);

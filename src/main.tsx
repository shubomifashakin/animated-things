import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ImageToggle from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ImageToggle />
  </StrictMode>
);

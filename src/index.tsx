import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const rootElement = document.createElement("div");
rootElement.id = "f1-app";
const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
    position: fixed;
    left: 0;
    top: 0;
    width: 260px;
    height: 100vh;
    background: #ffffff;
    border-right: 1px solid #c2c2c2;
    z-index: 999;
  }
`;
rootElement.appendChild(globalStyles);
document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

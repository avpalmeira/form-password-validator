import React from "react";
import ReactDOM from "react-dom/client";
import Form from "./Form";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>
);

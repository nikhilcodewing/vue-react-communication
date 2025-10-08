import React from "react";
import { createRoot } from "react-dom/client";
import ReactApp from "./App.jsx";

// Function to mount React app
export const mountReactApp = (containerId, props = {}) => {
  const container = document.getElementById(containerId);
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(ReactApp, props));
    return root;
  }
  return null;
};

// Function to unmount React app
export const unmountReactApp = (root) => {
  if (root) {
    root.unmount();
  }
};

// Auto-mount if container exists
if (document.getElementById("react-app-container")) {
  mountReactApp("react-app-container");
}

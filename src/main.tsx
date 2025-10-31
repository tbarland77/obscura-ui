import { mountApp } from "./mount-app";

const container = document.getElementById("root");
if (!container) {
    throw new Error("Root element not found");
}

mountApp(container);

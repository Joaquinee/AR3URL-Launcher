import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster position="top-left" />
  </React.StrictMode>
);

window.ipcRenderer.on("update-available", () => {
  toast("Mise à jour disponible", {
    id: "update-available",
    duration: 5000,
    icon: "🔄",
  });
});

window.ipcRenderer.on("update-downloaded", () => {
  toast.success("Mise à jour téléchargée, redémarrage en cours...", {
    id: "update-downloaded",
    duration: 5000,
  });
});

window.ipcRenderer.on("update-not-available", () => {
  toast("Aucune mise à jour disponible", {
    id: "update-not-available",
    duration: 5000,
    icon: "🔰",
  });
});

//ALL MESSAGES ERROR
window.ipcRenderer.on("main-process-message", (_event, message) => {
  const commonToastStyle = {
    style: {
      background: "#333",
      color: "#fff",
    },
    duration: 1500,
  };

  if (!message || !message.message) return;
  const isSuccess = message.success && message.success.length > 0;
  const isError = message.error && message.error.length > 0;

  if (!isSuccess && !isError) return;

  if (isError) {
    toast.error(message.error, {
      id: `${message.message}-error`,
      ...commonToastStyle,
    });
    return;
  }
  if (isSuccess) {
    // Ne pas afficher si le message est juste un nombre
    if (!isNaN(Number(message.success))) return;

    const duration =
      message.message === "updateMod-needed" ? 5000 : commonToastStyle.duration;
    toast.success(message.success, {
      id: `${message.message}-success`,
      ...commonToastStyle,
      duration,
    });
  }
});

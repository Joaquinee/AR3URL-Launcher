import { useState, useEffect, useCallback } from "react";
import { config } from "../config/config";

export default function Footer() {
  // Regrouper les états initiaux
  const initialStates = {
    progress: 0,
    currentFile: "",
    readyButton: localStorage.getItem("readyButton") === "true",
    isUpdating: localStorage.getItem("isUpdating") === "true",
    requiredPath: localStorage.getItem("requiredPath") !== "false",
    updateModNeeded: localStorage.getItem("updateModNeeded") === "true",
    modInstalled: localStorage.getItem("modInstalled") === "true",
  };

  const [progress, setProgress] = useState(initialStates.progress);
  const [currentFile, setCurrentFile] = useState(initialStates.currentFile);
  const [fileProgress, setFileProgress] = useState(0);
  const [readyButton, setReadyButton] = useState(initialStates.readyButton);
  const [isUpdating, setIsUpdating] = useState(initialStates.isUpdating);
  const [requiredPath, setRequiredPath] = useState(initialStates.requiredPath);
  const [modInstalled, setModInstalled] = useState(initialStates.modInstalled);
  const [updateModNeeded, setUpdateModNeeded] = useState(
    initialStates.updateModNeeded
  );
  const [timeRemaining, setTimeRemaining] = useState("");
  const [downloading, setDownloading] = useState(false);

  const updateLocalStorage = useCallback((states: Record<string, boolean>) => {
    Object.entries(states).forEach(([key, value]) => {
      localStorage.setItem(key, value.toString());
    });
  }, []);

  window.ipcRenderer.on("main-process-message", (_, data) => {
    if (data.message === "download-start") {
      setDownloading(true);
    }
  });
  const handleUpdate = useCallback(() => {
    if (downloading) {
      return;
    }
    setIsUpdating(true);
    window.ipcRenderer.send("download-mods");
  }, [downloading]);

  useEffect(() => {
    const handleMainProcessMessage = (
      _event: Electron.IpcRendererEvent,
      message: {
        message: string;
        success?: string;
        data?: string;
        error?: string;
        fileProgress?: string;
        timeRemaining?: string;
      }
    ) => {
      switch (message.message) {
        case "updateMod-needed":
          setUpdateModNeeded(true);
          break;
        case "arma3Path-loaded":
          setIsUpdating(false);
          setReadyButton(true);
          setRequiredPath(false);
          updateLocalStorage({
            isUpdating: false,
            readyButton: true,
            requiredPath: false,
          });
          break;
        case "arma3Path-not-loaded":
          setRequiredPath(true);
          setIsUpdating(false);
          setReadyButton(false);
          updateLocalStorage({
            requiredPath: true,
            isUpdating: false,
            readyButton: false,
          });
          break;
        case "arma3Path-ready":
          setRequiredPath(false);
          setIsUpdating(false);
          setReadyButton(true);
          updateLocalStorage({
            requiredPath: false,
            isUpdating: false,
            readyButton: true,
          });
          break;
        case "arma3Path-mod-loaded":
          setModInstalled(true);
          localStorage.setItem("modInstalled", "true");
          break;
        case "arma3Path-mod-not-loaded":
          setModInstalled(false);
          localStorage.setItem("modInstalled", "false");
          break;
        case "download-progress":
          if (message.success) {
            setProgress(parseInt(message.success));
          }
          if (message.data) {
            setCurrentFile(message.data);
          }
          if (message.fileProgress) {
            setFileProgress(parseInt(message.fileProgress));
          }
          if (message.timeRemaining) {
            setTimeRemaining(message.timeRemaining);
          }
          break;
        case "download-stop":
          setIsUpdating(false);
          setDownloading(false);
          setProgress(0);
          setCurrentFile("");
          setFileProgress(0);
          setUpdateModNeeded(true);
          setReadyButton(false);
          updateLocalStorage({
            isUpdating: false,
            updateModNeeded: true,
            readyButton: false,
          });
          break;
        case "download-complete":
          setIsUpdating(false);
          setDownloading(false);
          setProgress(0);
          setCurrentFile("");
          setFileProgress(0);
          setUpdateModNeeded(false);
          updateLocalStorage({
            isUpdating: false,
            updateModNeeded: false,
          });
          break;
      }
    };
    window.ipcRenderer.on("main-process-message", handleMainProcessMessage);
    return () => {
      window.ipcRenderer.off("main-process-message", handleMainProcessMessage);
    };
  }, [updateLocalStorage]);

  const handleSelectPath = () => {
    window.ipcRenderer.send("locate-arma3");
  };
  return (
    <>
      <div className="relative  h-20 flex justify-between items-center px-5">
        {/* Zone centrale avec barre de progression */}
        <div className="flex-1 mx-4">
          {isUpdating ? (
            <div>
              {currentFile && (
                <>
                  <div className="text-sm text-white/80 mb-1">
                    Téléchargement de : {currentFile} ({fileProgress}%)
                  </div>
                  {/* Barre de progression du fichier actuel */}
                  <div className="w-full bg-black/25 rounded-full h-2 mb-2">
                    <div
                      className="bg-white/80 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${fileProgress}%` }}
                    ></div>
                  </div>
                  {/* Barre de progression globale */}
                  <div className="text-sm text-white/80 mb-1">
                    Progression totale : {progress}%{" "}
                    {timeRemaining && `(Temps restant : ${timeRemaining})`}
                  </div>
                  <div className="w-full bg-black/25 rounded-full h-2">
                    <div
                      className="bg-white/60 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div>
              <p>Bienvenue sur le serveur {config.serverName}</p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {requiredPath && (
            <button
              onClick={handleSelectPath}
              className="bg-black/33 hover:bg-black/50 text-white/90 px-6 py-2 rounded transition-colors duration-200"
            >
              Localiser Jeu
            </button>
          )}

          {!requiredPath &&
            (updateModNeeded || !modInstalled) &&
            !downloading && (
              <button
                onClick={handleUpdate}
                className="bg-black/33 hover:bg-black/50 text-white/90 px-6 py-2 rounded transition-colors duration-200"
              >
                {isUpdating ? "Mise à jour..." : "Mettre à jour"}
              </button>
            )}

          {!requiredPath && modInstalled && readyButton && !updateModNeeded && (
            <button
              onClick={() => {
                window.ipcRenderer.invoke("launch-game");
              }}
              className="bg-black/33 hover:bg-black/50 text-white/90 px-6 py-2 rounded transition-colors duration-200 cursor-pointer"
            >
              Jouer
            </button>
          )}
        </div>
      </div>
    </>
  );
}

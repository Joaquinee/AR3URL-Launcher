import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { setupIpcHandlers } from "./ipcHandler";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on("update-available", () => {
  if (win) {
    win.webContents.send("update-available");
  }
});

autoUpdater.on("update-downloaded", () => {
  if (win) {
    win.webContents.send("update-ready");
    setTimeout(() => {
      autoUpdater.quitAndInstall(false, true);
    }, 5000);
  }
});

autoUpdater.on("error", (err) => {
  if (win) {
    win.webContents.send("update-error", err.message);
  }
});

autoUpdater.on("checking-for-update", () => {
  if (win) {
    win.webContents.send("checking-update");
  }
});

autoUpdater.on("update-not-available", () => {
  if (win) {
    win.webContents.send("update-not-available");
  }
});
autoUpdater.on("download-progress", (progressObj) => {
  if (win) {
    win.webContents.send("update-progress", {
      percent: progressObj.percent,
      transferred: progressObj.transferred,
      total: progressObj.total,
      bytesPerSecond: progressObj.bytesPerSecond,
    });
  }
});
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (win) {
      if (win.isMinimized()) win.restore();
      win.focus();
    }
  });

  // eslint-disable-next-line no-inner-declarations
  function createWindow() {
    win = new BrowserWindow({
      icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
      autoHideMenuBar: true,
      height: 512,
      width: 800,
      frame: false,
      maximizable: false,
      minimizable: false,
      resizable: false,
      center: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.mjs"),
      },
    });

    setupIpcHandlers(win);

    autoUpdater.checkForUpdates().catch(console.error);

    if (VITE_DEV_SERVER_URL) {
      win.loadURL(VITE_DEV_SERVER_URL);
      win.webContents.openDevTools({
        mode: "detach",
      });
    } else {
      win.loadFile(path.join(RENDERER_DIST, "index.html"));
    }
  }

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
      win = null;
    }
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.whenReady().then(() => {
    createWindow();
  });
}

import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Params from "./components/Params";
import { config } from "./config/config";
import { useState } from "react";
import News from "./components/news";
export default function App() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState({
    percent: 0,
    transferred: 0,
    total: 0,
    bytesPerSecond: 0,
  });
  const maintenance = config.maintenance;
  window.ipcRenderer.on("update-available", () => {
    setIsUpdating(true);
  });

  window.ipcRenderer.on("update-progress", (_, data) => {
    setUpdateProgress(data);
  });

  if (isUpdating) {
    return (
      <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white transition-all duration-500">
        <div className="flex-grow flex flex-col items-center justify-center">
          <span className="text-2xl mb-4 animate-pulse">
            Mise à jour en cours...
          </span>
          <div className="w-64 bg-gray-700 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${updateProgress.percent}%` }}
            ></div>
          </div>
          <span className="mt-2">{Math.round(updateProgress.percent)}%</span>
        </div>
      </div>
    );
  }

  if (maintenance) {
    return (
      <>
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#1A1A1A] to-[#2D2D2D] text-white">
          <div className="flex justify-end p-4">
            <div
              onClick={() => window.close()}
              className="w-4 h-4 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg"
            ></div>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="bg-[#2A2A2A]/50 backdrop-blur-lg rounded-xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="relative">
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <span className="text-6xl animate-pulse">⚡</span>
                    <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/20 blur-xl rounded-full"></div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 via-red-400 to-purple-500 bg-clip-text text-transparent">
                  Maintenance en cours
                </h2>
                <div className="flex justify-center gap-4 mt-6">
                  <div className="group">
                    <span className="text-4xl group-hover:animate-spin-slow transition-all duration-500 inline-block">
                      ⚙️
                    </span>
                  </div>
                  <div className="group">
                    <span className="text-4xl group-hover:animate-bounce transition-all duration-500 inline-block">
                      🔧
                    </span>
                  </div>
                  <div className="group">
                    <span className="text-4xl group-hover:animate-spin transition-all duration-500 inline-block">
                      🛠️
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-center mt-6 max-w-md">
                  Nous travaillons actuellement à l'amélioration de votre
                  expérience. Merci de votre patience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white transition-all duration-500">
        <Header />
        <Routes>
          <Route path="" element={<Main />} />
          <Route path="params" element={<Params />} />
          <Route path="news" element={<News />} />
          <Route
            path="*"
            element={
              <div className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4 text-red-500">404</h1>
                <p className="text-xl text-gray-600">Page non trouvée</p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

import { useEffect } from "react";

import { useState } from "react";

export default function Params() {
  const [arma3Path, setArma3Path] = useState<string | null>(null);
  const [paramsLaunch, setParamsLaunch] = useState<string | null>(null);

  const handleModifyArma3Path = async () => {
    await window.ipcRenderer.send("locate-arma3");
  };

  const handleInstallTFAR = async () => {
    await window.ipcRenderer.invoke("locate-ts3");
  };

  const handleSaveParams = async () => {
    await window.ipcRenderer.invoke("save-params-launch", paramsLaunch);
  };

  useEffect(() => {
    const getArma3Path = async () => {
      const resPath = await window.ipcRenderer.invoke("get-arma3-path");
      setArma3Path(resPath);
    };
    getArma3Path();
  }, []);

  return (
    <main className="flex-grow container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6 ">Paramètres</h1>

      <div className="space-y-6">
        {/* Section Jeu */}
        <section className="bg-black/33 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white/80">
            Paramètres du jeu
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">
                Répertoire d'installation d'Arma 3
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  className="w-full p-2 bg-black/25 border border-white/10 rounded text-white/90 placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors duration-200"
                  readOnly={true}
                  value={arma3Path || ""}
                  onChange={(e) => setArma3Path(e.target.value)}
                />
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white/90 px-4 py-2 rounded transition-transform transform hover:scale-105 duration-200 cursor-pointer"
                  onClick={handleModifyArma3Path}
                >
                  Modifier
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-white/70">
                Arguments de lancement
              </label>
              <input
                type="text"
                value={paramsLaunch || ""}
                onChange={(e) => setParamsLaunch(e.target.value)}
                className="w-full p-2 bg-black/25 border border-white/10 rounded text-white/90 placeholder-white/40 focus:outline-none focus:border-white/30 transition-colors duration-200 shadow-inner"
                placeholder="-skipIntro -noSplash -world=empty"
              />
            </div>
          </div>
        </section>

        {/* Bouton de sauvegarde */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleInstallTFAR}
            className="bg-green-500 hover:bg-green-700 text-white/90 px-6 py-2 rounded transition-transform transform hover:scale-105 duration-200 cursor-pointer"
          >
            Installer TFAR
          </button>
          <button
            onClick={handleSaveParams}
            className="bg-red-500 hover:bg-red-700 text-white/90 px-6 py-2 rounded transition-transform transform hover:scale-105 duration-200 cursor-pointer"
          >
            Sauvegarder les paramètres
          </button>
        </div>
      </div>
    </main>
  );
}

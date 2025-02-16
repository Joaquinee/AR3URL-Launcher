import { useState, useEffect } from "react";
import Footer from "./footer";

import { config } from "../config/config";

// Modification de l'importation des images
const images = Object.values(
  import.meta.glob("../images/slider/*.{png,jpg,jpeg,svg}", {
    eager: true,
  })
);
import discord from "../images/sociaux/discord.webp";
import teamspeak from "../images/sociaux/ts3.webp";
import website from "../images/sociaux/website.webp";
import twitch from "../images/sociaux/twitch.webp";
import youtube from "../images/sociaux/youtube.webp";

const showSocial =
  config.discord ||
  config.teamspeak ||
  config.website ||
  config.twitch ||
  config.youtube;

export default function Main() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[384px]">
      <div className="relative h-full bg-[#3a3c49] ">
        {showSocial && (
          <div className="absolute top-4 left-4 bottom-4 flex flex-col space-y-2 bg-black/50 rounded-lg p-2 hover:bg-black/70 transition-all duration-200">
            {config.discord && (
              <button
                onClick={() =>
                  window.ipcRenderer.invoke("open-url", config.discord)
                }
                className="text-white p-2 rounded hover:bg-white/10 transition-colors duration-200"
              >
                <img src={discord} alt="Discord" className="w-8 h-8" />
              </button>
            )}
            {config.teamspeak && (
              <button
                onClick={() =>
                  window.ipcRenderer.invoke("open-url", config.teamspeak)
                }
                className="text-white p-2 rounded hover:bg-white/10 transition-colors duration-200"
              >
                <img src={teamspeak} alt="TeamSpeak" className="w-8 h-8" />
              </button>
            )}
            {config.website && (
              <button
                onClick={() =>
                  window.ipcRenderer.invoke("open-url", config.website)
                }
                className="text-white p-2 rounded hover:bg-white/10 transition-colors duration-200"
              >
                <img src={website} alt="Website" className="w-8 h-8" />
              </button>
            )}
            {config.twitch && (
              <button
                onClick={() =>
                  window.ipcRenderer.invoke("open-url", config.twitch)
                }
                className="text-white p-2 rounded hover:bg-white/10 transition-colors duration-200"
              >
                <img src={twitch} alt="Twitch" className="w-8 h-8" />
              </button>
            )}
            {config.youtube && (
              <button
                onClick={() =>
                  window.ipcRenderer.invoke("open-url", config.youtube)
                }
                className="text-white p-2 rounded hover:bg-white/10 transition-colors duration-200"
              >
                <img src={youtube} alt="Youtube" className="w-8 h-8" />
              </button>
            )}
          </div>
        )}

        {images.map((image, index) => (
          <img
            key={index}
            src={
              typeof image === "string"
                ? image
                : (image as unknown as { default: string }).default
            }
            alt={`Image ${index + 1}`}
            className={`w-full h-full object-cover ${
              index === currentImageIndex ? "block" : "hidden"
            }`}
          />
        ))}

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

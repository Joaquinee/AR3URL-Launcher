import { version } from "../../package.json";

export const config = {
  version: version,
  maintenance: false,
  discord: "https://discord.gg/E8eRK4uhPj", //Peut etre vide
  teamspeak: "ts3server://ts3.unreallife.fr", //Peut etre vide
  website: "https://unreallife.fr/", //Peut etre vide
  twitch: "", //Peut etre vide
  youtube: "", //Peut etre vide
  serverName: "UnrealLife",
  title: `Unreal Life - ${version}`,

  urlMods: "http://82.29.170.30/modsList",
  urlRessources: "http://82.29.170.30/other_ressources",
  mdNews: "http://82.29.170.30/news/news.md",

  serverIp: "127.0.0.1",
  serverPort: 2302,
  serverPassword: "password",

  folderModsName: "@A3URL",
};

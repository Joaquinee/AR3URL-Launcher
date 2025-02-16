# 🚀 Launcher Arma 3

## Fonctionnalités

- [🟢] Auto Update Launcher
- [🟢] Auto Update Mods
- [🟢] News
- [🟢] Install TFR

## 📝 TODO

- [ ] Prendre en compte les paramètres de lancement
- [ ] Permettre un meilleur suivi des news

## 🛠️ Installation

Dossiers à créer sur le serveur distant :

- `📁 other_ressources` : Contient les fichiers cpp, paa, et dll, ainsi que le plugin TFR si besoin
- `📁 news` : Contient un fichier .md pour écrire les news
- `📁 modsList` : Fichier principal où sont les mods à télécharger

## ⚙️ Configuration

La configuration du serveur se fait dans le fichier `src/config/config.ts`.

## 🚀 Déploiement

- `pnpm release` : Pour envoyer la nouvelle version sur GitHub (Prérequis : avoir un token GitHub dans .env, ainsi que les droits de push sur le repo et remplir les informations dans le fichier `electron-builder.json5`  
  publish: {
  provider: "github",
  owner: "owner",
  repo: "repo",
  releaseType: "release",
  private: false,
  },

## 📜 Listing de mods

```sh
nano/vim script.sh
```

```sh
#!/bin/bash

# Vérifie si un répertoire a été passé en argument
if [ -z "$1" ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

dir="$1"

# Vérifie si le répertoire existe
if [ ! -d "$dir" ]; then
    echo "Le répertoire spécifié n'existe pas."
    exit 1
fi

# Nom du fichier JSON de sortie
output_file="$dir/$(basename "$dir").json"

# Supprime l'ancien fichier JSON s'il existe
if [ -f "$output_file" ]; then
    rm "$output_file"
fi

echo "[" > "$output_file"
first=true

# Parcours tous les fichiers du répertoire et collecte les données
find "$dir" -type f | while read -r file; do
    name=$(basename "$file")

    # Ignore le fichier modsList.json
    if [ "$name" = "modsList.json" ]; then
        continue
    fi

    hash=$(sha256sum "$file" | awk '{print $1}')
    size=$(stat --format="%s" "$file")

    if [ "$first" = true ]; then
        first=false
    else
        echo "," >> "$output_file"
    fi

    echo "  {\"hash\": \"$hash\", \"name\": \"$name\", \"size\": $size}" >> "$output_file"
done

echo "]" >> "$output_file"

echo "Résultats enregistrés dans $output_file"
```

```sh
chmod +x script.sh
./script.sh /chemin/vers/modsList
```

⚠️ Faire la commande `./script.sh` obligatoirement à chaque changement dans le dossier modsList

# 🚀 Vite + React + ShadCN + GitHub Pages

This project uses **Vite** + **React (TypeScript)** with **Tailwind CSS** and **ShadCN UI** for modern frontend development, and is deployed via **GitHub Pages**.

📍 Live Site: [https://qubalee.github.io/gp/](https://qubalee.github.io/gp/)


## 📦 Install Dependencies

```bash
npm install
````

---

## 🧪 Run Locally (Development)

```bash
npm run dev
```

---

## ✅ Update and Deploy

To update the site and deploy changes:

```bash
npm run update
```

This does the following:

1. Adds all changes to Git (`git add .`)
2. Commits with message `"update"`
3. Pushes to the `main` branch
4. Builds the Vite app
5. Deploys the `dist/` folder to the `gh-pages` branch

---

## 🌍 Manual Deployment

Alternatively, run each step manually:

```bash
git add .
git commit -m "your message"
git push origin main
npm run deploy
```

---

## 📁 Project Structure

```txt
src/
├── components/       # UI components (e.g. PromptCard, ImageModal)
├── pages/            # Page views (if using routing)
├── App.tsx           # Main application component
├── main.tsx          # Vite entry point
```

---

## ⚙️ Deployment Config

* GitHub Pages is configured to serve from: `/gp/`
* Relevant config files:

  * `vite.config.ts` should include: `base: '/gp/'`
  * `package.json` should include: `"homepage": "https://qubalee.github.io/gp/"`

---

## 🧹 Code Formatting & Linting

To keep your code clean:

* Format code:

  ```bash
  npm run lint
  ```

* Recommended `.vscode/settings.json`:

  ```json
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.codeActionsOnSave": {
      "source.organizeImports": true,
      "source.fixAll": true
    }
  }
  ```

* Recommended VS Code Extensions:

  * Prettier
  * ESLint
  * Tailwind CSS IntelliSense

---

## 🛠 Scripts Overview

| Script           | Description                          |
| ---------------- | ------------------------------------ |
| `npm run dev`    | Start local development server       |
| `npm run build`  | Build the app for production         |
| `npm run deploy` | Deploy `dist/` to GitHub Pages       |
| `npm run update` | Add, commit, push and deploy changes |

---

## 🤝 Credits

Built with:

* [Vite](https://vitejs.dev)
* [React](https://react.dev)
* [Tailwind CSS](https://tailwindcss.com)
* [ShadCN UI](https://ui.shadcn.dev)

---

## ✅ Summary Workflow

```bash
npm run update
```



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



Start Backend: cd tic-tac-toe-backend && npm run dev
Start Frontend: cd tic-tac-toe-frontend && npm run dev
Register a new user on the frontend (/register).
Login with the registered user (/login).
You'll be redirected to the Dashboard.
Create a new game from the Dashboard. This will take you to /game/:gameId.
Open a new incognito window/tab in your browser.
Register another user in the incognito window.
Login with the second user.
Go to the Dashboard in the incognito window. You should see the game created by the first user in the "Available Games" list.
Join the game from the second user's dashboard.
Both windows/tabs should now be on the same game board, and you can play Tic-Tac-Toe, with moves and game state synchronizing via WebSockets!
This provides a complete functional frontend for your Tic-Tac-Toe application. Remember to customize and enhance the UI/UX further as per your vision!
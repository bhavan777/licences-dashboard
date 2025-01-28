# Instructions to Run this App

Backed in mocked by MSW on client, no backend is needed since we are using service worker is taking care of mocking apis.,


1. Clone this Repo
2. `yarn build` at root
3. `yarn preview` at root
4. the app should be available on http://localhost:4173/


Couple of Assumptions and decisions:
1. the backend is mocked by using MSW
2. No encryption is perform on the client, but a dummy file is responded in the api by MSW
3. a list of licences are assumed on load for the page to show some cards., these licences are in memory, they will be updated as long as the page is not refreshed.


Features:
1. Licence Creation - 
   - a licence has
      ```
       {
           licence_type: [TIME_BOUND|USAGE_LIMIT|HARDWARE] and an identified 
           id: Identifier
           expiration?: [DATETIME] expiration time of licence
           usage_limit?: [USAGE_LIMIT] #deployments
           hardware_id?: [HARDWARE] hardware id or mac address related to the hardware
       }
      
      ```
  
   - Licence display: the Licences are listed down as cards - each card is rendered differently based on licence_type
   - Generate secure Link of each licence in a modal by sending licence id to backend which in turn responds with a dummy url which can be opened in new tab or copied
   - licence can be copied from the card it self if needed

3. Generate Encrypted file:
   Assumed to be a standalone feature which just encrypts file bsaed on the file selected [only jpg allowed currently] and passed licence key which in return show generated file to download - ability to generate a secure link for it on demand.
4. Generate secure link:
  Secure link can be generated for licences or generated encrypted file.







# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

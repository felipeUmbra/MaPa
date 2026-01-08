To run the project on a local server and deploy it to GitHub Pages, you'll need to follow these instructions.

### Local Server

Running the project on a local server is straightforward. The setup is already configured for this.

1.  Install the dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```
3.  Open your browser and navigate to `http://localhost:5173`.

### GitHub Pages Deployment

To deploy the project to GitHub Pages, I've made a few configuration changes. Here's what I've done and what you need to do:

#### Configuration Changes

1.  **`package.json`**:
    *   I've added a `homepage` field to your `package.json` file. You'll need to replace the placeholder URL with your own GitHub Pages URL.
        ```json
        "homepage": "https://<username>.github.io/<repository-name>/"
        ```
    *   I've added `predeploy` and `deploy` scripts to your `package.json` to make it easy to build and deploy your application.
    *   I've also added the `gh-pages` package to your `devDependencies`.

2.  **`vite.config.ts`**:
    *   I've updated the `base` option in your `vite.config.ts` file. You'll need to replace the placeholder with your repository name.
        ```typescript
        base: '/<repository-name>/',
        ```

#### Deployment Steps

1.  **Update Placeholders**:
    *   In `package.json`, replace `<username>` with your GitHub username and `<repository-name>` with your GitHub repository name.
    *   In `vite.config.ts`, replace `<repository-name>` with your GitHub repository name.

2.  **Install Dependencies**:
    *   If you haven't already, install the project dependencies, including the new `gh-pages` package.
        ```bash
        npm install
        ```

3.  **Deploy**:
    *   Run the `deploy` script.
        ```bash
        npm run deploy
        ```
    *   This command will first build your project and then deploy the contents of the `dist` folder to a `gh-pages` branch in your GitHub repository.

4.  **Configure GitHub Repository**:
    *   Go to your repository's settings on GitHub.
    *   In the "Pages" section, select the `gh-pages` branch as the source for your GitHub Pages site.
    *   Save the changes.

After a few moments, your application should be live at the URL you specified in the `homepage` field of your `package.json` file.

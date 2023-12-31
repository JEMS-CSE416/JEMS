import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
     baseUrl: 'http://localhost:3000/',
    //baseUrl: "https://orca-app-tcqol.ondigitalocean.app/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});

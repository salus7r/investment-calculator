const path = require("path");
const { override, addBabelPlugin, addWebpackPlugin, addLessLoader, useEslintRc } = require("customize-cra");
const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

function rewireHotLoader(config, env) {
  if (env === "production") {
    return config;
  }

  // Find a rule which contains eslint-loader
  const condition = u => typeof u === "object" && u.loader && u.loader.includes("eslint-loader");
  const rule = config.module.rules.find(rule => rule.use && rule.use.some(condition));

  if (rule) {
    const use = rule.use.find(condition);

    if (use) {
      // Inject the option for eslint-loader
      use.options.emitWarning = true;
    }
  }

  // If in development, add 'react-hot-loader/babel' to babel plugins.
  return addBabelPlugin("react-hot-loader/babel")(config);
}

const options = {
  // stylesDir: path.join(__dirname, "./src/styles"),
  antDir: path.join(__dirname, "./node_modules/antd"),
  // varFile: path.join(__dirname, "./src/styles/variables.less"),
  // mainLessFile: path.join(__dirname, "./src/styles/infy.less"),
  themeVariables: [
    "@primary-color",
    "@secondary-color",
    "@text-color",
    "@heading-color",
    "@nav-dark-bg",
    "@header-text-color",
    "@layout-header-background",
    "@layout-footer-background",
    "@nav-dark-text-color",
    "@hor-nav-text-color",
    "@nav-header-selected-text-color"
  ],
  indexFileName: "index.html",
  generateOnce: false // generate color.less on each compilation
};

module.exports = override(
  useEslintRc(path.join(__dirname, "/.eslintrc.js")),
  addBabelPlugin(["import", { libraryName: "antd", style: "less", libraryDirectory: "es" }], "antd"),
  addBabelPlugin(["root-import", { rootPathPrefix: "~", rootPathSuffix: "src" }]),
  addBabelPlugin(["syntax-dynamic-import"]),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#038fde",
      "@secondary-color": "#fa8c16",
      "@text-color": "#545454",
      "@heading-color": "#535353",
      "@nav-dark-bg": "#003366",
      "@header-text-color": "#262626",
      "@layout-header-background": "#fefefe",
      "@layout-footer-background": "#fffffd",
      "@nav-dark-text-color": "#038fdd",
      "@hor-nav-text-color": "#fffffd",
      "@nav-header-selected-text-color": "#fdbe33"
    }
  }),
  addWebpackPlugin(new AntDesignThemePlugin(options)),
  config => {
    config.module.rules.push({ test: /\.tsx?$/, include: path.join(__dirname, "src"), enforce: "pre", use: [{ loader: "ts-nameof-loader" }] });
    config.resolve.modules = [path.join(__dirname, "src")].concat(config.resolve.modules);
    config = rewireHotLoader(config, process.env.NODE_ENV);
    //console.log(JSON.stringify(config.module.rules));
    return config;
  }
);

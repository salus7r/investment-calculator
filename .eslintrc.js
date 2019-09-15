"use strict";

const baseConfig = require("eslint-config-react-app");
const baseOverrides = Array.isArray(baseConfig.overrides) ? baseConfig.overrides : [baseConfig.overrides];
const baseTsOverride = baseOverrides.find(x => x.files.find(f => f.indexOf("*.ts") > 0));

module.exports = {
  ...baseConfig,
  overrides: [
    {
      ...baseTsOverride,
      rules: {
        ...baseTsOverride.rules,

        // Remove with next npm release of eslint-config-react-app:
        "default-case": "off",
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "off",
        // "no-dupe-class-members": "off",
        //For K2WebUI
        "no-script-url": "off",
        "eslint no-undef": "off",
        "jsx-a11y/href-no-hash": "off",
        "jsx-a11y/anchor-is-valid": [
          "warn",
          {
            aspects: ["invalidHref"]
          }
        ],
        "@typescript-eslint/no-unused-vars": "off",
        "no-useless-computed-key": "off"
      }
    }
  ],
  rules: {
    ...baseConfig.rules
  }
};

// module.exports = {
//   extends: "react-app",
//   "rules": {
//     "no-script-url": "off",
//     "eslint no-undef": "off",
//     "jsx-a11y/href-no-hash": "off",
//     "jsx-a11y/anchor-is-valid": [
//       "warn",
//       {
//         "aspects": ["invalidHref"]
//       }
//     ]
//   }
// }

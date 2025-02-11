const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
  packagerConfig: {
    asar: true,
    extraResource: ["./resources/data/"],
    icon: "resources/data/images/ToolieLogo.ico", // Ensure this path points to the correct .ico file
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        authors: "T4 from NTI Gymnasium Sodertalje",
        name: "desktop_toolie",
        description: "The desktop version of the web app Toolie by NTIG",
        setupIcon: "resources/data/images/ToolieLogo.ico",
        icon: "resources/data/images/ToolieLogo.ico",
        setupExe: "DesktopToolieInstaller.exe",
        allowToChangeInstallationDirectory: true,
        oneClick: false,
        createDesktopShortcut: "always",
        createStartMenuShortcut: true,
        shortcutName: "Desktop Toolie",
        shortcutLocations: ["Desktop", "StartMenu"], // Creates shortcuts on Desktop and Start Menu
        runAfterFinish: true,
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        format: "APFS",
        icon: "resources/data/images/ToolieLogo.ico",
        name: "desktop_toolie",
        authors: "T4 from NTI Gymnasium Sodertalje",
        description: "The desktop version of the web app Toolie by NTIG",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        options: {
          maintainer: "T4",
        },
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

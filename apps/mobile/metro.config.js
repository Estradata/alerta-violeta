const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../.."); // ALERTA-VIOLETA

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot]; // allow imports from outside

// Optional: if you need to resolve symlinked modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

module.exports = config;

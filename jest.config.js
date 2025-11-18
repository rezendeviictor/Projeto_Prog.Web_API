const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testMatch: ["**/tests/**/*.test.ts"],
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", 
                        "!src/migration/**", 
                        "!src/tests/**", 
                        "!src/*.ts"],
  coverageReporters: ["text","lcov","html"],
  transform: {
    ...tsJestTransformCfg,
  },
  // --- ADIÇÃO IMPORTANTE ABAIXO ---
  moduleNameMapper: {
    // Quando encontrar um import terminando em .js, remove a extensão
    // para que o ts-jest encontre o arquivo .ts correspondente
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
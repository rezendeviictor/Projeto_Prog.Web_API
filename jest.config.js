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

  moduleNameMapper: {

    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};
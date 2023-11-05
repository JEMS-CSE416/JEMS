/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/JEMS/server/tests/*.test.ts"],
  forceExit: true,
};

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/tests.ts"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        esModuleInterop: true
      }
    ]
  },
  moduleFileExtensions: ["ts", "js", "json"]
};
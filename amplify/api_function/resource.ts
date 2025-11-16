import { defineFunction } from "@aws-amplify/backend";

export const apiFunction = defineFunction({
  name: "api_function",
  entry: "./handler.ts"
});

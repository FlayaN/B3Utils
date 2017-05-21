import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("NAVIGATE", "LOG_INFO", "LOG_ERROR");
export type ActionTypes = Enum<typeof ActionTypes>;
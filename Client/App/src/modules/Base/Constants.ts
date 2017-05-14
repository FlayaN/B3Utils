import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("NAVIGATE");
export type ActionTypes = Enum<typeof ActionTypes>;
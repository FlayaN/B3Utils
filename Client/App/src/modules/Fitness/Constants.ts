import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("SET_USERS", "SET_INITIALIZED");
export type ActionTypes = Enum<typeof ActionTypes>;
import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("SET_USERS");
export type ActionTypes = Enum<typeof ActionTypes>;
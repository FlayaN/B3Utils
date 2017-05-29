import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("SET_IDEAS", "SET_IDEAMESSAGES", "ADD_IDEAMESSAGES");
export type ActionTypes = Enum<typeof ActionTypes>;
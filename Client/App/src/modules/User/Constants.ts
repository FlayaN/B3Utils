import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("SET_NAME");
export type ActionTypes = Enum<typeof ActionTypes>;
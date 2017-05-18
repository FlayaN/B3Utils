import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("SET_GOOGLEUSER", "SET_AVATAR");
export type ActionTypes = Enum<typeof ActionTypes>;
import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("NONE");
export type ActionTypes = Enum<typeof ActionTypes>;
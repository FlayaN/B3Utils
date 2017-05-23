import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("SET_USERS", "SET_INITIALIZED", "SET_ACTIVITIES", "SET_SELECTED_FITNESS_MODE");
export type ActionTypes = Enum<typeof ActionTypes>;
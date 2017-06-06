import { Enum } from "typescript-string-enums";

export const ActionTypes = Enum("SET_COMPANIES", "SET_COMPANY_PERSONS");
export type ActionTypes = Enum<typeof ActionTypes>;
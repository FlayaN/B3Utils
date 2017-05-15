import { Enum } from "typescript-string-enums";

export const Pages = Enum("MAINMENU", "TESTPAGE");
export type Pages = Enum<typeof Pages>;

export const Modules = Enum("base", "user");
export type Modules = Enum<typeof Modules>;
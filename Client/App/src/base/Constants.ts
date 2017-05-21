import { Enum } from "typescript-string-enums";

export const Pages = Enum("MAINMENU", "FITNESS", "EVENTLOG");
export type Pages = Enum<typeof Pages>;

export const Modules = Enum("base", "user", "fitness");
export type Modules = Enum<typeof Modules>;
import { Enum } from "typescript-string-enums";

export const Pages = Enum("MAINMENU", "FITNESS", "FITNESS_USER", "IDEAS", "NEWIDEA", "IDEA", "NEWCOMPANY", "NEWPERSON", "COMPANY", "COMPANIES");
export type Pages = Enum<typeof Pages>;

export const Modules = Enum("base", "user", "fitness", "idea", "reference");
export type Modules = Enum<typeof Modules>;
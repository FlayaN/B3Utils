declare const enum FitnessType {
    Distance = 0,
    Steps = 1
}

declare const enum FilterType {
    All = 0,
    Month = 1,
    Week = 2
}

declare const enum EventType {
    Information = 0,
    Error = 1
}

interface IEvent {
    type: EventType;
    message: string;
}

interface BaseDef {
    currPage: string;
    navData: any;
    eventLog: IEvent[];
}

interface UserDef {
    googleUser: GoogleUser;
    avatarUrl: string;
}

interface FitnessDef {
    users: UserViewModel[];
    initialized: boolean;
    activitiesData: { [userId: string]: ActivityViewModel[] };
    selectedFitnessMode: FitnessType;
    selectedFilterMode: FilterType;
}

interface IdeaDef {
    ideas: IdeaViewModel[];
    ideaMessages: { [ideaId: string]: MessageViewModel[] };
}

interface StoreDef {
    user: UserDef;
    base: BaseDef;
    fitness: FitnessDef;
    idea: IdeaDef;
}
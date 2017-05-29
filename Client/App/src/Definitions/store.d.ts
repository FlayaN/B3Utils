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
    selectedFitnessMode: string;
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
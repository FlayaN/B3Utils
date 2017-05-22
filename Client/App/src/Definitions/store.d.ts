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
    navData: Object;
    eventLog: IEvent[];
}

interface UserDef {
    googleUser: GoogleUser;
    avatarUrl: string;
}

interface FitnessDef {
    users: IUserViewModel[];
    initialized: boolean;
    activitiesData: { [userId: string]: IActivityViewModel[] };
}

interface StoreDef {
    user: UserDef;
    base: BaseDef;
    fitness: FitnessDef;
}
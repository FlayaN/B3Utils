interface BaseDef {
    currPage: string;
    navData: Object;
}

interface UserDef {
    googleUser: GoogleUser;
    avatarUrl: string;
}

interface FitnessDef {
    users: IUserViewModel[];
}

interface StoreDef {
    user: UserDef;
    base: BaseDef;
    fitness: FitnessDef;
}
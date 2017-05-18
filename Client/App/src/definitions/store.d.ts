interface BaseDef {
    currPage: string;
    navData: Object;
}

interface UserDef {
    googleUser: GoogleUser;
    avatarUrl: string;
}

interface StoreDef {
    user: UserDef;
    base: BaseDef;
}
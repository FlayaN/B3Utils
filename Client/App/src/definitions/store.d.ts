interface BaseDef {
    currPage: string;
    navData: Object;
}

interface UserDef {
    name: string;
}

interface StoreDef {
    user: UserDef;
    base: BaseDef;
}
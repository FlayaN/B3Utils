import Realm from "realm";

const userSchema: Realm.ObjectSchema = {
    name: "User",
    primaryKey: "id",
    properties: {
        id: "int",
        name: { type: "string", indexed: true },
        avatar: { type: "string", optional: true }
    }
};

interface IUser {
    id: number;
    name: string;
    avatar?: string;
}

export const realm = new Realm({
    schema: [userSchema]// ,
    // encryptionKey: new Int8Array(64); // encryptionKey
});

export function getUsers(): Realm.Collection<IUser> {
    let users = realm.objects<IUser>("User").sorted("name");
    return users;
}

export function addUser(user: IUser): void {
    realm.create("User", user);
}

export function deleteAllUsers(): void {
    realm.delete(realm.objects("User"));
}
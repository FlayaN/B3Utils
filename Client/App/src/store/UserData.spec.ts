import { realm, getUsers, addUser, deleteAllUsers } from "./UserData";

it("loads correctly", () => {

    realm.write(() => {
        deleteAllUsers();
        addUser({id: 2, name: "Test2"});
        addUser({id: 1, name: "Test1"});
    });

    const users = getUsers();
    console.log(users.length);
    expect(users.length).toBe(2);
});
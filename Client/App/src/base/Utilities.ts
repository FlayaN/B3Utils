import GoogleSignIn from "react-native-google-sign-in";
export async function LoginWithGoogle(): Promise<GoogleUser> {
    let clientId = "509942424685-ojd84ecu7eobre41dqp504arseomtdtk.apps.googleusercontent.com";
    try {
        await GoogleSignIn.configure({
            clientID: clientId,
            scopes: ["openid", "email", "profile"],
            shouldFetchBasicProfile: true
        });
        return await GoogleSignIn.signInPromise();
    } catch (exception) {
        console.error(exception);
        return undefined;
    }
}

export async function GetUsers(): Promise<IUserViewModel[]> {
    let users: IUserViewModel[];
    try {
        const response = await fetch("https://b3utils.azurewebsites.net/api/v1/Users/");
        users = await response.json();
    } catch (exception) {
        console.error(exception);
        users = undefined;
    }
    return users;
}

export async function GetUser(userId: string): Promise<IUserViewModel> {
    let user: IUserViewModel;
    try {
        const response = await fetch(`https://b3utils.azurewebsites.net/api/v1/Users/${userId}`);
        user = await response.json();
    } catch (exception) {
        console.error(exception);
        user = undefined;
    }
    return user;
}

export async function AddActivity(activity: IActivityViewModel): Promise<void> {
    try {
        const response = await fetch("https://b3utils.azurewebsites.net/api/v1/Activity", {
            method: "POST",
            body: JSON.stringify(activity),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json; charset=UTF-8"
            }
        });
        console.log(response);
    } catch (exception) {
        console.error(exception);
    }
}

export async function AddUser(user: IUserViewModel): Promise<void> {
    try {
        const response = await fetch("https://b3utils.azurewebsites.net/api/v1/Users/", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                "Accept": "application/json; charset=UTF-8"
            }
        });
        console.log(response);
    } catch (exception) {
        console.error(exception);
    }
}
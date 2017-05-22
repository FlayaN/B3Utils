import GoogleSignIn from "react-native-google-sign-in";
import { Platform } from "react-native";

export async function LoginWithGoogle(): Promise<GoogleUser> {
    let clientId = "509942424685-ojd84ecu7eobre41dqp504arseomtdtk.apps.googleusercontent.com";

    if(Platform.OS === "ios") {
        clientId = "509942424685-7qt4q1gpu3tci13td2bjqkcqmm6ot90i.apps.googleusercontent.com";
    }

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

export function update<T, K extends keyof T>(obj: T, updateSpec: Pick<T, K>): T {
  const result = {} as T;
  Object.keys(obj).forEach(key => result[key] = obj[key]);
  Object.keys(updateSpec).forEach((key: K) => result[key] = updateSpec[key]);
  return result;
}

 const baseUrl = "https://b3utils.azurewebsites.net";
// const baseUrl = "http://192.168.1.198:57603";

export async function GetUsers(): Promise<IUserViewModel[]> {
    let users: IUserViewModel[];
    try {
        const response = await fetch(`${baseUrl}/api/v1/Users/`);
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
        const response = await fetch(`${baseUrl}/api/v1/Users/${userId}`);
        user = await response.json();
    } catch (exception) {
        console.error(exception);
        user = undefined;
    }
    return user;
}

export async function AddActivity(activity: IActivityViewModel): Promise<void> {
    try {
        console.log("AddActivity", activity);
        const response = await fetch(`${baseUrl}/api/v1/Activity`, {
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

export async function GetActivities(userId: string): Promise<IActivityViewModel[]> {
    let activities: IActivityViewModel[];
    try {
        const response = await fetch(`${baseUrl}/api/v1/Users/${userId}/activities`);
        activities = await response.json();
    } catch (exception) {
        console.error(exception);
        activities = undefined;
    }
    return activities;
}

export async function AddUser(user: IUserViewModel): Promise<void> {
    try {
        const response = await fetch(`${baseUrl}/api/v1/Users/`, {
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
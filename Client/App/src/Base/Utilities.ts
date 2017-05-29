import GoogleSignIn from "react-native-google-sign-in";
import { Platform } from "react-native";
import GoogleFit from "react-native-google-fit";
import AppleHealthKit from "react-native-apple-healthkit";

export async function LoginWithGoogle(): Promise<GoogleUser> {
    let clientId = "509942424685-ojd84ecu7eobre41dqp504arseomtdtk.apps.googleusercontent.com";

    if (Platform.OS === "ios") {
        clientId = "509942424685-tagpmt073eq8bvnpgqflr431a3vsr49h.apps.googleusercontent.com";
    }

    try {
        await GoogleSignIn.configure({
            clientID: clientId,
            scopes: ["openid", "email", "profile"],
            shouldFetchBasicProfile: true
        });
        return await GoogleSignIn.signInPromise();
    } catch (exception) {
        console.log(exception);
        return undefined;
    }
}

export function convertUTCDateToLocalDate(date) {
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

export function addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
}

export function addHours(date: Date, hours: number): Date {
    date.setHours(date.getHours() + hours);
    return date;
}

export function getDates(startDate: Date, endDate: Date): Array<Date> {
    let dateArray = new Array<Date>();
    let currDate = startDate;
    while (currDate <= endDate) {
        dateArray.push(new Date(currDate));
        currDate = addDays(currDate, 1);
    }
    return dateArray;
}

export function update<T, K extends keyof T>(obj: T, updateSpec: Pick<T, K>): T {
    const result = {} as T;
    Object.keys(obj).forEach(key => result[key] = obj[key]);
    Object.keys(updateSpec).forEach((key: K) => result[key] = updateSpec[key]);
    return result;
}

const baseUrl = "https://b3utils.azurewebsites.net";
// const baseUrl = "http://192.168.1.198:57603";

async function Get<T>(url: string): Promise<T> {
    const response = await fetch(`${baseUrl}/${url}`);
    return await response.json();
}

async function Post<T>(url: string, data: T): Promise<Response> {
    return await fetch(`${baseUrl}/${url}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "application/json; charset=UTF-8"
        }
    });
}

export async function GetUsers(type: string): Promise<UserViewModel[]> {
    return Get<UserViewModel[]>(`api/v1/Users/all/${type}`);
}

export async function GetUser(userId: string): Promise<UserViewModel> {
    return Get<UserViewModel>(`api/v1/Users/${userId}`);
}

export async function GetIdeas(): Promise<IdeaViewModel[]> {
    return Get<IdeaViewModel[]>("api/v1/Ideas");
}

export async function GetMessages(ideaId: string): Promise<MessageViewModel[]> {
    let messages = await Get<MessageViewModel[]>(`api/v1/Ideas/${ideaId}/Messages`);
    return messages;
}

export async function GetActivities(userId: string, type: string): Promise<ActivityViewModel[]> {
    let activities = await Get<ActivityViewModel[]>(`api/v1/Users/${userId}/activities/${type}`);

    activities.forEach((message) => {
        message.date = convertUTCDateToLocalDate(new Date(message.date));
    });

    return activities;
}

export async function AddMessage(message: MessageViewModel): Promise<Response> {
    return Post(`api/v1/Ideas/${message.ideaId}/Messages`, message);
}

export async function AddUser(user: UserViewModel): Promise<Response> {
    return Post("api/v1/Users", user);
}

export async function AddActivity(activity: ActivityViewModel): Promise<Response> {
    return Post("api/v1/Activity", activity);
}

export async function AddIdea(idea: IdeaViewModel): Promise<Response> {
    return Post("api/v1/Ideas", idea);
}

export function getDailyDistance(startDate: Date, endDate: Date, userId: string): Promise<ActivityViewModel[]> {
    console.log(startDate.toISOString(), endDate.toISOString(), userId);
    return new Promise((resolve, reject) => {
        let activities: ActivityViewModel[] = [];
        if (Platform.OS === "ios") {
            getDates(startDate, endDate).forEach(date => {
                const options = {
                    date: date
                };
                AppleHealthKit.getDistanceWalkingRunning(options, (err, res) => {
                    if (err) {
                        reject(err);
                    } else {
                        this.props.baseActions.logInfo(`getDistanceWalkingRunning: ${res}`);
                    }
                });
            });
        } else {
            GoogleFit.getDailyDistanceSamples({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            }, (data, extra) => {
                if (data === false) {
                    extra.forEach(item => {
                        let tmpDate = new Date(item.endDate);
                        activities.push({
                            activityId: "00000000-0000-0000-0000-000000000000",
                            userId: userId,
                            amount: item.distance,
                            date: tmpDate,
                            type: "getDailyDistanceSamples"
                        });
                    });
                    resolve(activities);
                } else {
                    reject(data);
                }
            });
        }
    });
}

export function getDailySteps(startDate: Date, endDate: Date, userId: string): Promise<ActivityViewModel[]> {
    return new Promise((resolve, reject) => {
        let activities: ActivityViewModel[] = [];
        if (Platform.OS === "ios") {
            // getDates(startDate, endDate).forEach(date => {
            //     const options = {
            //         date: date
            //     };
            //     AppleHealthKit.getDistanceWalkingRunning(options, (err, res) => {
            //         if (err) {
            //             reject(err);
            //         } else {
            //             console.log(res);
            //             // this.props.baseActions.logInfo(`getDistanceWalkingRunning: ${res}`);
            //         }
            //     });
            // });
        } else {
            GoogleFit.getDailyStepCountSamples({
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString()
            }, (data, extra) => {
                if (data === false) {
                    extra.forEach(item => {
                        let tmpDate = new Date(item.endDate);
                        activities.push({
                            activityId: "00000000-0000-0000-0000-000000000000",
                            userId: userId,
                            amount: item.steps,
                            date: tmpDate,
                            type: "getDailyStepCountSamples"
                        });
                    });
                    resolve(activities);
                } else {
                    reject(data);
                }
            });
        }
    });
}
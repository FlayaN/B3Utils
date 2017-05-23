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
        console.error(exception);
        return undefined;
    }
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

export async function GetUsers(type: string): Promise<IUserViewModel[]> {
    let users: IUserViewModel[];
    try {
        console.log(type);
        const response = await fetch(`${baseUrl}/api/v1/Users/all/${type}`);
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

export async function GetActivities(userId: string, type: string): Promise<IActivityViewModel[]> {
    let activities: IActivityViewModel[];
    try {
        const response = await fetch(`${baseUrl}/api/v1/Users/${userId}/activities/${type}`);
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

export function getDailyDistance(startDate: Date, endDate: Date, userId: string): Promise<IActivityViewModel[]> {
    console.log(startDate.toISOString(), endDate.toISOString(), userId);
    return new Promise((resolve, reject) => {
        let activities: IActivityViewModel[] = [];
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
                            date: addHours(tmpDate, 2),
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

export function getDailySteps(startDate: Date, endDate: Date, userId: string): Promise<IActivityViewModel[]> {
    return new Promise((resolve, reject) => {
        let activities: IActivityViewModel[] = [];
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
                            date: addHours(tmpDate, 2),
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
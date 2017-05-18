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
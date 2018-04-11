import * as Exponent from "expo";

export async function registerWithGoogleAsync(
  socailSignupSuccess,
  authData,
  checkUser
) {
  try {
    const result = await Exponent.Google.logInAsync({
      androidClientId: authData.androidClientId,
      iosClientId: authData.iosClientId,
      scopes: ["profile", "email"]
    });
    const obj = result.user;
    if (result.type === "success") {
      const credentials = {
        email: obj.email,
        request: "Register"
      };
      checkUser(credentials, obj);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e, "error");
  }
}
export async function signInWithGoogleAsync(
  socailSignupSuccess,
  authData,
  checkUser
) {
  try {
    const result = await Exponent.Google.logInAsync({
      androidClientId: authData.androidClientId,
      iosClientId: authData.iosClientId,
      scopes: ["profile", "email"]
    });
    const obj = result.user;
    if (result.type === "success") {
      const credentials = {
        email: obj.email,
        request: "Login"
      };
      checkUser(credentials, obj);
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    console.log(e, "error");
  }
}

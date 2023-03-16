import Cookies from "universal-cookie";
import { API_BASE_URL } from "../../constants";
import {
  signIn,
  signUp,
} from "./APIUrl.js";

export const cookieslog = new Cookies();
export const cook_log = cookieslog.get("login");
export const respSuccess = "10200";
export const respSuccess_2 = "10201";
export const internalError = "10404";
export const internalError_2 = "10409";
export const userPassError = "Please check the Username/Password";
export const userExist = "User Already Exists. Please Signup Again";
export const successMessage = "Successful Credentials";
export const validEmail = "Valid Email";
export const validPassword = "Valid Password";
export const validUsername = "Valid Username";
export const invalidCredentials = "Invalid Credentials";

export function loginForm(
  player,
  setMessageInvalid,
  setCookie,
  userName,
  empty
) {
  fetch(API_BASE_URL + signIn, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorCode === respSuccess) {
        setMessageInvalid(successMessage);
        setCookie("user", userName, { path: "/" });
        cookieslog.remove("login");
        empty();
        window.location.href = "/Home";
      } else if (responseJson.errorCode === internalError) {
        setMessageInvalid(userPassError);
        empty();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export function signUpForm(
  player,
  setMessageInvalid,
  setCookie,
  empty,
  navigate
) {
  fetch(API_BASE_URL + signUp, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(player),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorCode === respSuccess_2) {
        setMessageInvalid(successMessage);
        setCookie("login", "Success", { path: "/" });
        empty();
        navigate("/Login");
      } else if (responseJson.errorCode === internalError_2) {
        setMessageInvalid(userExist);
        empty();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

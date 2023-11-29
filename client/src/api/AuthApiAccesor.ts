import { User } from "../utils/models/User";
import { BACKEND_URL, LOCAL_BACKEND_URL } from "../utils/constants";

let authUrl = ""
if (process.env.REACT_APP_PROCESS_STAGE === 'dev')
  authUrl = LOCAL_BACKEND_URL + "/api/auth";
else
  authUrl = BACKEND_URL + "/api/auth";


/**
  * Signup and login a user
  */
export function signup(user: {email: string, password: string, displayName: string}): Promise<User> {
  return new Promise((resolve, reject) =>{

    fetch(`${authUrl}/signup/`, { // First fetch sign up
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then( (res) => { // Then handle the http response
      if(res.ok)
        res.json().then((jsn) => resolve(jsn))
      else
        res.text().then((txt) => reject(txt))
    })
    .catch( err => { // error
      reject(err);
    })
  })
}

/**
  * login a user
  */
export function login(user: {email: string, password: string}): Promise<User> {
  return new Promise((resolve, reject) =>{
    console.log( `url: ${authUrl}/login/`);
    fetch(`${authUrl}/login/`, { // First fetch sign up
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
    .then( (res) => { // Then handle the http response
      if(res.ok)
        res.json().then((jsn) => resolve(jsn))
      else
        res.text().then((txt) => reject(txt))
    })
    .catch( err => { // error
      reject(err);
    })
  })
}

/**
  * logout a user
  */
export function logout(): Promise<string> {
  return new Promise((resolve, reject) =>{

    fetch(`${authUrl}/logout/`, { // First fetch sign up
      method: "get",
      headers: { "Content-Typpose": "application/json" },
    })
    .then( (res) => { // Then handle the http response
      if(res.ok)
        resolve("")
      else
        res.text().then((txt) => reject(txt))
    })
    .catch( err => { // error
      reject(err);
    })
  })
}

/**
  * Check if a user is authenticated 
  */
export function isAuthenticated(userId: any): Promise<Boolean> {
  return new Promise((resolve, reject) =>{

    fetch(`${authUrl}/isAuth/`, { // First fetch sign up
      method: "get",
      credentials: 'include'
    })
    .then( (res) => { // Then handle the http response
      console.log(res)
      if(res.ok)
        resolve(true);
      else if(res.status=== 401)
        resolve(false);
      else
        reject("IsAuthenticated bad request");
    })
    .catch( err => { // error
      reject(err);
    })
  })
}

/**
  * Initiate Forgot a password email
  */
export function forgotPass(email: string): Promise<Boolean> {
  return new Promise((resolve, reject) =>{

    fetch(`${authUrl}/forgotPass`, { // First fetch sign up
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({email: [email]})
    })
    .then( (res) => { // Then handle the http response
      if(res.ok)
        resolve(true);
      else
        res.text().then((txt) => reject(txt))
    })
    .catch( err => { // error
      reject(err);
    })
  })
}

/**
  * change password using id string
  */
export function changePass(resetProps: {resetId: string, password: string}): Promise<Boolean> {
  return new Promise((resolve, reject) =>{

    fetch(`${authUrl}/changePass`, { // First fetch sign up
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({resetId: resetProps.resetId, password: resetProps.password})
    })
    .then( (res) => { // Then handle the http response
      if(res.ok)
        resolve(true);
      else
        res.text().then((txt) => reject(txt))
    })
    .catch( err => { // error
      reject(err);
    })
  })
}

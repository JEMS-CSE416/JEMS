import { NextFunction, Request, Response } from "express";
import { connect, model } from "mongoose";
import { userSchema } from "./UserSchema";
import sendPassReset from "../../../utils/mailer";
import { encryptEmailPass, decryptEmailPass, hashPassword, matches } from "../../../utils/crypt";


/**
 * Connects to the mongodb server and returns a queriable object
 * @returns
 */
async function getUserModel() {
  await connect(process.env.MONGO_DB_CONNECTION_STRING as string);
  return model("User", userSchema);
}

/**
 * Creates user account using username and password
 * @param req request
 * @param res response
 * @returns positive status code
 * @returns error status code
 */
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const UserModel = await getUserModel();

  // Check to see if email is valid
  if(!checkEmail(req.body.email))
    return res.status(400).send("invalid email");
  const userCheck = await UserModel.findOne({email: req.body.email});
  if(userCheck != undefined)
    return res.status(400).send("duplicate email");

  // create a new user
  const userObj = {
    email: req.body.email,
    password: hashPassword(req.body.password),
    displayName: req.body.displayName,
    activeUntil: new Date(Date.UTC(9999, 11, 31, 23, 59, 59, 999))
  }

  // save user
  const user = new UserModel(userObj);
  user.save()
    .then(() => {login(req, res, next)})  // run login if user is created
    .catch((err) => { res.status(400).send("unable to save user due to " + err)})
}

/**
 * Queries data base to check if user exists with matching username and password
 * @param req request
 * @param res response
 * @returns positive status code
 * @returns error status code
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  // check that login is valid
  const UserModel = await getUserModel();
  const user = await UserModel.findOne({email: req.body.email});
  if(user == undefined)    // email check
    return res.status(400).send("bad email");
  if(!matches(req.body.password, user.password))    // password check
    return res.status(400).send("bad password");
  if(new Date(user.activeUntil) < new Date())
    return res.status(400).send("Password Expired");    // password expired

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate((err: Error) => {
    if(err) return res.status(400).send("bad regen")

    // store objectId in session  
    req.session.user = {}
    req.session.user.id = user._id
    req.session.user.displayName = user.displayName
    req.session.user.email = user.email

    //console.log(req.session)
      //return res.status(200).json({
        //id: user._id,
        //displayname: user.displayname,
        //email: user.email
      //}).send();
    console.log(req.session)
    // save session
    req.session.save( (err: Error) => {
      if(err) return res.status(400).send("bad save")
      console.log("2", req.session);

      // return 200 status code
      return res.status(200).json({
        id: user._id,
        displayname: user.displayName,
        email: user.email
      }).send();
    })

  })
}

/**
 * Logs user out of system
 * @param req request
 * @param res response
 * @returns User Data
 * @returns error status code
 */
export const logout = async (req: Request, res: Response) => {
  // remove user from session
  req.session.user = undefined
  console.log("logout", req.session);

  // save session
  req.session.destroy( (err) => {
    if(err) return res.status(400).send()


      // return 200 status code
      return res.status(200).send();

  })
}

/**
 * Checks to see if a request is of a valid user
 * @param req request
 * @param res respons
 * @returns Nothing if passed
 * @returns error status code
*/
export const isAuthMiddleWare = async (req: Request, res: Response, next: NextFunction) => {

  if (req.session.user) next();
  else res.status(401).send("Not Authenticated")
}

/**
 * Checks to see if a request is of a valid user
 * @param req request
 * @param res respons
 * @returns Nothing if passed
 * @returns error status code
*/
export const isAuthEndpt = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user != undefined) res.status(200).send();
  else res.status(401).send("Not Auth");
}

function checkEmail(email: string):boolean{
  // TODO: Check if email is truly an email function
  return true;
}

/**
 * Fills in temporary password for a user and sends an email
 * @param req request
 * @param res response
 * @returns positive status code
 * @returns error status code
 */
export const initiatePasswordChange = async (req: Request, res: Response) => {
  const UserModel = await getUserModel();

  // Check to see if email is duplicate
  const user = await UserModel.findOne({email: req.body.email});
  if(user == undefined)
    return res.status(400).send("Email not found");

  // Generate a temporary password code
  const tempPass = Math.random().toString(36).slice(-8);

  user.password = hashPassword(tempPass);
  user.activeUntil = new Date(Date.now() + 10 *60000) // password is active for 10 minutes

  // send email and respond to user
  user.save()
    .then(() => {sendPassReset(encryptEmailPass(user.email, tempPass), user.email)})  // send mail if password is valid
    .then(() => {res.status(200).send()})  // send mail if password is valid
    .catch((err) => { res.status(400).send("unable to initiate password change user due to " + err)})
}

/**
 * Changes password 
 * @param req request
 * @param res response
 * @returns positive status code
 * @returns error status code
 */
export const changePassword = async (req: Request, res: Response) => {
  const UserModel = await getUserModel();

  // get user and password from the hash provided in the link

  let userDetails = undefined
  try {
    userDetails = decryptEmailPass(req.body.resetId);
  } catch (error) {
    return res.status(400).send("Link invalid");
  }
  const user = await UserModel.findOne({email: userDetails.email});


  // verify link validity
  if(user == undefined)
    return res.status(400).send("Invalid link");    // email not found
  if(new Date(user.activeUntil) < new Date())   
    return res.status(404).send("Link expired");    // Link expired
  if(!matches(userDetails.pass, user.password))
    return res.status(400).send("Link invalid");    // Password not found

  // reset password
    user.password = hashPassword(req.body.password);
  user.activeUntil = new Date(Date.UTC(9999, 11, 31, 23, 59, 59, 999))

  // save user's password and active until
  user.save()
    .then(() => {res.status(200).send()})  // send mail if password is valid
    .catch((err) => { res.status(400).send("unable to initiate password change user due to " + err)})
}


export const swagAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if(req.session.user) return next();
  if(!req.headers.authorization) return next();

  // parse login and password from headers
  const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
  const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
  req.body.email = login;
  req.body.password = password;

  // check that login is valid
  const UserModel = await getUserModel();
  const user = await UserModel.findOne({email: req.body.email});
  if(user == undefined)    // email check
    return res.status(401).send("bad email");
  if(!matches(req.body.password, user.password))    // password check
    return res.status(401).send("bad password");
  if(new Date(user.activeUntil) < new Date())
    return res.status(401).send("Password Expired");    // password expired

  // regenerate the session, which is good practice to help
  // guard against forms of session fixation
  req.session.regenerate((err: Error) => {
    if(err) return res.status(400).send("bad regen")

    // store objectId in session  
    req.session.user = {}
    req.session.user.id = user._id
    req.session.user.displayName = user.displayName
    req.session.user.email = user.email

    // save session
    req.session.save( (err: Error) => {
      if(err) return res.status(400).send("bad save")

      // return 200 status code
      return next();
    })

  })
}




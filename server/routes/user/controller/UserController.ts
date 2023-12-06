import { Request, Response } from "express";
import { connect, model, Types } from "mongoose";
import { User, userSchema } from "./UserSchema";

/**
 * Connects to the mongodb server and returns a queriable object
 * @returns
 */
async function getUserModel() {
  await connect(process.env.MONGO_DB_CONNECTION_STRING as string);
  return model("Users", userSchema);
}

/**
 * Gets a user based on the creatorId
 * @param req request
 * @param res response
 * @returns a user
 * @returns error status code
 */
export const getUser = async (req: Request, res: Response) => {
  try{
    const UserModel = await getUserModel();
    const userId = req.headers.id?.toString();

    /* Check that the user exists */
    const user = await UserModel.findOne({ _id: userId });

    /* User found */
    if (user) {
      return res.status(200).send(user);
    }

    /* User not found */
    return res.status(404).send("Error 404: User not found");
  } catch (err) {
    return res.status(500).send("Error 500: Internal Server Error");
  }
};

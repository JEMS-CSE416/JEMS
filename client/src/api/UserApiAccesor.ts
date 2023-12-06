import { User } from "../utils/models/User";
import { BACKEND_URL, LOCAL_BACKEND_URL } from "../utils/constants";

let userUrl = "";
if (process.env.REACT_APP_PROCESS_STAGE === "dev")
  userUrl = LOCAL_BACKEND_URL + "/api/user";
else userUrl = BACKEND_URL + "/api/user";

/** Get a User */
export async function getUser(id: string): Promise<User> {
  try {
    const res = await fetch(userUrl + "/", {
      method: "GET",
      headers: { "Content-Type": "application/json", "id": id },
      credentials: "include",
    });
    if (res.ok) {
      const resData = await res.json();
      console.log("User Fetched successfully:", resData);
      return resData;
    } else {
      console.error("Error getting user data:", res.status, res.statusText);
    }
  } catch (error) {
    console.log(error);
  }
  return Promise.reject("Error getting user");
}

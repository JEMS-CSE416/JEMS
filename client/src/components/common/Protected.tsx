import { useEffect } from "react"
import { NavigateFunction, Outlet, useNavigate } from "react-router-dom"
import { isAuthenticated } from "../../api/AuthApiAccesor"
import { useAuthContext, useSetAuthContext } from "../../context/AuthContextProvider";

const AUTH_CHECK_DELAY = 20*1000; // 20 second auth check delay

export default function Protected(){
  const navigate = useNavigate();
  const authState = useAuthContext();
  console.log("PROTECTED:", authState);
  useEffect(
    () => { 
      CheckAuth(navigate, authState.user) //initial auth check

      const interval = setInterval( // calls setInterval to repeat authCheck
        () => CheckAuth(navigate, authState.user),
        AUTH_CHECK_DELAY
      )
      return () => {clearInterval(interval);} // cleanup function
    })


  return (
    <Outlet/>
  )
}

function CheckAuth (navigate: NavigateFunction, userid: any){
    console.log("chk:", userid)
  //if(!userid)
      //navigate('/')
  isAuthenticated(userid) //calls isAuthenticated
    .then( isAuth => { // handle promise returned by isAuthenticated
      if(!isAuth) navigate('/')
    })
    .catch(err => { // handle error
      console.log(err)
      navigate('/')
    })
}

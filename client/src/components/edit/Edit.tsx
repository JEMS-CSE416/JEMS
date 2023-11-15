import { wait } from "@testing-library/user-event/dist/utils";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
//import { getMap } from "../../api/MapApiAccessor";
import { EditContextProvider } from '../../context/EditContextProvider';
//import { ErrorMap, Map } from "../../utils/models/Map";

export default function Edit(){
  const { id } = useParams();
  console.log("TODO: remove this log statement. when is used for real" + id)
  //const map = await( id ? getMap(id): getMap(""))

  //const map = ErrorMap
  
  let init_prop = useRef(0)
  
  
  useEffect(
    () => {
      wait(2000);
      init_prop.current = 5;
    }
  )


  return (
      <EditContextProvider>
        <h1>
          Test: {init_prop.current}
        </h1>


      </EditContextProvider>
  );
}



import React, { createContext, useReducer } from "react";
import { ErrorMap, Map } from "../utils/models/Map";

const initState = {
  map: ErrorMap,
  selectedRegion: undefined
}

export const EditContext = createContext<EditPageState>(initState);
export const EditDispatchContext = createContext<React.Dispatch<EditPageState>>(() => {});

interface EditContextProviderProps {
  children?: React.ReactNode;
}

interface EditPageState {
  map: Map;
  selectedRegion ?: String;
}

// EditContextProvider component.
// Children will attempt to access the state of the edit page by calling:
//     const editState = useContext(EditState)
// Children will attempt to change state through the reducer through methods:
//     const dispatch = useContext(EditDispatchcontext)
//     dispatch({
//          
//     }
export function EditContextProvider(props: EditContextProviderProps) {
  const [editPageState, dispatch] = useReducer(editReducer, initState);

  return (
    <EditContext.Provider value={editPageState}>
      <EditDispatchContext.Provider value={dispatch}>
        {props.children}
      </EditDispatchContext.Provider>
    </EditContext.Provider>
  );
}

// TODO: change any action
function editReducer(editPageState: EditPageState, action: any): EditPageState{
  return initState
}


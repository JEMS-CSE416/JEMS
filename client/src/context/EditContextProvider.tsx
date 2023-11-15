import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ErrorMap, Map } from "../utils/models/Map";

const initState = {
  map: ErrorMap,
  selectedRegion: undefined
}

export const EditContext = createContext<EditPageState>(initState);
export const EditDispatchContext = createContext<React.Dispatch<EditPageState>>(() => {});

interface EditContextProviderProps {
  children?: React.ReactNode;
  map_id?: string // TODO: remove the optional portion
}

interface EditPageState {
  map: Map;
  selectedRegion ?: String;
}

/*
 * EditContextProvider component.
 * Children will attempt to access the state of the edit page by calling:
 *    const editState = useContext(EditState)
 * Children will attempt to change state through the reducer through methods:
 *    const dispatch = useContext(EditDispatchcontext)
 *    dispatch({
 *         
 *    })
 */
export function EditContextProvider(props: EditContextProviderProps) {
  const [editPageState, dispatch] = useReducer(editReducer, initState);

  // initialize the map by pulling it from the backend
  useEffect(
    () => {
      // TODO: replace with code to actually query the map
      const newMap = ErrorMap;
      newMap.mapName = "This Map has been initialized"
      dispatch({
        type: "init_map",
        map: newMap
      })
    }, []
  )


  return (
    <EditContext.Provider value={editPageState}>
      <EditDispatchContext.Provider value={dispatch}>
        {props.children}
      </EditDispatchContext.Provider>
    </EditContext.Provider>
  );
}

// TODO: change any action
// This function handles all of the changes to the edit page state
function editReducer(state: EditPageState, action: any): EditPageState{
  switch (action.type){
    case 'init_map':
      // Make sure you create a new state, rather than modify the old one
      // Creating new state ensures that componenents will re-render
      const newState = {
        ...state,
        map: action.map
      }
      return newState
  }

  return state;
}

export function useEditContext(){
  return useContext(EditContext);
}

export function useEditDispatchContext(){
  return useContext(EditDispatchContext);
}

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ErrorMap, Map, Region } from "../utils/models/Map";
import { BACKEND_URL } from "../utils/constants";
// Types
enum EditModalEnum {
  NONE = "NONE",
  MAP_EXPORT = "MAP_EXPORT",
  MAP_SETTINGS = "MAP_SETTINGS"
}

export enum ColorTypes{
  NONE = "NONE",
  CHOROPLETH = "CHOROPLETH",
  COLOR = "COLOR"
}

interface EditContextProviderProps {
  children?: React.ReactNode;
  map_id?: string // TODO: remove the optional portion
}

export interface EditPageState {
  map: Map;
  selectedRegion?: {
    groupName: string;
    i: number;
    region: Region;
    //layer: any;
  }
  modal: String
}

export interface EditPageAction {
  type: String,
  map?: Map,
  modal?: String,
  selectedRegion?: {
    groupName: string;
    i: number;
    region: Region;
    //layer: any;
  }
}



// Constant initialization
const initState = {
  map: ErrorMap,
  selectedRegion: undefined,
  modal: "NONE"
}

export const EditContext = createContext<EditPageState>(initState);
export const EditDispatchContext = createContext<React.Dispatch<EditPageAction>>(() => { });

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
  useEffect(() => {
    console.log("1--------------------")

    fetchMap();
  }, []);

  console.log("2--------------------")

  const fetchMap = async () => {
    // Replace with your API endpoint and map ID
    const apiUrl = BACKEND_URL+"/api/maps/{id}/?id=";
    const mapId = props.map_id; 
    console.log(mapId)

    try {
      console.log(`fetching map for id: ${mapId}`);
      const res = await fetch(`${apiUrl}${mapId}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const newMap = await res.json();
      console.log(newMap)
      dispatch({
        type: "init_map",
        map: newMap
      });
    } catch (error) {
      console.error("Error fetching map:", error);
    }
  };


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
function editReducer(state: EditPageState, action: any): EditPageState {
  console.log("EDIT REDUCER: ",action.map)
  switch (action.type) {
    case 'init_map':
      // Make sure you create a new state, rather than modify the old one
      // Creating new state ensures that componenents will re-render
      return {
        ...state,
        map: action.map ?? ErrorMap
      }
    case 'change_modal':
      return {
        ...state,
        modal: Object.values(EditModalEnum).includes(action.modal) ? action.modal : "NONE"
      }
    case 'select_region':
      const selectedRegion = {
          i: action.selectedRegion.i,
          groupName: action.selectedRegion.groupName,
          region: action.selectedRegion.region,
          //layer: action.selectedRegion.layer,
        }

      return {
        ...state,
        selectedRegion: selectedRegion
      }
    case 'update_map':
      return {
        ...state,
        map: action.map
      }
  }

  return state;
}

export function useEditContext() {
  return useContext(EditContext);
}

export function useEditDispatchContext() {
  return useContext(EditDispatchContext);
}

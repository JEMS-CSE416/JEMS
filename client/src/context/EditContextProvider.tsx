import React, { createContext, useContext, useEffect, useReducer } from "react";
import { ErrorMap, Map, Region } from "../utils/models/Map";
import { BACKEND_URL } from "../utils/constants";
// Types
enum EditModalEnum {
  NONE = "NONE",
  MAP_EXPORT = "MAP_EXPORT",
  MAP_SETTINGS = "MAP_SETTINGS",
}

export enum ColorTypes {
  NONE = "NONE",
  CHOROPLETH = "CHOROPLETH",
  COLOR = "COLOR",
}

interface EditContextProviderProps {
  children?: React.ReactNode;
  map_id?: string; // TODO: remove the optional portion
}

export interface EditPageState {
  map: Map;
  selectedRegion?: {
    groupName: string; // does not change when being edited. Only changes when user edits and locks it in by pressing enter.
    i: number;
    region: Region;
  };
  modal: String;
}

export interface EditPageAction {
  type: String;
  map?: Map;
  modal?: String;
  selectedRegion?: {
    groupName: string;
    i: number;
    region: Region;
  };
}

// Constant initialization
const initState = {
  map: ErrorMap,
  selectedRegion: undefined,
  modal: "NONE",
};

export const EditContext = createContext<EditPageState>(initState);
export const EditDispatchContext = createContext<
  React.Dispatch<EditPageAction>
>(() => {});

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
    fetchMap();
  }, []);

  const fetchMap = async () => {
    // Replace with your API endpoint and map ID
    const apiUrl = BACKEND_URL + "/api/maps/{id}/?id=";
    const mapId = props.map_id;

    try {
      console.log(`fetching map for id: ${mapId}`);
      const res = await fetch(`${apiUrl}${mapId}`);
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const newMap = await res.json();
      console.log(newMap);
      dispatch({
        type: "init_map",
        map: newMap,
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
  console.log("EDIT REDUCER: ", action);
  switch (action.type) {
    case "init_map":
      // Make sure you create a new state, rather than modify the old one
      // Creating new state ensures that componenents will re-render
      return {
        ...state,
        map: action.map ?? ErrorMap,
      };
    case "change_modal":
      return {
        ...state,
        modal: Object.values(EditModalEnum).includes(action.modal)
          ? action.modal
          : "NONE",
      };
    case "update_map":
      console.log("updating map state");
      console.log(action.map);
      return {
        ...state,
        map: action.map ?? ErrorMap,
      };
    case "select_region":
      const selectedRegion = {
        i: action.selectedRegion.i,
        groupName: action.selectedRegion.groupName,
        region: action.selectedRegion.region,
        //layer: action.selectedRegion.layer,
      };

      return {
        ...state,
        selectedRegion: selectedRegion,
      };
    case "update_selected_region_info":
      const updatedSelectedRegionInfo = {
        i: action.selectedRegion.i,
        groupName: action.selectedRegion.groupName,
        region: action.selectedRegion.region,
      };

      return {
        ...state,
        selectedRegion: updatedSelectedRegionInfo,
      };
    case "update_selected_region_group_name":
      const oldGroupName = state.selectedRegion!.groupName;
      const newGroupName = action.selectedRegion.groupName;
      const newRegions = { ...state.map.regions };
      if (newGroupName in newRegions) {
        // If the groupName exists
        console.log("adding to existing group: ", newGroupName);
        //update the corresponding region to have the region.
        newRegions[newGroupName] = [
          ...newRegions[newGroupName],
          action.selectedRegion.region,
        ];
        // Then remove the old region from the old group.
        newRegions[oldGroupName] = newRegions[oldGroupName].filter(
          (region) =>
            region.regionName !== action.selectedRegion.region.regionName
        );
        // If the old group is now empty then remove it.
        if (newRegions[oldGroupName].length === 0) {
          delete newRegions[oldGroupName];
        }
      } else {
        // If the groupName doesn't exist
        console.log("adding new group: ", newGroupName);
        // add a new group to the regions map and add the region to the group.
        newRegions[newGroupName] = [action.selectedRegion.region];
        // then remove the region from the old group.
        newRegions[oldGroupName] = newRegions[oldGroupName].filter(
          (region) =>
            region.regionName !== action.selectedRegion.region.regionName
        );
        // If the old group is now empty then remove it.
        if (newRegions[oldGroupName].length === 0) {
          delete newRegions[oldGroupName];
        }
      }

      console.log("updated state: ", {
        ...state,
        map: {
          ...state.map,
          regions: newRegions,
        },
      });

      
      return {
        ...state,
        map: {
          ...state.map,
          regions: newRegions,
        },
      };
    case "update_map":
      return {
        ...state,
        map: action.map,
      };
  }
  return state;
}

export function useEditContext() {
  return useContext(EditContext);
}

export function useEditDispatchContext() {
  return useContext(EditDispatchContext);
}

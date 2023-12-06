import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ErrorMap, Map, Region } from "../utils/models/Map";
import { BACKEND_URL } from "../utils/constants";
import { create, update } from "cypress/types/lodash";
import { getMap } from "../api/MapApiAccessor";
import { EditModalEnum } from "../utils/enums";
import { Map as LeafletMap } from "leaflet";
import * as L from "leaflet";

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
  getUniqueColors: () => string[];
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
  leafletMap?: LeafletMap;
}

// Constant initialization
const initState = {
  map: ErrorMap,
  selectedRegion: undefined,
  modal: "NONE",
  leafletMap: undefined,
  getUniqueColors: () => [] as string[]
};

export const EditContext = createContext<EditPageState>(initState);
export const EditDispatchContext = createContext<
  React.Dispatch<EditPageAction>
>(() => {});

export const LeafletMapContext = createContext<LeafletMap | undefined>(
  undefined
);

export const leafletMapPrinterContext = createContext<any>(undefined);
export const setLeafletMapPrinterContext = createContext<
  React.Dispatch<React.SetStateAction<any>> | undefined
>(undefined);

export const SetLeafletMapContext = createContext<
  React.Dispatch<React.SetStateAction<LeafletMap | undefined>> | undefined
>(undefined);

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
  const [leafletMap, setLeafletMap] = useState<LeafletMap | undefined>(
    undefined
  );
  const [leafletMapPrinter, setLeafletMapPrinter] = useState<any>(undefined);

  // initialize the map by pulling it from the backend
  useEffect(() => {
    fetchMap();
  }, []);

  const fetchMap = async () => {
    // Replace with your API endpoint and map ID
    const mapId = props.map_id;

    try {
      console.log(`fetching map for id: ${mapId}`);
      const res = await getMap({ id: mapId as string });
      const newMap = res;
      console.log("newMap", newMap);
      dispatch({
        type: "init_map",
        map: newMap,
      });
    } catch (error) {
      console.error("Error fetching map:", error);
    }
  };

  // Helper functions for editPageState
  editPageState.getUniqueColors = ()=>{
    const res = Object.entries(editPageState.map.regions).reduce(
      (acc, current_group: [string, Region[]]) => {
        acc = acc.concat( current_group[1].reduce(
            (acc, region: Region) => {
              if(region.color !== "")
                acc.push(region.color)
              return acc
            }, [] as string[]
          )
        )
        return acc
      }, [] as string[]
    )
    return Array.from(new Set(res))
  }

  return (
    <EditContext.Provider value={editPageState}>
      <EditDispatchContext.Provider value={dispatch}>
        <LeafletMapContext.Provider value={leafletMap}>
          <SetLeafletMapContext.Provider value={setLeafletMap}>
            <leafletMapPrinterContext.Provider value={leafletMapPrinter}>
              <setLeafletMapPrinterContext.Provider value={setLeafletMapPrinter}>
                {props.children}
              </setLeafletMapPrinterContext.Provider>
            </leafletMapPrinterContext.Provider>
          </SetLeafletMapContext.Provider>
        </LeafletMapContext.Provider>
      </EditDispatchContext.Provider>
    </EditContext.Provider>
  );
}

// TODO: change any action
// This function handles all of the changes to the edit page state
function editReducer(state: EditPageState, action: any): EditPageState {
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
      return {
        ...state,
        map: action.map ?? ErrorMap,
      };
    case "select_region":
      const selectedRegion = {
        i: action.selectedRegion.i,
        groupName: action.selectedRegion.groupName,
        region: action.selectedRegion.region,
      };

      return {
        ...state,
        selectedRegion: selectedRegion,
      };
    case "update_selected_region_info":
      const oldGroupName = state.selectedRegion!.groupName;
      const newGroupName = action.selectedRegion.groupName;
      const newRegions = { ...state.map.regions };

      let updatedSelectedRegionInfo = {
        i: action.selectedRegion.i,
        groupName: action.selectedRegion.groupName,
        region: action.selectedRegion.region,
      };

      // Update region info first then move groups if necessary
      newRegions[oldGroupName][state.selectedRegion!.i].regionName =
        action.selectedRegion.region.regionName;
      newRegions[oldGroupName][state.selectedRegion!.i].stringLabel =
        action.selectedRegion.region.stringLabel;
      newRegions[oldGroupName][state.selectedRegion!.i].stringOffset =
        action.selectedRegion.region.stringOffset;
      newRegions[oldGroupName][state.selectedRegion!.i].numericLabel =
        action.selectedRegion.region.numericLabel;
      newRegions[oldGroupName][state.selectedRegion!.i].numericUnit =
        action.selectedRegion.region.numericUnit;
      newRegions[oldGroupName][state.selectedRegion!.i].color =
        action.selectedRegion.region.color;

      // If the group name has changed then move the region to the new group
      if (newGroupName !== oldGroupName) {
        if (newGroupName in newRegions) {
          // If the groupName exists
          console.log("adding to existing group: ", newGroupName);
          //update the corresponding region to have the region.
          newRegions[newGroupName] = [
            ...newRegions[newGroupName],
            action.selectedRegion.region,
          ];
          // update the selected region info so we are currently viewing the updated region.
          updatedSelectedRegionInfo.groupName = newGroupName;
          updatedSelectedRegionInfo.i = newRegions[newGroupName].length - 1;
          updatedSelectedRegionInfo.region =
            newRegions[newGroupName][newRegions[newGroupName].length - 1];

          // Then remove the old region from the old group.
          newRegions[oldGroupName] = newRegions[oldGroupName].filter(
            (_, i) => i !== action.selectedRegion.i
          );

          // If the old group is now empty then remove it.
          if (newRegions[oldGroupName].length === 0) {
            delete newRegions[oldGroupName];
          }
        } else {
          // If the groupName doesn't exist
          console.log("adding new group: ", newGroupName);
          // add a new group to the regions map and add the region to the group.
          // also update the selected region info so we are currently viewing the updated region.
          newRegions[newGroupName] = [action.selectedRegion.region];
          updatedSelectedRegionInfo.groupName = newGroupName;
          updatedSelectedRegionInfo.i = 0;
          updatedSelectedRegionInfo.region = newRegions[newGroupName][0];

          // then remove the region from the old group.
          newRegions[oldGroupName] = newRegions[oldGroupName].filter(
            (_, i) => i !== action.selectedRegion.i
          );
          // If the old group is now empty then remove it.
          if (newRegions[oldGroupName].length === 0) {
            delete newRegions[oldGroupName];
          }
        }
      }

      const newMap = {
        ...state.map,
        regions: newRegions
      }

      console.log("updated state: ", {
        ...state,
        map: newMap,
        selectedRegion: updatedSelectedRegionInfo,
      });

      return {
        ...state,
        map: newMap,
        selectedRegion: updatedSelectedRegionInfo,
      };
    case "update_map":
      return {
        ...state,
        map: action.map,
      };
    case "update_color_legend":
      return {
        ...state,
        map: {
          ...state.map,
          legend: {
            ...state.map.legend,
            colorLegend: action.map.legend.colorLegend,
          },
        },
      };
    case "update_choropleth_legend":
      return {
        ...state,
        map: {
          ...state.map,
          legend: {
            ...state.map.legend,
            choroplethLegend: action.map.legend.choroplethLegend,
          },
        },
      };
  }

  return state;
}

export function useLeafletMapContext() {
  return useContext(LeafletMapContext);
}

export function useLeafLetMapPrinter() {
  return useContext(leafletMapPrinterContext);
}

export function useEditContext() {
  return useContext(EditContext);
}

export function useEditDispatchContext() {
  return useContext(EditDispatchContext);
}

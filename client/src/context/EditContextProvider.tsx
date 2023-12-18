import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ErrorMap, Map as JemsMap, Region } from "../utils/models/Map";
import { BACKEND_URL } from "../utils/constants";
import { create, update } from "cypress/types/lodash";
import { getMap, updateMap } from "../api/MapApiAccessor";
import { EditModalEnum } from "../utils/enums";
import chroma from "chroma-js";
import { Map as LeafletMap } from "leaflet";
import * as L from "leaflet";
import { useNavigate } from "react-router-dom";

interface EditContextProviderProps {
  children?: React.ReactNode;
  map_id?: string; // TODO: remove the optional portion
}

export interface EditPageState {
  map: JemsMap;
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
  map?: JemsMap;
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
  getUniqueColors: () => [] as string[],
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
  const navigate = useNavigate();

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

      // If choroplethlegend items is empty, then we need to populate it, otherwise use values stored
      if (
        Object.keys(newMap.legend.choroplethLegend.items).length === 0 &&
        newMap.regions
      ) {
        console.log("choroplethLegend items is empty, populating it");
        // Append min/max and choropleth legend items to the newly created map
        const items = findChoroplethItems(
          editPageState,
          newMap.legend.choroplethLegend.hue,
          newMap
        );
        // Get min/max values from choroItems
        const min = Math.min(...Object.values(items))
          ? Math.min(...Object.values(items))
          : Number.MAX_SAFE_INTEGER;
        const max = Math.max(...Object.values(items))
          ? Math.max(...Object.values(items))
          : Number.MIN_SAFE_INTEGER;
        const hue = newMap.legend.choroplethLegend.hue;
        newMap.legend.choroplethLegend = {
          hue: hue,
          min: min,
          max: max,
          items: items,
        };

        try {
          const map = updateMap({ map: newMap });
        } catch (error) {
          console.log(error);
        }
      }

      console.log("newMap", newMap);
      dispatch({
        type: "init_map",
        map: newMap,
      });
    } catch (error: any) {
      console.error("Error fetching map:", error);
      navigate("/home/", { state: { err401: true } });
    }
  };

  // Helper functions for editPageState
  editPageState.getUniqueColors = () => {
    const res = Object.entries(editPageState.map.regions).reduce(
      (acc, current_group: [string, Region[]]) => {
        acc = acc.concat(
          current_group[1].reduce((acc, region: Region) => {
            if (region.color !== "") acc.push(region.color);
            return acc;
          }, [] as string[])
        );
        return acc;
      },
      [] as string[]
    );
    return Array.from(new Set(res));
  };

  return (
    <EditContext.Provider value={editPageState}>
      <EditDispatchContext.Provider value={dispatch}>
        <LeafletMapContext.Provider value={leafletMap}>
          <SetLeafletMapContext.Provider value={setLeafletMap}>
            <leafletMapPrinterContext.Provider value={leafletMapPrinter}>
              <setLeafletMapPrinterContext.Provider
                value={setLeafletMapPrinter}
              >
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
      console.log("inside update_map 1");

      // When region is being deleted, update the choropleth legend information.
      let updatedChoroplethLegend3 = state.map.legend.choroplethLegend;
      const choroItems3 = findChoroplethItems(
        state,
        updatedChoroplethLegend3.hue
      );
      updatedChoroplethLegend3 = {
        ...updatedChoroplethLegend3,
        items: choroItems3,
      };

      // Get min/max values from choroItems
      const min3 = Math.min(
        ...Object.values(updatedChoroplethLegend3.items as unknown as number[])
      );

      const max3 = Math.max(
        ...Object.values(updatedChoroplethLegend3.items as unknown as number[])
      );

      updatedChoroplethLegend3 = {
        ...updatedChoroplethLegend3,
        min: min3,
        max: max3,
      };

      const newMap2 = {
        ...state.map,
        ...action.map,
        legend: {
          ...state.map.legend,
          choroplethLegend: updatedChoroplethLegend3,
        },
      };
      return {
        ...state,
        map: newMap2 ?? ErrorMap,
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

      // Update hue
      const oldChoroplethLegend = state.map.legend.choroplethLegend;
      let updatedChoroplethLegend = {
        ...oldChoroplethLegend,
        hue: action.map?.legend?.choroplethLegend.hue,
      };

      // Add choropleth items
      const choroItems = findChoroplethItems(
        state,
        updatedChoroplethLegend.hue
      );
      console.log(choroItems);

      // Get min/max values from choroItems
      const min = Math.min(...Object.values(choroItems));
      const max = Math.max(...Object.values(choroItems));
      updatedChoroplethLegend = {
        ...updatedChoroplethLegend,
        min: min,
        max: max,
        items: choroItems,
      };

      const newMap = {
        ...state.map,
        regions: newRegions,
        legend: {
          ...state.map.legend,
          choroplethLegend: updatedChoroplethLegend,
        },
      };

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
      const oldChoroplethLegend2 = state.map.legend.choroplethLegend;
      let updatedChoroplethLegend2 = {
        ...oldChoroplethLegend2,
        hue: action.map.legend.choroplethLegend?.hue,
        items: action.map.legend.choroplethLegend?.items, // If items defined, then being called from Legend.tsx
      };

      if (action.map.legend.choroplethLegend?.items === undefined) {
        // If items undefined, then being called from Properties.tsx
        const choroItems2 = findChoroplethItems(
          state,
          updatedChoroplethLegend2.hue
        );
        updatedChoroplethLegend2 = {
          ...updatedChoroplethLegend2,
          items: choroItems2,
        };
      }

      // Get min/max values from choroItems
      const min2 = Math.min(
        ...Object.values(updatedChoroplethLegend2.items as number[])
      );
      const max2 = Math.max(
        ...Object.values(updatedChoroplethLegend2.items as number[])
      );
      updatedChoroplethLegend2 = {
        ...updatedChoroplethLegend2,
        min: min2,
        max: max2,
      };

      return {
        ...state,
        map: {
          ...state.map,
          legend: {
            ...state.map.legend,
            choroplethLegend: updatedChoroplethLegend2,
          },
        },
      };
  }
  return state;
}

function findChoroplethItems(
  state: EditPageState,
  newHue: string,
  newMap?: JemsMap
) {
  let regions;
  if (newMap) {
    // If newMap is defined, means we are initializing/reopening the map. Should not be using the states because it will be unready.
    regions = newMap.regions;
  } else {
    // If newMap is undefined, means we are updating the map. Should be using the states.
    regions = state.map.regions;
  }
  console.log(regions);

  //Objects of {color, value} to be returned
  let newItems: { [key: string]: number } = {};
  if (regions) {
    const filename = Object.keys(regions);
    let value = 0;
    let color = chroma(newHue).brighten(value).hex();

    //Get unique numeric label values
    const uniqueValues: { numericLabel: string; numericLabelNumber: number }[] =
      [];
    for (let i = 0; i < filename.length; i++) {
      const region = regions[filename[i]];
      for (let j = 0; j < region.length; j++) {
        const numericLabel: string = region[j].numericLabel;
        const numericLabelNumber = Number(numericLabel);

        //if numericLabel is an existing key in uniqueValues, skip
        if (uniqueValues.some((value) => value.numericLabel === numericLabel)) {
          continue;
        }
        if (numericLabel === "") continue;
        else uniqueValues.push({ numericLabel, numericLabelNumber });
      }
    }
    console.log(uniqueValues);

    //Sort the unique values in decreasing order
    uniqueValues.sort((a, b) => b.numericLabelNumber - a.numericLabelNumber);

    uniqueValues.forEach((value, index) => {
      color = chroma(newHue)
        .brighten(index - 0.5)
        .hex();
      newItems[color] = value.numericLabelNumber;
    });
  }
  console.log(newItems);
  return newItems ;
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

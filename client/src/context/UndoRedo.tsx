import { useHotkeys } from "@mantine/hooks";
import React, { createContext, useContext } from "react";
import { useState } from "react";
import { EditPageAction, EditPageState, useEditContext, useEditDispatchContext } from "./EditContextProvider";

export const UndoRedoContext = createContext<Function>(() => {});

export function UndoRedo(props: {children?: React.ReactNode}){
  const editState = useEditContext();
  const setEditState = useEditDispatchContext();


  // convention:
  // i = 0 if there is nothing to undo
  // i = stack.length + 1 if there is nothing to redo
  // i = n then the user can perform undoStack[n-1].undo() or
  //       undoStack[n].redo
  //  0 1 2 3 4 5 6
  // 0 1 2 3 4 5 6
  //  1 2 3 4 5 6 7
  const [undoStack, setUndoStack] = useState([] as Undoable[]);
  const [i, setI] = useState(0);
  useHotkeys([
    ['ctrl+z', () => {console.log("undoing!"); undo();}],
    ['ctrl+shift+z', () => {console.log("redoing!"); redo();}]
  ]);

  function undo() {
    if(i <= 0){
      console.log("Nothing to undo")
      return
    }
    undoStack[i-1].undo(editState, setEditState);
    setI(i - 1);
  }

  function redo() {
    if(i >= undoStack.length){
      console.log("Nothing to redo")
      return
    }
    undoStack[i].redo(editState, setEditState);
    setI(i + 1);
  }

  function addToStack(action: Undoable){
    const newStack = undoStack.slice(0, i);
    newStack.push(action);
    setI(i + 1)
    setUndoStack(newStack)
    action.firstTime(editState, setEditState)
  }

  return <UndoRedoContext.Provider value={(action: Undoable) => addToStack(action)}>
    {props.children}
    
  </UndoRedoContext.Provider>

}


export interface Undoable {
  firstTime: Function,
  undo: Function,
  redo: Function
}

export class UndoableAddRegion implements Undoable{
  regionInfo: {[key:string]: any}

  constructor(regionInfo: {[key: string]: any[]}){
      this.regionInfo = regionInfo

  }

  firstTime(editState: EditPageState, setEditState: React.Dispatch<EditPageAction>){
    this.redo(editState, setEditState);
  }

  undo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    const map = {
      ...editPageState.map
    }
    Object.keys(this.regionInfo).forEach(key => {
      delete map.regions[key]
    })
    setEditPageState({ type: "update_map", map: map});
  }

  redo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    editPageState.map.regions = {
      ...editPageState.map.regions,
      ...this.regionInfo
    }
    setEditPageState({ type: "update_map", map: editPageState.map });
  }
}

export class UndoableDeleteRegion extends UndoableAddRegion{
  constructor(regionName: string, regions: any[]){
    super({[regionName]: regions})
  }

  firstTime(editState: EditPageState, setEditState: React.Dispatch<EditPageAction>){
    super.undo(editState, setEditState);
  }

  undo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    super.redo(editPageState, setEditPageState);
  }

  redo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    super.undo(editPageState, setEditPageState);
  }
}

export class UndoableChangeMapProp implements Undoable{
  mapKeyVal: {[key: string]: any}
  prevMapKeyVal: {[key: string]: any}
  constructor(mapKeyVal: {[key: string]: any}, prevMapKeyVal: {[key: string]: any}){
    this.mapKeyVal = mapKeyVal
    this.prevMapKeyVal = prevMapKeyVal

  }

  firstTime(editState: EditPageState, setEditState: React.Dispatch<EditPageAction>){
    this.redo(editState, setEditState);
  }

  undo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({ type: "update_map", map: {
      ...editPageState.map ,
      ...this.prevMapKeyVal
    }});
  }

  redo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({ type: "update_map", map: {
      ...editPageState.map ,
      ...this.mapKeyVal
    }});
  }
}

export class UndoableColorLegend implements Undoable{
  key: string;
  prev: string;
  curr: string;
  constructor(key: string, curr: string, prev: string){
    this.key = key;
    this.prev = prev;
    this.curr = curr;

  }

  firstTime(editState: EditPageState, setEditState: React.Dispatch<EditPageAction>){
    this.redo(editState, setEditState);
  }

  undo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({
      type: "update_color_legend",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          colorLegend: {
            ...editPageState.map.legend.colorLegend,
            [this.key]: this.prev,
          },
        },
      },
    });
  }

  redo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({
      type: "update_color_legend",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          colorLegend: {
            ...editPageState.map.legend.colorLegend,
            [this.key]: this.curr,
          },
        },
      },
    });
  }
}

export class UndoableDrag implements Undoable{
  currOffset: Number[];
  prevOffset: Number[];
  groupName: string;
  i: number;
  constructor(currOffset: Number[], prevOffset: Number[], groupName: string, i: number){
    this.currOffset = currOffset 
    this.prevOffset = prevOffset
    this.groupName = groupName
    this.i = i

  }

  firstTime(editState: EditPageState, setEditState: React.Dispatch<EditPageAction>){
    this.redo(editState, setEditState);
  }

  undo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({
      type: "update_selected_region_info",
      map:{
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend
        }
      },
      oldGroupDetails: {
        i: this.i,
        groupName: this.groupName,
      },
      selectedRegion: {
        i: this.i,
        groupName: this.groupName,
        region: {
          ...editPageState.map.regions[this.groupName][this.i],
          stringOffset: this.prevOffset
        },
      },
    });
  }

  redo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({
      type: "update_selected_region_info",
      map:{
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend
        }
      },
      oldGroupDetails: {
        i: this.i,
        groupName: this.groupName,
      },
      selectedRegion: {
        i: this.i,
        groupName: this.groupName,
        region: {
          ...editPageState.map.regions[this.groupName][this.i],
          stringOffset: this.currOffset
        },
      },
    });
  }
}

export class UndoableHue implements Undoable{
  prev: string;
  curr: string;
  constructor(curr: string, prev: string){
    this.prev = prev;
    this.curr = curr;

  }

  firstTime(editState: EditPageState, setEditState: React.Dispatch<EditPageAction>){
    this.redo(editState, setEditState);
  }

  undo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({
      type: "update_choropleth_legend",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          choroplethLegend: {
            ...editPageState.map.legend.choroplethLegend,
            hue: this.prev,
          },
        },
      },
    });
  }

  redo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    setEditPageState({
      type: "update_choropleth_legend",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          choroplethLegend: {
            ...editPageState.map.legend.choroplethLegend,
            hue: this.curr,
          },
        },
      },
    })
  }
}


export class UndoableRegionProperty implements Undoable{
  oldHue: string;
  oldI: number;
  oldGroupName: string;
  oldRegion: any;
  newHue: string;
  newI: number;
  newGroupName: string;
  newRegion: any;
  constructor(
    oldHue: string,
    oldI: number,
    oldGroupName: string,
    oldRegion: any,
    newHue: string,
    newI: number,
    newGroupName: string,
    newRegion: any
  ){
    this.oldHue = oldHue
    this.oldI = oldI
    this.oldGroupName = oldGroupName
    this.oldRegion = oldRegion
    this.newHue = newHue
    this.newI = newI
    this.newGroupName = newGroupName
    this.newRegion = newRegion

    console.warn("INIT: old  -> new ")
    console.log(this.oldI)
    console.log(this.newI)
    console.log(this.oldGroupName)
    console.log(this.newGroupName)
    console.log(this.oldRegion)
    console.log(this.newRegion)
    console.warn("sandwich")

  }

  firstTime(editState: EditPageState, setEditState: React.Dispatch<EditPageAction>){
    this.redo(editState, setEditState);
  }

  undo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    const doesGroupNameChange = this.oldGroupName !== this.newGroupName;

    const isOldGroupNameNew =
      doesGroupNameChange
        ?  editPageState.map.regions[this.oldGroupName!] === undefined
        : false

    if(doesGroupNameChange){
      if(!isOldGroupNameNew)
        this.oldI = editPageState.map.regions[this.oldGroupName!].length - 1
      else
        this.oldI = 0
    }

    console.warn("UNDO: old  -> new ")
    console.warn(`bool isOldGroupNameNew ${isOldGroupNameNew}`)
    console.warn(`check editPagey ${editPageState.map.regions[this.oldGroupName!]}`)
    console.log(this.oldI)
    console.log(this.newI)
    console.log(this.oldGroupName)
    console.log(this.newGroupName)
    console.log(this.oldRegion)
    console.log(this.newRegion)
    console.warn("sandwich")

    setEditPageState({
      type: "update_selected_region_info",
      map:{
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          choroplethLegend: {
            ...editPageState.map.legend.choroplethLegend,
            hue: this.oldHue,
          },
        },
      },

      oldGroupDetails: { // in undo, replace with new Group Details
        i: this.newI,
        groupName: this.newGroupName,
      },
      selectedRegion: {
        i: this.newI,      // this should be what you're changing to
        groupName: this.oldGroupName,
        region: {
          ...this.oldRegion
        }
      }
    });
  }

  redo(editPageState: EditPageState, setEditPageState: React.Dispatch<EditPageAction>){
    const doesGroupNameChange = this.oldGroupName !== this.newGroupName;

    const isNewGroupNameNew =
      doesGroupNameChange
        ?  editPageState.map.regions[this.newGroupName!] === undefined
        : false


    if(doesGroupNameChange){
      if(!isNewGroupNameNew)
        this.newI = editPageState.map.regions[this.newGroupName!].length
      else
        this.newI = 0
    }

    console.warn("REDO: old  -> new ")
    console.log(this.oldI)
    console.log(this.newI)
    console.log(this.oldGroupName)
    console.log(this.newGroupName)
    console.log(this.oldRegion)
    console.log(this.newRegion)
    console.warn("sandwich")
    setEditPageState({
      type: "update_selected_region_info",
      map:{
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          choroplethLegend: {
            ...editPageState.map.legend.choroplethLegend,
            hue: this.newHue,
          },
        },
      },

      oldGroupDetails: { // in undo, replace with new Group Details
        i: this.oldI,
        groupName: this.oldGroupName,
      },
      selectedRegion: {
        i: this.oldI,      // this should be what you're changing to
        groupName: this.newGroupName,
        region: {
          ...this.newRegion
        }
      }
    });
  }
}
/*
      type: "update_selected_region_info",
      map: {
      },
      selectedRegion: {
        ...editPageState.selectedRegion!,
        region: {
          ...editPageState.selectedRegion!.region,
          regionName: regionNameState === "" ? "Untitled" : regionNameState!,
          stringLabel: stringLabelState!,
          numericLabel: numericLabelState.toString(),
          numericUnit: unitsState,
          color:
            colorState === ""
              ? editPageState.selectedRegion!.region.color
              : colorState!,
        },
        groupName:
          groupNameState === ""
            ? editPageState.selectedRegion!.groupName
            : groupNameState!,
      },
      */


export function useUndoRedoContext() {
  return useContext(UndoRedoContext);
}


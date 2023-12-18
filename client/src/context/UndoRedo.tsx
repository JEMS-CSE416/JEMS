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

export function useUndoRedoContext() {
  return useContext(UndoRedoContext);
}


import { useContext } from "react";
import { EditContext } from "../../context/EditContextProvider";

export default function Cavnas(props: any){
  const edit_context = useContext(EditContext)

  return (
  <p>
    {JSON.stringify(edit_context.map)}
  </p>
  )
}

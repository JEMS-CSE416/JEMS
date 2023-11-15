import { useParams } from "react-router-dom";
import { EditContextProvider } from '../../context/EditContextProvider';
import Canvas from "./Canvas";
import EditNavBar from "./EditNavbar";

export default function Edit(){
  const { id } = useParams();
  return (
      <EditContextProvider map_id={id}>
        <EditNavBar/>
        <Canvas>
        </Canvas>
      </EditContextProvider>
  );
}



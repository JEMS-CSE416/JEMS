import React from "react";
import DisplayMap from "./DisplayMap";
import { GeoJSON } from "geojson";
import { FileInfo } from "../utils/global_utils";

interface CanvasProps {
  fileInfo: FileInfo;
}

const Canvas: React.FC<CanvasProps> = ({ fileInfo }) => {
    return (
        <>
            {fileInfo.fileContent !== undefined // only display render displaymap if goejson exists
              ?<DisplayMap 
                fileInfo={fileInfo}/>
              :<></>
            }
        </>
    )
}

export default Canvas;

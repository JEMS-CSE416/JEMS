import React from "react";
import DisplayMap from "./DisplayMap";
import { FileInfo } from "../utils/global_utils";

interface CanvasProps {
  fileInfo: FileInfo;
}

const OldCanvas: React.FC<CanvasProps> = ({ fileInfo }) => {
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

export default OldCanvas;

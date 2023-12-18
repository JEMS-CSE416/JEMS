import { useMap } from "react-leaflet";
import * as L from "leaflet";
import { useEffect } from "react";

function EasyPrint() {
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      const printer = L.easyPrint({
        sizeModes: ["A4Landscape"],
        filename: "MyMap",
        exportOnly: true,
        hideControlContainer: true,
      });
      printer.addTo(map);
    }
  }, []);

  return <></>;
}

export default EasyPrint;

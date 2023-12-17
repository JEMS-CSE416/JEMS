import { useMap } from "react-leaflet";
import * as L from "leaflet";

function EasyPrint(){
  const map = useMap();

  if (map) {
    const printer = L.easyPrint({
      sizeModes: ["Current", "A4Portrait", "A4Landscape"],
      filename: "MyMap",
      exportOnly: true,
      hideControlContainer: true,
    }).addTo(map);
  }

  return <></>;
};

export default EasyPrint;

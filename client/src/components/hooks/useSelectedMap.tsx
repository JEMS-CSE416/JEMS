import { Map } from "../../utils/models/Map";
import { useLocation } from "react-router-dom";
/* Custom React Hook, selectedMap content can now be accessed without passing as a prop */
export const useSelectedMap = () => {
  const location = useLocation();
  const selectedMap = location.state;
  return selectedMap as Map;
};

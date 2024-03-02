import { useState, useEffect } from "react";
import useWindowDimensions from "./useWindowDimension";

export const useHideSidebar = () => {
  const [isHide, setIsHide] = useState(false);
  const { width } = useWindowDimensions();

  const toggleHide = () => {
    if (isHide === true) {
      setIsHide(false);
    } else {
      setIsHide(true);
    }
  };

  useEffect(() => {
    if (width < 1200) {
      setIsHide(true);
    } else {
			setIsHide(false)
		}
  }, [width]);

  return [isHide, toggleHide];
};

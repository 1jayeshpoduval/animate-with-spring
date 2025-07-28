import { useState, useEffect } from "react";
import useWindowSize from "./useWindowSize";

const useBallX = (ref) => {
  const [ballTravelDistance, setBallTravelDistance] = useState(0);

  const windowSize = useWindowSize(); // Dynamic window resize hook

  useEffect(() => {
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect(); // Get the width of the dotted line ref
      setBallTravelDistance(width);
    } else return;
  }, [windowSize.width, ref]);

  return { ballTravelDistance };
};

export default useBallX;

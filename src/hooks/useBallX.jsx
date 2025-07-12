import React, { useState, useRef, useEffect } from "react";
import useWindowSize from "./useWindowSize";

const useBallX = () => {
  const [ballTravelDistance, setBallTravelDistance] = useState(0);
  const dottedLineRef = useRef(null);
  const windowSize = useWindowSize(); // Dynamic window resize hook

  useEffect(() => {
    if (dottedLineRef.current) {
      const { width } = dottedLineRef.current.getBoundingClientRect(); // Get the width of the dotted line ref
      setBallTravelDistance(width);
    }
  }, [windowSize.width]);

  return { ballTravelDistance, dottedLineRef };
};

export default useBallX;

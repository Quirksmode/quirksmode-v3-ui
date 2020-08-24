import { useRef, useEffect } from 'react';

/**
 * useIsMounting Hook
 *
 * @description
 * Can be used as a conditional to ensure something only runs once
 * when mounting for the first time
 *
 * @usage
 * const isMounting = useIsMounting();
 */
const useIsMounting = () => {
  const isMountingRef = useRef(true);
  useEffect(() => {
    isMountingRef.current = false;
  }, []);
  return isMountingRef.current;
};

export default useIsMounting;

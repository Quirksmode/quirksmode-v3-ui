import { useRef, useEffect } from 'react';

const useIsMounting = () => {
  const isMountingRef = useRef(true);
  useEffect(() => {
    isMountingRef.current = false;
  }, []);
  return isMountingRef.current;
};

export default useIsMounting;

import { useEffect, useState } from "react";

export const useDelayedLoading = (
  isLoading: boolean,
  delay: number = 300
): boolean => {
  const [delayedLoading, setDelayedLoading] =
    useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isLoading) {
      timer = setTimeout(() => {
        setDelayedLoading(true);
      }, delay);
    } else {
      setDelayedLoading(false);
    }

    return () => clearTimeout(timer);
  }, [isLoading, delay]);

  return delayedLoading;
};

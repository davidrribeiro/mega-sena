import { useEffect, useState } from "react";

export function useStateLocal<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const item = localStorage.getItem(key);
  const parsed = item ? (JSON.parse(item) as T) : initialValue;
  const [value, setValue] = useState<T>(parsed);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

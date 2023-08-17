import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      // Ovde biste mogli da obradite grešku
    }
  }, [key, state]);

  return [state, setState];
}

export { useLocalStorage };

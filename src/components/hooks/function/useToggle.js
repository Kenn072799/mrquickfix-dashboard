import { useState } from "react";

const useToggle = (initialState = false) => {
  const [isActive, setIsActive] = useState(initialState);

  const toggle = () => {
    setIsActive((prev) => !prev);
  };

  const close = () => {
    setIsActive(false);
  };

  return { isActive, toggle, close };
};

export default useToggle;

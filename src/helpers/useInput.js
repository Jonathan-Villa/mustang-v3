import { useState } from "react";

function useInput(initalState) {
  const [value, setValue] = useState(initalState);

  // Original State
  const handleInput = () => {
    setValue(initalState);
  };

  // bind user input
  const bind = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };

  // custom hook
  return [value, bind, handleInput];
}

export default useInput;

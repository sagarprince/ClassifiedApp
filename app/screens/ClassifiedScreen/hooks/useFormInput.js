// Core
import {useState} from 'react';

export function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(v) {
    setValue(v);
  }

  return {
    value,
    onChange: handleChange,
  };
}

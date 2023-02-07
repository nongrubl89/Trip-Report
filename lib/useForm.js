import { useState, useEffect } from 'react';

export default function useForm(initial = {}) {
  // create a state for our inputs in the forms
  // pass initial state in case someone passes initial state
  const [inputs, setInputs] = useState(initial);
  // console.log("inputs", inputs);
  const initialValues = Object.values(initial).join('');
  // console.log(initialValues);
  // console.log(initial);

  useEffect(() => {
    // This runs when things we are watching change
    setInputs(initial);
  }, [initialValues]);

  function handleChange(e) {
    let { name, value, type } = e.target;
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      [value] = e.target.files;
    }
    setInputs({
      // copy existing state
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // you must return something from a custom hook
  return { inputs, handleChange, resetForm, clearForm };
}

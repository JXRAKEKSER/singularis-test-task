import { useState } from 'react';

const useFormState = (formInputs) => {
    const [formState, setFormState] = useState(formInputs);
    const initialState = {};
    Object.keys(formInputs).forEach( key => {
      initialState[`${key}Edited`] = false;
    });
    const [inputsEditedState, setInputsEditedState] = useState(initialState);
  
    const handleChange = (evt) => {
      const { name, value } = evt.target;
      setFormState({...formState, [name]: value});
    };
    const handleBlur = (evt) => {
      const { name } = evt.target;
      setInputsEditedState({...inputsEditedState, [`${name}Edited`]: true});
    }
  
    return { formState, inputsEditedState, handleBlur, handleChange};
  }
  
  export { useFormState };
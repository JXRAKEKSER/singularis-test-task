import { useState, useEffect } from 'react'

/*const useValidate = (value, validations, isEdited) => {
  
  const initialState = {};
  Object.keys(validations).forEach( key => {
    initialState[`${key}Error`] = true;
  });

  const [validationValues, setValidationValues] = useState(initialState);

  useEffect(() => {
    
    for(const validation in validations) {
        switch(validation) {
          case 'isEmpty':
            value ? setValidationValues(prev => ({...prev, [`${validation}Error`]: false})) : setValidationValues(prev => ({...prev, [`${validation}Error`]: true}));
            break;
          case 'pattern':
              validations[validation].test(value) ?  setValidationValues(prev => ({...prev, [`${validation}Error`]: false})) : setValidationValues(prev => ({...prev, [`${validation}Error`]: true}));
              break;
          case 'maxLength':
              value.length !== validations[validation] ? setValidationValues(prev => ({...prev, [`${validation}Error`]: true})) : setValidationValues(prev => ({...prev, [`${validation}Error`]: false}));
              break;
          default: 

        }
      }
  }, [value]);
  
  const isInValidField = Object.values(validationValues).reduce( (prev, validationValue) => {
    return (prev || validationValue);
  }, false);
 // console.log(isInValidField, new Date())
  return {validationValues, isInValidField};
};

function useValidateGroup (validator, firstField, secondField, ...anotherFields) {
  
  const [validationValues, setValidationValues] = useState({});
  
   let values = Array.from(arguments).slice(1).map( argument => {
     return argument.value
   });
   values = values.filter( value => {
     return value !== undefined;
   });

   useEffect(() => {
    console.log(firstField, secondField);
    const updatedValidationValues =  validator(Array.from(arguments).slice(1));
    setValidationValues(prev => ({...prev, ...updatedValidationValues}));
   }, values);

   const isInValidGroup = Object.values(validationValues).reduce( (prev ,validationValue) => {
    return (prev || validationValue);
  }, false)

   return { validationValues, isInValidGroup };

}*/

const useValidate = (value, validations, isEdited) => {
  
  const validationValues = {};
  Object.keys(validations).forEach( key => {
    validationValues[`${key}Error`] = true;
  });

  //const [validationValues, setValidationValues] = useState(initialState);
  for(const validation in validations) {
    switch(validation) {
      case 'isEmpty':
        value ? validationValues[`${validation}Error`] = false : validationValues[`${validation}Error`] = true;
        break;
      case 'pattern':
          validations[validation].test(value) ?  validationValues[`${validation}Error`] = false : validationValues[`${validation}Error`] = true;
          break;
      case 'maxLength':
          value.length !== validations[validation] ? validationValues[`${validation}Error`] = true : validationValues[`${validation}Error`] = false;
          break;
      default: 

    }
  }
  
  const isInValidField = Object.values(validationValues).reduce( (prev, validationValue) => {
    return (prev || validationValue);
  }, false);
 console.log(validationValues, isInValidField)
  return {validationValues, isInValidField};
};

function useValidateGroup (validator, firstField, secondField, ...anotherFields) {
  const validationValues =  validator(Array.from(arguments).slice(1));
   const isInValidGroup = Object.values(validationValues).reduce( (prev ,validationValue) => {
    return (prev || validationValue);
  }, false);

   return { validationValues, isInValidGroup };

}

export { useValidate, useValidateGroup };

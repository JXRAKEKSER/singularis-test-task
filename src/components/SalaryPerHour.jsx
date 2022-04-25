import { useState } from 'react';

import Form from './Form';
import Input from './Input';
import DatePicker from './DatePicker';
import PairsWrapper from './PairsWrapper';
import UserInputWithValidation from './UserInputWithValidation';
import ValidationCaptions from './ValidationCaptions';
import ValidationGroup from './ValidationGroup';
import Button from './Button';
import Alert from './Alert';
import Lable from './Lable';

import { getPeriod } from '../utils/IsDayOffApi';
import { deleteSeparators } from '../utils/stringUtils';
import { useFormState } from '../hooks/formHooks'; 
import { useValidate, useValidateGroup } from '../hooks/inputHooks';
import { dateGroupValidator } from '../utils/validationUtils';

const calcSalaryPerHour = (period, hoursPerDay, totalSalary) => {
  const workDays = period.reduce((prev, current) => {
    return current === '0' ? ++prev : prev;
  }, 0);
  if(workDays === 0) {
    return '0';
  }
  return parseFloat((totalSalary)/(workDays*hoursPerDay)).toFixed(2);
};

const SalaryPerHour = () => {
  
  const { formState, inputsEditedState, handleBlur, handleChange } = useFormState({ monthSalary: '', hours: '8', startDate: '', endDate: ''});
  const [requestState, setRequestState] = useState({ isLoading: false, result: '', isSuccessed: false });
  const monthSalaryValidation = useValidate(formState.monthSalary, { pattern: /[1-9]\d{2}\d+/ });
  const hoursValidation = useValidate(formState.hours, { pattern: /^[8-9]$|1[0-9]$|2[0-4]$/ });
  const startDateValidation = useValidate(formState.startDate, { pattern: /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])/ });
  const endDateValidation = useValidate(formState.endDate, { pattern: /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])/ });
  const dateGroupValidation = useValidateGroup(dateGroupValidator,
    {
      value: formState.startDate,
      isInvalid: startDateValidation.validationValues.patternError
    },
    {
      value: formState.endDate,
      isInvalid: endDateValidation.validationValues.patternError,
    });
  const isInvalidForm = monthSalaryValidation.isInValidField 
  || hoursValidation.isInValidField || startDateValidation.isInValidField || endDateValidation.isInValidField || dateGroupValidation.isInValidGroup;
  const handleSubmit = (evt) => {
    setRequestState(prev => ({...prev, isLoading: true }));
    evt.preventDefault();
    
    getPeriod({ startDate: deleteSeparators(formState.startDate, '-'), endDate: deleteSeparators(formState.endDate, '-') })
    .finally(() => setRequestState(prev => ({...prev, isLoading: false })))
    .then( data => {
      
      const periodToArray = data.split('');
      const salaryPerHourResult = calcSalaryPerHour(periodToArray, Number(formState.hours), Number(formState.monthSalary));
      setRequestState(prev => ({...prev, result: salaryPerHourResult, isSuccessed: true }));
    })
    .catch( error => {
      let message = null;
      const { serviceCode } = error;
      switch (serviceCode) {
        case '100': message = 'Ошибка в дате';
          break;
        case '101': message = 'Данные не найдены';
          break;
        case '199': message = 'Ошибка сервиса';
          break;
        default: message = 'Страшно, очень страшно, мы не знаем, что это такое!';
          break;
      }
      setRequestState(prev => ({...prev, result: message }));
    });
  }
  
  return(
    <div className='salary-per-hour'>
      <Form styleModifier='salary-calc-form' handleSubmit={handleSubmit}>
        <UserInputWithValidation
         userInputComponent={Input}
         captionValidationComponent={ValidationCaptions}
         userInputProps={{
           handleBlur,
           handleChange,
           name: 'monthSalary',
           value: formState.monthSalary,
           placeholder: 'Сумма за период',
           isInvalid: monthSalaryValidation.isInValidField && inputsEditedState.monthSalaryEdited,
           styleModifier: 'salary-calc-form__input',
           errorModifier: 'salary-calc-form__input_type_error',
          }}
         captionValidationProps={{
           captions: [{ validationValue: monthSalaryValidation.validationValues.patternError, text: 'Минимальная величина 1000' },],
           isEdited: inputsEditedState.monthSalaryEdited,
         }} 
         styleModifier='salary-calc-form__user-with-validation'/>
         <UserInputWithValidation
          userInputComponent={Input}
          captionValidationComponent={ValidationCaptions}
          userInputProps={{
            handleBlur,
            handleChange,
            name: 'hours',
            value: formState.hours,
            placeholder: 'Количество часов в день',
            isInvalid: hoursValidation.isInValidField && inputsEditedState.hoursEdited,
            styleModifier: 'salary-calc-form__input',
            errorModifier: 'salary-calc-form__input_type_error',
          }}
          captionValidationProps={{
            captions: [{ validationValue: hoursValidation.validationValues.patternError, text: 'Диапазон 8-24 часа' },],
            isEdited: inputsEditedState.hoursEdited
          }}
          styleModifier='salary-calc-form__user-with-validation' />
        <ValidationGroup 
         inputComponents={
           [
             {
               component: PairsWrapper,
               componentProps: {
                 firstComponent: Lable,
                 secondComponent: UserInputWithValidation,
                 firstComponentProps: {
                   text: 'От:',
                   styleModifier: 'salary-calc-form__lable'
                 },
                 secondComponentProps: {
                   userInputComponent: DatePicker,
                   captionValidationComponent: ValidationCaptions,
                   userInputProps: {
                     handleBlur,
                     handleChange,
                     name: 'startDate',
                     isInvalid: startDateValidation.isInValidField && inputsEditedState.startDateEdited,
                     styleModifier: 'salary-calc-form__date-picker',
                     errorModifier: 'salary-calc-form__date-picker_type_error'},
                   captionValidationProps: {
                     captions: [{ validationValue: startDateValidation.validationValues.patternError, text: 'Дата должна соответсвовать форамту yyyy-mm-dd'},],
                     isEdited: inputsEditedState.startDateEdited,
                    }
                  },
                  wrapperStyleModifier: 'validation-group__item'
                },
            },
            {
              component: PairsWrapper,
              componentProps: {
                firstComponent: Lable,
                secondComponent: UserInputWithValidation,
                firstComponentProps: {
                  text: 'До:',
                  styleModifier: 'salary-calc-form__lable'
                },
                secondComponentProps: {
                  userInputComponent: DatePicker,
                  captionValidationComponent: ValidationCaptions,
                  userInputProps: {
                    handleBlur,
                    handleChange, name: 'endDate',
                    isInvalid: endDateValidation.isInValidField && inputsEditedState.endDateEdited,
                    styleModifier: 'salary-calc-form__date-picker',
                    errorModifier: 'salary-calc-form__date-picker_type_error',
                  },
                  captionValidationProps: {
                    captions: [{ validationValue: endDateValidation.validationValues.patternError, text: 'Дата должна соответсвовать форамту yyyy-mm-dd'},],
                    isEdited: inputsEditedState.endDateEdited,
                   }
                 },
                 wrapperStyleModifier: 'validation-group__item'
               }
           },
          ]}
            groupCaptionComponent={ValidationCaptions}
            groupCaptionProps={{
              captions: [{validationValue: dateGroupValidation.validationValues.intervalError, text: 'Дата начала периода должна быть раньше даты конца'},{validationValue: dateGroupValidation.validationValues.maxDurationError, text: 'Максимальный интервал 1 год'} ],
              isEdited: inputsEditedState.startDateEdited && inputsEditedState.endDateEdited,
            }}
            isInvalidGroup={dateGroupValidation.isInValidGroup}
            styleModifier='salary-calc-form__validation-group' />
        <Button 
         type='submit'
         text='Рассчитать'
         disabled={isInvalidForm}
         isLoading={requestState.isLoading}
         styleModifier='salary-calc-form__submit-button' />
      </Form>
     { requestState.isSuccessed ?  <p className='salary-per-hour__result'>Зарплата {requestState.result} в час</p> : requestState.result && <Alert message={requestState.result} type='error' styleModifier='salary-per-hour__alert'/>}
    </div>
  )
};

export default SalaryPerHour;
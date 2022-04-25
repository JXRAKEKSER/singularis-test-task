
const DatePicker = ({ handleChange, handleBlur, name, styleModifier, errorModifier, isInvalid }) => {
  return(
    <>
      <input className={`${styleModifier ? styleModifier : ''} ${isInvalid ? errorModifier : ''}`} type={'date'} onChange={handleChange} onBlur={handleBlur} name={name}/>
    </>
  )
};

export default DatePicker;
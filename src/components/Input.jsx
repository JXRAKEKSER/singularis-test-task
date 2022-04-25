
const Input = ({
  name,
  handleChange,
  handleBlur, 
  minLength,
  value,
  placeholder,
  isInvalid,
  styleModifier,
  errorModifier,
  lable,
}) => {
  return(
    <input className={`${styleModifier ? styleModifier : ''} ${isInvalid ? errorModifier : ''}`}
    type={'text'}
    onChange={handleChange}
    onBlur={handleBlur}
    minLength={minLength}
    name={name}
    value={value}
    placeholder={placeholder}/>
  );
};

export default Input;

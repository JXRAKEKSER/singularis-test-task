
const Form = ({ children, handleSubmit, styleModifier }) => {
  return(
    <form className={`${styleModifier}`} onSubmit={handleSubmit}>
        { children }
    </form>
  )
};

export default Form;
import { LoadingOutlined } from '@ant-design/icons';

const Button = ({ type, text, disabled, isLoading, styleModifier }) => {
  return (
    <>
    { isLoading ? <LoadingOutlined spin={true}/> : <button type={type} className={styleModifier} disabled={disabled}>{text}</button> }
    </>
  )
}

export default Button;

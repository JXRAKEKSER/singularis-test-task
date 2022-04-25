import { WarningFilled, StopFilled, CheckCircleFilled } from '@ant-design/icons';

const Alert = ({ message, type, size, styleModifier }) => {
  let alertClassName = null;
  let alertIcon = null;

  switch(type) {
    case 'error':
        alertClassName = 'alert alert_type_error alert_size_medium';
        alertIcon = <StopFilled style={{ color: '#e82f13', margin: '0 10px 0 0', fontSize: '16px' }} />;
        break;
    case 'success':
        alertClassName = 'alert alert_type_success alert_size_medium';
        alertIcon = <CheckCircleFilled style={{ color: '#1ae813', margin: '0 10px 0 0', fontSize: '16px' }}/>;
      break;
    case 'warning':
        alertClassName = 'alert alert_type_warning alert_size_medium';
        alertIcon = <WarningFilled style={{ color: '#eef112', margin: '0 10px 0 0', fontSize: '16px' }}/>;
        break;
    default:
        alertClassName = 'alert_size_medium';
        alertIcon = <></>;
      break;
  }
  return (
    <div className={`${alertClassName} ${styleModifier ? styleModifier : ''}`}>
        {alertIcon}
        <p className='alert__message'>{message}</p>
    </div>
  )
};

export default Alert;
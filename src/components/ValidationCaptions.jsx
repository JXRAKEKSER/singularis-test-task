import { CloseOutlined } from '@ant-design/icons';

const ValidationCaptions = ({ captions, isEdited }) => {
  return( isEdited && (
    <div className='validation-captions'>
      {captions.map( caption => {
        return caption.validationValue && <div className='validation-caption validations-captions__validations-caption'>
            <CloseOutlined style={{color: '#e82f13', margin: '0 3px 0 0'}} />
            <p className='validation-caption__text'>{caption.text}</p>
          </div>
      })}
    </div>)
  )
};

export default ValidationCaptions;

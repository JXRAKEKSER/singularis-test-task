

const ValidationGroup = ({
    inputComponents,
    groupCaptionComponent: GroupCaptionComponent,
    groupCaptionProps,
    isInvalidGroup,
    styleModifier,
}) => {
    
  return(
      <div className={`validation-group ${styleModifier ? styleModifier : ''}${isInvalidGroup ? ' validation-group_invalid' : ''}`}>
          {inputComponents.map( ({ component: Component, componentProps}) => {
            return <Component {...componentProps} />
          })}
        {isInvalidGroup && <GroupCaptionComponent {...groupCaptionProps} /> }
      </div>
  )
};

export default ValidationGroup;
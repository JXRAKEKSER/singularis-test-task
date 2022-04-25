
const PairsWrapper = ({
  firstComponent: FirstComponent,
  secondComponent: SecondComponent,
  firstComponentProps,
  secondComponentProps,
  wrapperStyleModifier,
}) => {
  return (
    <div className={wrapperStyleModifier}>
      <FirstComponent {...firstComponentProps} />
      <SecondComponent {...secondComponentProps} />
    </div>
  )
};

export default PairsWrapper;


const UserInputWithValidation = ({
    userInputComponent: UserInputComponent,
    captionValidationComponent: CaptionValidationComponent,
    userInputProps,
    captionValidationProps,
    styleModifier,
  }) => {
  return(
    <div className={`user-input-with-validation ${styleModifier}`}>
      {UserInputComponent && <UserInputComponent {...userInputProps} />}
      {CaptionValidationComponent && <CaptionValidationComponent {...captionValidationProps} />}
    </div>
  )
}

export default UserInputWithValidation;
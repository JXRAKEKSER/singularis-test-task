
const dateGroupValidator = (fields) => {
  const [startDate, endDate] = fields;
  
  const validationValues = {};
  if (startDate.isInvalid || endDate.isInvalid){
    validationValues.intervalError = false;
    validationValues.maxDurationError = false;
  } else {
    
    validationValues.intervalError = new Date(`${startDate.value}T10:00:00`) > new Date(`${endDate.value}T10:00:00`);
    const yearDiffer = Math.ceil(Math.abs(new Date(`${startDate.value}T10:00:00`).getTime() - new Date(`${endDate.value}T10:00:00`).getTime()) / (1000*3600*24));
    validationValues.maxDurationError = yearDiffer > 365;
  }
  return validationValues;
};

export { dateGroupValidator };

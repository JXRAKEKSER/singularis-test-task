const checkResponse = (response) => {
  return response.text()
  .then(data => {
    if (response.ok) {
      console.log('response', data);
      return data;
    }
    return Promise.reject({ status: response.status, serviceCode: data });
  })
}

const getPeriod = ({startDate, endDate}) => {
  return fetch(`https://isdayoff.ru/api/getdata?date1=${startDate}&date2=${endDate}`)
  .then(checkResponse);
}

export { getPeriod };

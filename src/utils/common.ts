export function formatDate(date: string) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
export const buildUrl = (url: string, params: any) => {
  let urlWithParams = url;
  let itIsFirst = true;
  Object.entries(params).forEach(([key, value], index) => {
    if (value === '') return;

    const sign = itIsFirst ? '?' : '&';
    itIsFirst = false;
    if (Array.isArray(value)) {
      if (value[0] !== value[1]) {
        urlWithParams += `${sign}${key}=${value[0]}-${value[1]}`;
      } else {
        urlWithParams += `${sign}${key}=${value[0]}`;
      }
    } else {
      urlWithParams += `${sign}${key}=${value}`;
    }
  });

  return urlWithParams;
};

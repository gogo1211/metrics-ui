import moment from 'moment';

export function displayDatetime(datetime) {
  return moment(datetime).format('MM/DD/YYYY HH:mm:ss');
  // return new Date(datetime).toLocaleString('en-US', {
  //   month: '2-digit',
  //   day: '2-digit',
  //   year: 'numeric',
  //   hour: '2-digit',
  //   minute: '2-digit',
  //   second: '2-digit',
  //   hour12: false
  // });
}

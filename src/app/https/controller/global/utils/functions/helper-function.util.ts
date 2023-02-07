export function mapWithObject(results: any) {
  return results.map((v: any) => Object.assign({}, v));
}

export function formatDate(date: Date) {
  let hours = date.getHours();
  let minutes = date.getMinutes().toString();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = parseInt(minutes) < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime;
}

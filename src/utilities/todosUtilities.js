export function normalizeDateTimeInput(dateTimeInput){
  let date = new Date(dateTimeInput);
  let offset = date.getTimezoneOffset();
  let normalizedUnixTime = new Date(date.getTime() + 1000*60*offset).getTime();
  return normalizedUnixTime;
}
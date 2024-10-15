/**
 * Convert '22/04/2023' to ISO date format: '2023-04-22'
 */
module.exports.convertToISO = (dateString) => {
  if (!dateString) { return ''; }
  let [day, month, year] = dateString.split('/');
  day = day?.trim();
  month = month?.trim();
  year = year?.trim();
  const isoDate = `${year}-${month}-${day}`;
  return isoDate;
};

module.exports.convertToISO = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const isoDate = `${year}-${month}-${day}`;
  return isoDate;
};

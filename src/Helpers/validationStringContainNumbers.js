const validationStringContainNumbers = (value = '') => {
  const regex = /^[0-9]*$/;
  return regex.test(value);
};
module.exports = validationStringContainNumbers;

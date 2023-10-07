/**
 * Validade if the email follows the following rules:
 * - It must have an @ symbol;
 * - It must have a . symbol;
 * - It must have at least 4 characters.
 */
const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  return emailRegex.test(email);
};

export default isEmailValid;

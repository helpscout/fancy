/**
 * Determines the amount of occurances of a sub-string is within a string.
 *
 * @param   {string} string
 * @param   {regex} regex
 * @returns {number}
 */
export const checkOccurance = (string, regex) => {
  const match = string.match(new RegExp(regex, 'gi'))
  return match ? match.length : 0
}

/**
 * Determines if string contains multiple sub-strings.
 *
 * @param   {string} string
 * @param   {regex} regex
 * @returns {bool}
 */
export const hasMany = (string, regex) => checkOccurance(string, regex) > 1

/**
 * Determines if string contains at least one occurance of sub-string.
 *
 * @param   {string} string
 * @param   {regex} regex
 * @returns {bool}
 */
export const has = (string, regex) => checkOccurance(string, regex) > 0

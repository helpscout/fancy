/**
 * Generates a (very) short UUID.
 *
 * @returns {string}
 */
export const shortUUID = () =>
  Math.random()
    .toString(36)
    .substring(2, 9)

/**
 * Generates a (short) UUID.
 *
 * @returns {string}
 */
export const uuid = () => shortUUID()

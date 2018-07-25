// @flow
/**
 * Returns a computed CSS style prop from an HTML element.
 * @param {HTMLElement} node
 * @param {string} prop
 * @returns {string}
 */
export const getStyleProp = (node: HTMLElement, prop: string = 'display') =>
  window.getComputedStyle(node)[prop]

/**
 * Resets the <head> tag to remove stray <style> tags.
 */
export const resetStyleTags = () => {
  if (global.__SECRET_FANCY_EMOTION__) {
    global.__SECRET_FANCY_EMOTION__.flush()
  } else {
    global.document.head.innerHTML = ''
  }
}

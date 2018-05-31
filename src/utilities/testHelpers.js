// @flow
/**
 * Returns a computed CSS style prop from an HTML element.
 * @param {HTMLElement} node
 * @param {string} prop
 * @returns {string}
 */
export const styleProp = (node: HTMLElement, prop: string) =>
  window.getComputedStyle(node)[prop]

/**
 * Resets the <head> tag to remove stray <style> tags.
 */
export const resetStyleTags = () => {
  global.document.head.innerHTML = ''
}

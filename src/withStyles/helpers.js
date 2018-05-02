export const ID = '__REACT_REACTOR_STYLES__'

/**
 * Creates the <style> tag, and adds it to the <head>.
 *
 * @returns {NodeElement} <style>
 */
export const makeStyleTag = () => {
  const tag = document.createElement('style')
  tag.id = ID
  tag.type = 'text/css'

  const head = document.getElementsByTagName('head')[0]
  /* istanbul ignore else */
  if (head) head.append(tag)

  return tag
}

/**
 * Retrieves the withStyle <style> tag.
 *
 * @returns {NodeElement} <style>
 */
export const getStyleTag = () => {
  const tag = document.getElementById(ID)
  return tag || makeStyleTag()
}

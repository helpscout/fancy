import { ID } from '../constants/id'
import { getClosestDocument } from '../utilities/components'

/**
 * Creates the <style> tag, and adds it to the <head>.
 *
 * @returns {NodeElement} <style>
 */
export const makeStyleTag = (documentTarget) => {
  const documentNode = documentTarget || document
  const tag = documentNode.createElement('style')
  tag.id = ID
  tag.type = 'text/css'

  const head = documentNode.getElementsByTagName('head')[0]
  /* istanbul ignore else */
  if (head) head.appendChild(tag)

  return tag
}

/**
 * Retrieves the withStyle <style> tag.
 *
 * @param   {object} React.Component
 * @returns {NodeElement} <style>
 */
export const getStyleTag = (Component) => {
  /* istanbul ignore next */
  const documentNode = Component
    ? getClosestDocument(Component)
    : document

  const tag = documentNode.getElementById(ID)
  return tag || makeStyleTag(documentNode)
}

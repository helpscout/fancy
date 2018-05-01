import { ID } from './index'
import { uuid } from '../utilities/id'

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

/**
 * Renders the CSSRule with tokenized with the unique ID.
 *
 * @param   {string} id
 * @param   {string} CSSRules
 * @returns {string}
 */
export const tokenize = (id, CSSRules) => `/* ${id} */\n${CSSRules.trim()}\n`

/**
 * Generates the styleProps with uniqueID for withStyles to consume.
 *
 * @param   {string} CSSRules
 * @returns {object}
 */
export const makeCSS = (CSSRules) => ({ id: uuid(), CSSRules })

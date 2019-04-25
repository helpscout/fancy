// @flow
import isPropValid from '@helpscout/react-utils/dist/isPropValid'
import type { Interpolations } from 'create-emotion'

export const themeChannel = '__EMOTION_THEMING__'

export const getDisplayName = Component =>
  Component.displayLabel || Component.displayName || Component.name

export const createDataCy = (props, Component) => {
  if (props['data-cy-styled']) {
    return props['data-cy-styled']
  }

  return getDisplayName(Component)
}

export const createHashedDisplayClassName = (className, Component) => {
  const displayName =
    typeof Component === 'string' ? Component : getDisplayName(Component)

  if (!displayName) {
    return ''
  } else {
    return ` ${className}-${displayName}`
  }
}

/**
 * Sets the Frame (document) supplied by the FrameProvider
 * @param {*} frame
 */
export function setFrame(frame: Object) {
  this.setState({ frame })
}

export function setTheme(theme: Object) {
  this.setState({ theme })
}

export const testPickPropsOnStringTag = isPropValid

export const testPickPropsOnComponent = (key: string) =>
  key !== 'theme' && key !== 'innerRef'
export const testAlwaysTrue = () => true

export const pickAssign: (
  testFn: (key: string) => boolean,
  target: {},
  ...sources: Array<{}>
) => Object = function(testFn, target) {
  let i = 2
  let length = arguments.length
  for (; i < length; i++) {
    let source = arguments[i]
    let key
    for (key in source) {
      /* istanbul ignore else */
      if (testFn(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

export type StyledOptions = {
  e?: string,
  label?: string,
  target?: string,
  shouldForwardProp?: (?string) => boolean,
}

type CreateStyledComponent = (...args: Interpolations) => *

type BaseCreateStyled = (
  tag: any,
  options?: StyledOptions,
) => CreateStyledComponent

export type CreateStyled = {
  // $FlowFixMe
  $call: BaseCreateStyled,
  [key: string]: CreateStyledComponent,
}

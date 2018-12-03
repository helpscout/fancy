// @flow
import React from 'react'
import * as emotion from '../emotion/index'
import createEmotionStyled from '../create-emotion-styled'

/**
 * A custom HOC that wraps the default createEmotionStyled to allow
 * for options, being passed through a custom argument.
 */

export default function createStyled(options) {
  return createEmotionStyled(emotion, React, options)
}

// Source:
// https://github.com/donavon/render-fragment/blob/master/src/index.jsx

import React from 'react'

const [reactMajorVersion] = React.version.split('.')
const canReturnArray = parseInt(reactMajorVersion, 10) >= 16

const FragmentPolyfill = ({ children, as: Wrapper, ...others }) =>
  Wrapper ? (
    <Wrapper {...others}>{children}</Wrapper>
  ) : (
    /* istanbul ignore next */
    React.Children.toArray(children)
  )

FragmentPolyfill.defaultProps = {
  as: canReturnArray
    ? /* istanbul ignore next */
      undefined
    : 'div',
}

const Fragment = React.Fragment
  ? /* istanbul ignore next */
    React.Fragment
  : FragmentPolyfill

export default Fragment

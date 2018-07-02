// @flow
import PropTypes from 'prop-types'
import type { ElementType } from 'react'
import typeof ReactType from 'react'
import type { CreateStyled, StyledOptions } from './utils'
import {
  themeChannel as channel,
  testPickPropsOnComponent,
  testAlwaysTrue,
  testPickPropsOnStringTag,
  pickAssign,
  setTheme,
  setFrame,
} from './utils'
import FrameManager from './FrameManager'
import { getDocumentFromReactComponent } from '../utils'
import { channel as frameChannel } from '../FrameProvider'
import { channel as scopeChannel } from '../ScopeProvider'

const contextTypes = {
  [channel]: PropTypes.object,
  [frameChannel]: PropTypes.object,
  [scopeChannel]: PropTypes.object,
}

function createEmotionStyled(emotion: Object, view: ReactType) {
  let createStyled: CreateStyled = (tag, options) => {
    if (process.env.NODE_ENV !== 'production') {
      if (tag === undefined) {
        throw new Error(
          'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
        )
      }
    }
    let staticClassName
    let identifierName
    let stableClassName
    let shouldForwardProp
    if (options !== undefined) {
      staticClassName = options.e
      identifierName = options.label
      stableClassName = options.target
      shouldForwardProp =
        tag.__emotion_forwardProp && options.shouldForwardProp
          ? propName =>
              tag.__emotion_forwardProp(propName) &&
              // $FlowFixMe
              options.shouldForwardProp(propName)
          : options.shouldForwardProp
    }
    const isReal = tag.__emotion_real === tag
    const baseTag =
      staticClassName === undefined
        ? (isReal && tag.__emotion_base) || tag
        : tag

    if (typeof shouldForwardProp !== 'function') {
      shouldForwardProp =
        typeof baseTag === 'string' &&
        baseTag.charAt(0) === baseTag.charAt(0).toLowerCase()
          ? testPickPropsOnStringTag
          : testPickPropsOnComponent
    }

    return function() {
      let args = arguments
      let styles =
        isReal && tag.__emotion_styles !== undefined
          ? tag.__emotion_styles.slice(0)
          : []
      if (identifierName !== undefined) {
        styles.push(`label:${identifierName};`)
      }
      if (staticClassName === undefined) {
        if (args[0] == null || args[0].raw === undefined) {
          styles.push.apply(styles, args)
        } else {
          styles.push(args[0][0])
          let len = args.length
          let i = 1
          for (; i < len; i++) {
            styles.push(args[i], args[0][i])
          }
        }
      }

      class Styled extends view.Component<*, { theme: Object }> {
        unsubscribe: number
        mergedProps: Object
        static toString: () => string
        static __emotion_real: any
        static __emotion_styles: any
        static __emotion_base: Styled
        static __emotion_target: string
        static __emotion_forwardProp: void | (string => boolean)
        static withComponent: (ElementType, options?: StyledOptions) => any
        state = {}
        // Custom instance properties
        emotion = emotion
        __hasSetEmotion = false

        componentWillMount() {
          if (this.context[channel] !== undefined) {
            this.unsubscribe = this.context[channel].subscribe(
              setTheme.bind(this)
            )
          }
          /**
           * Extra channel for the Frame
           */
          if (this.context[frameChannel] !== undefined) {
            this.unsubscribe = this.context[frameChannel].subscribe(
              setFrame.bind(this)
            )
          }
        }
        componentWillUnmount() {
          if (this.unsubscribe !== undefined) {
            this.context[channel].unsubscribe(this.unsubscribe)
          }
          /**
           * Extra channel for the Frame
           */
          if (this.unsubscribe !== undefined) {
            this.context[frameChannel].unsubscribe(this.unsubscribe)
          }
        }
        /**
         * Ensures that styled components that appear in iFrames,
         * determined by the FrameProvider, have their styles injected
         * into the iFrame.
         *
         * This is done by instantiating a new Emotion instance, with a
         * custom container.
         */
        setEmotion() {
          const frame = this.state.frame

          if (!frame) return
          if (this.__hasSetEmotion) return

          this.emotion = FrameManager.getEmotion(frame)
          this.__hasSetEmotion = true
        }
        /**
         * Retrieves the appropriate document, with an attempt to retrieve
         * it from emotion (potentially set by the FrameProvider), falling
         * back to window.document.
         *
         * @return {document}
         */
        getDocument() {
          return this.state.frame || getDocumentFromReactComponent(this)
        }
        /**
         * Retrieves the scope selector, either from a ScopeProvider, or
         * from props.
         */
        getScope() {
          if (this.props.scope) return this.props.scope
          if (this.context[scopeChannel]) {
            return this.context[scopeChannel].scope
          } else {
            return ''
          }
        }
        render() {
          const { props, state } = this
          this.mergedProps = pickAssign(testAlwaysTrue, {}, props, {
            theme: (state !== null && state.theme) || props.theme || {},
          })

          let className = ''
          let classInterpolations = []
          this.setEmotion()

          if (props.className) {
            if (staticClassName === undefined) {
              className += this.emotion.getRegisteredStyles(
                classInterpolations,
                props.className
              )
            } else {
              className += `${props.className} `
            }
          }
          if (staticClassName === undefined) {
            className += this.emotion
              /* Replaces emotion.css, with enhanced emotion.cssWithScope */
              .cssWithScope(this.getScope())
              .apply(this, styles.concat(classInterpolations))
          } else {
            className += staticClassName
          }

          if (stableClassName !== undefined) {
            className += ` ${stableClassName}`
          }

          return view.createElement(
            baseTag,
            // $FlowFixMe
            pickAssign(shouldForwardProp, {}, props, {
              className,
              ref: props.innerRef,
            })
          )
        }
      }
      Styled.displayName =
        identifierName !== undefined
          ? identifierName
          : `Styled(${
              typeof baseTag === 'string'
                ? baseTag
                : baseTag.displayName || baseTag.name || 'Component'
            })`

      if (tag.defaultProps !== undefined) {
        // $FlowFixMe
        Styled.defaultProps = tag.defaultProps
      }
      Styled.contextTypes = contextTypes
      Styled.__emotion_styles = styles
      Styled.__emotion_base = baseTag
      Styled.__emotion_real = Styled
      Styled.__emotion_forwardProp = shouldForwardProp
      Object.defineProperty(Styled, 'toString', {
        enumerable: false,
        value() {
          if (
            process.env.NODE_ENV !== 'production' &&
            stableClassName === undefined
          ) {
            return 'NO_COMPONENT_SELECTOR'
          }
          // $FlowFixMe
          return `.${stableClassName}`
        },
      })

      Styled.withComponent = (
        nextTag: ElementType,
        nextOptions?: StyledOptions
      ) => {
        return createStyled(
          nextTag,
          nextOptions !== undefined
            ? // $FlowFixMe
              pickAssign(testAlwaysTrue, {}, options, nextOptions)
            : options
        )(...styles)
      }

      return Styled
    }
  }
  if (process.env.NODE_ENV !== 'production' && typeof Proxy !== 'undefined') {
    createStyled = new Proxy(createStyled, {
      get(target, property) {
        switch (property) {
          // react-hot-loader tries to access this stuff
          case '__proto__':
          case 'name':
          case 'prototype':
          case 'displayName': {
            return target[property]
          }
          default: {
            throw new Error(
              `You're trying to use the styled shorthand without babel-plugin-this.` +
                `\nPlease install and setup babel-plugin-emotion or use the function call syntax(\`styled('${property}')\` instead of \`styled.${property}\`)`
            )
          }
        }
      },
    })
  }
  return createStyled
}

export default createEmotionStyled

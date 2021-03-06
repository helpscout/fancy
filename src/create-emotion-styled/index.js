// @flow
import type { ElementType } from 'react'
import typeof ReactType from 'react'
import type { CreateStyled, StyledOptions } from './utils'
import hoistNonReactStatics from '@helpscout/react-utils/dist/hoistNonReactStatics'
import {
  createDataCy,
  createHashedDisplayClassName,
  themeChannel as channel,
  testPickPropsOnComponent,
  testAlwaysTrue,
  testPickPropsOnStringTag,
  pickAssign,
  setTheme,
  setFrame,
} from './utils'
import FrameManager from './FrameManager'
import { channel as frameChannel } from '../FrameProvider'
import { channel as scopeChannel } from '../ScopeProvider'

const contextTypes = {
  [channel]: () => undefined,
  [frameChannel]: () => undefined,
  [scopeChannel]: () => undefined,
}

const defaultProps = {
  pure: true,
}

const defaultOptions = {
  extraArguments: {},
  pure: true,
}

function createEmotionStyled(
  emotion: Object,
  view: ReactType,
  options: Object = defaultOptions,
) {
  // This allows for the user to create their own styled() function with
  // built-in extras.
  // This is a custom Fancy addition. The idea was inspired by Styletron and
  // isn't part of Emotion.
  // https://baseweb.design/getting-started/installation/#styletron
  const { pure: createPure, extraArguments } = { ...defaultOptions, ...options }

  let createStyled: CreateStyled = (tag, options) => {
    // Custom Fancy, non-Emotion default props/options
    const { pure: optionsPure } = { ...defaultProps, ...options }
    const pure = createPure || optionsPure

    if (process.env.NODE_ENV !== 'production') {
      if (tag === undefined) {
        throw new Error(
          'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.',
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

      const displayName =
        typeof baseTag === 'string'
          ? baseTag
          : baseTag.displayName || baseTag.name || 'Component'

      const OuterBaseComponent = pure ? view.PureComponent : view.Component

      class Styled extends OuterBaseComponent<*, { theme: Object }> {
        unsubscribe: number
        unsubscribeFrame: number
        mergedProps: Object
        static toString: () => string
        static __emotion_real: any
        static __emotion_styles: any
        static __emotion_base: Styled
        static __emotion_target: string
        static __emotion_forwardProp: void | (string => boolean)
        static withComponent: (ElementType, options?: StyledOptions) => any
        // $FlowFixMe
        state = {}
        // Custom instance properties
        emotion = emotion
        __hasSetEmotion = false

        componentWillMount() {
          if (this.context[channel] !== undefined) {
            this.unsubscribe = this.context[channel].subscribe(
              setTheme.bind(this),
            )
          }
          /**
           * Extra channel for the Frame
           */
          if (this.context[frameChannel] !== undefined) {
            this.unsubscribeFrame = this.context[frameChannel].subscribe(
              setFrame.bind(this),
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
          if (this.unsubscribeFrame !== undefined) {
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
          // $FlowFixMe
          const frame = this.state.frame

          if (!frame) return
          if (this.__hasSetEmotion) return

          const nextEmotion = FrameManager.getEmotion(frame, this.emotion)

          if (!nextEmotion || this.emotion === nextEmotion) return

          this.emotion = nextEmotion
          this.__hasSetEmotion = true
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
          this.mergedProps = pickAssign(
            testAlwaysTrue,
            {},
            props,
            extraArguments,
            {
              theme: props.theme || (state !== null && state.theme) || {},
            },
          )

          let className = ''
          let classInterpolations = []
          let hashedClassName
          let hashedDisplayClassName
          this.setEmotion()

          if (props.className) {
            if (staticClassName === undefined) {
              hashedClassName = this.emotion.getRegisteredStyles(
                classInterpolations,
                props.className,
              )
              className += hashedClassName
            } else {
              className += `${props.className} `
            }
          }
          if (staticClassName === undefined) {
            /* Replaces emotion.css, with enhanced emotion.cssWithScope */
            if (
              this.emotion.hasOwnProperty('cssWithScope') &&
              typeof this.emotion.cssWithScope === 'function'
            ) {
              hashedClassName = this.emotion
                .cssWithScope(this.getScope())
                .apply(this, styles.concat(classInterpolations))

              hashedDisplayClassName = createHashedDisplayClassName(
                hashedClassName,
                baseTag,
              )

              className += hashedClassName
              className += hashedDisplayClassName
            } else {
              hashedClassName = this.emotion.css.apply(
                this,
                styles.concat(classInterpolations),
              )
              hashedDisplayClassName = createHashedDisplayClassName(
                hashedClassName,
                baseTag,
              )
              className += hashedClassName
              className += hashedDisplayClassName
            }
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
              'data-cy-styled': createDataCy(props, baseTag),
              ref: props.innerRef,
            }),
          )
        }
      }
      Styled.displayName =
        identifierName !== undefined ? identifierName : `Styled(${displayName})`

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
        nextOptions?: StyledOptions,
      ) => {
        return createStyled(
          nextTag,
          nextOptions !== undefined
            ? // $FlowFixMe
              pickAssign(testAlwaysTrue, {}, options, nextOptions)
            : options,
        )(...styles)
      }

      return hoistNonReactStatics(Styled, baseTag)
    }
  }
  if (process.env.NODE_ENV !== 'production' && typeof Proxy !== 'undefined') {
    createStyled = new Proxy(createStyled, {
      get(target, property) {
        switch (property) {
          // Extras
          case '$$':
          case '$':
          case '__':
          case '_':
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
                `\nPlease install and setup babel-plugin-emotion or use the function call syntax(\`styled('${property}')\` instead of \`styled.${property}\`)`,
            )
          }
        }
      },
    })
  }
  return createStyled
}

export default createEmotionStyled

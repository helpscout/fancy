import React from 'react'
import { mount } from 'enzyme'
import createStyled from '../index'
import { getStyleProp, resetStyleTags } from '../../utils/testHelpers'

afterEach(() => {
  resetStyleTags()
})

test('Creates a React.PureComponent instance, by default', () => {
  const Comp = createStyled()('div')``
  const wrapper = mount(<Comp />)
  const el = wrapper.getNodes()[0]

  expect(el instanceof React.PureComponent).toBe(true)
})

test('Can create a React.Component instance, if defined', () => {
  const Comp = createStyled({ pure: false })('div')``
  const wrapper = mount(<Comp />)
  const el = wrapper.getNodes()[0]

  expect(el instanceof React.Component).toBe(true)
})

test('Can create a React.PureComponent instance, if defined', () => {
  const Comp = createStyled({ pure: true })('div')``
  const wrapper = mount(<Comp />)
  const el = wrapper.getNodes()[0]

  expect(el instanceof React.PureComponent).toBe(true)
})

test('Can create styled with extra arguments', () => {
  const extraArguments = {
    $color: 'red',
    $theme: {
      colors: {
        primary: 'blue',
      },
    },
  }
  const Comp = createStyled({ extraArguments })('div')(
    ({ $color, $theme }) => `
    background: ${$theme.colors.primary};
    color: ${$color};
  `,
  )
  const wrapper = mount(<Comp />)
  const el = wrapper.find('div').getNode()

  expect(getStyleProp(el, 'color')).toBe('red')
  expect(getStyleProp(el, 'background')).toBe('blue')
})

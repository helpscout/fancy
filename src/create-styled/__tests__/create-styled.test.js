import React from 'react'
import {mount} from 'enzyme'
import createStyled from '../index'

test('Creates a React.PureComponent instance, by default', () => {
  const Comp = createStyled()('div')``
  const wrapper = mount(<Comp />)
  const el = wrapper.getNodes()[0]

  expect(el instanceof React.PureComponent).toBe(true)
})

test('Can create a React.Component instance, if defined', () => {
  const Comp = createStyled({pure: false})('div')``
  const wrapper = mount(<Comp />)
  const el = wrapper.getNodes()[0]

  expect(el instanceof React.Component).toBe(true)
})

test('Can create a React.PureComponent instance, if defined', () => {
  const Comp = createStyled({pure: true})('div')``
  const wrapper = mount(<Comp />)
  const el = wrapper.getNodes()[0]

  expect(el instanceof React.PureComponent).toBe(true)
})

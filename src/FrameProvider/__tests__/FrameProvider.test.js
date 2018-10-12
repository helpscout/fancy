import React from 'react'
import {mount} from 'enzyme'
import Frame from 'react-frame-component'
import styled from '../../styled/index'
import FrameProvider from '../index'
import {getStyleProp, resetStyleTags} from '../../utils/testHelpers'

describe('FrameProvider', () => {
  afterEach(() => {
    resetStyleTags()
  })

  test('Can render without children', () => {
    const wrapper = mount(<FrameProvider />)

    expect(wrapper.instance()).toBeTruthy()
  })

  test('Can render a single child', () => {
    const wrapper = mount(
      <FrameProvider>
        <div />
      </FrameProvider>,
    )

    expect(wrapper.instance()).toBeTruthy()
  })

  test('Can render multiple children', () => {
    const wrapper = mount(
      <FrameProvider>
        <div />
        <div />
        <div />
      </FrameProvider>,
    )

    expect(wrapper.instance()).toBeTruthy()
  })

  test('Does not affect styles if no iFrame is present', () => {
    const Compo = styled('span')`
      color: red;
    `
    const wrapper = mount(
      <FrameProvider>
        <Compo />
      </FrameProvider>,
    )
    const el = wrapper.find('span').getNode()

    expect(getStyleProp(el, 'color')).toBe('red')
  })

  test('Can render within an iFrame', () => {
    const Compo = styled('span')`
      color: red;
    `
    const wrapper = mount(
      <Frame>
        <FrameProvider>
          <Compo />
        </FrameProvider>
      </Frame>,
    )

    expect(wrapper.instance()).toBeTruthy()
  })
})

import React from 'react'
import { mount } from 'enzyme'
import Frame from 'react-frame-component'
import styled from '../../styled/index'
import FrameProvider from '../index'
import { getStyleProp, resetStyleTags } from '../../utils/testHelpers'

function getClassListAsString(wrappedComponent) {
  return wrappedComponent.getDOMNode().classList.toString()
}

function getEmotionClassName(wrappedComponent) {
  const classList = getClassListAsString(wrappedComponent).split(' ')
  return classList.find(c => c.includes('css-'))
}

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

  test('Can render a multiple children', () => {
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

  test('Can extend/merge styles within an iFrame', () => {
    const One = styled('span')`
      color: red;
    `

    const Two = styled(One)`
      background: white;
      padding: 20px;
    `

    const wrapper = mount(
      <FrameProvider>
        <div>
          <One className="one" />
          <Two className="two" />
        </div>
      </FrameProvider>,
    )

    const first = wrapper.find('.one')
    const second = wrapper.find('.two')

    const firstClassList = getClassListAsString(first).split(' ')
    const secondClassList = getClassListAsString(second).split(' ')

    expect(firstClassList.length).toBe(secondClassList.length)
    expect(getEmotionClassName(first)).not.toEqual(getEmotionClassName(second))
  })
})

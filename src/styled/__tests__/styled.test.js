import React from 'react'
import {mount} from 'enzyme'
import styled from '../index'
import {getStyleProp, resetStyleTags} from '../../utils/testHelpers'

describe('styled', () => {
  afterEach(() => {
    resetStyleTags()
  })

  describe('Styled Components', () => {
    test('Can create a styled primitive', () => {
      const Compo = styled('span')`
        background: red;
      `
      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      expect(el).toBeTruthy()
      expect(getStyleProp(el, 'background')).toBe('red')
    })

    test('Can create a styled component', () => {
      const Base = props => <p {...props} />
      const Compo = styled(Base)`
        background: yellow;
      `
      const wrapper = mount(<Compo />)
      const el = wrapper.find('p').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
    })

    test('Can pass classNames into a styled component', () => {
      const Base = props => <p {...props} />
      const Compo = styled(Base)`
        background: yellow;
      `
      const wrapper = mount(<Compo className="raptor" />)
      const el = wrapper.find('p').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(el.classList.contains('raptor')).toBe(true)
    })

    test('Can create a styled component with Object styles', () => {
      const Base = props => <p {...props} />
      const Compo = styled(Base)({
        background: 'yellow',
        padding: 20,
      })

      const wrapper = mount(<Compo />)
      const el = wrapper.find('p').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'padding')).toBe('20px')
    })

    test('Can create a styled component with prop interpolation', () => {
      const Compo = styled('span')`
        background: yellow;
        ${props => props.title && 'color: red;'};
      `

      const wrapper = mount(<Compo title="Clever" />)
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Can re-compute className on prop changes', () => {
      const Compo = styled('span')`
        background: yellow;
        ${props => props.title && 'color: red;'};
      `

      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'color')).not.toBe('red')

      wrapper.setProps({title: 'Clever'})

      expect(getStyleProp(el, 'background')).toBe('yellow')
      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Falls back to emotion.css if emotion.cssWithScope is unavailable', () => {
      const spy = jest.fn()
      const Compo = styled('span')`
        background: yellow;
        ${props => props.title && 'color: red;'};
      `

      const wrapper = mount(<Compo />)
      const el = wrapper.find('span').getNode()

      wrapper.instance().emotion.cssWithScope = undefined
      wrapper.instance().emotion.css = spy

      wrapper.setProps({title: 'Clever'})

      expect(spy).toHaveBeenCalled()
    })
  })
})

import React from 'react'
import { mount } from 'enzyme'
import styled from '../index'
import { PRIMITIVE_CLASSNAME } from '../../constants'
import { styleProp, resetStyleTags } from '../../utilities/testHelpers'

describe('String primitive', () => {
  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  describe('Basics', () => {
    test('Can create a primitive component from a string', () => {
      const P = styled('p')()
      const Ul = styled('ul')()
      const Span = styled('span')()
      const wrapper = mount(
        <div>
          <P />
          <Ul />
          <Span />
        </div>
      )

      expect(wrapper.find('p').length).toBe(1)
      expect(wrapper.find('ul').length).toBe(1)
      expect(wrapper.find('span').length).toBe(1)
    })
  })

  describe('String styles', () => {
    test('Automatically generates unique className', () => {
      const Psyduck = styled('div')`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div')

      expect(el.prop('className')).toContain(PRIMITIVE_CLASSNAME)
    })

    test('Creates and applies styles', () => {
      const Psyduck = styled('div')`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node

      expect(styleProp(el, 'background')).toBe('yellow')
    })

    test('Can properly create nested styles', () => {
      const Psyduck = styled('div')`
        background: yellow;

        span {
          background: white;
        }
      `
      const wrapper = mount(
        <Psyduck>
          <span>Psyduck!</span>
        </Psyduck>
      )
      const el = wrapper.find('span').node

      expect(styleProp(el, 'background')).toBe('white')
    })
  })

  describe('Interpolated styles', () => {
    test('Can render styles based on prop interpolation', () => {
      const Psyduck = styled('div')`
        background: yellow;
        ${props =>
          props.title
            ? `
          color: red;
        `
            : `
          display: none;
        `};
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node
      expect(styleProp(el, 'display')).toBe('none')
      expect(styleProp(el, 'color')).not.toBe('red')

      wrapper.setProps({ title: true })

      expect(styleProp(el, 'display')).not.toBe('none')
      expect(styleProp(el, 'color')).toBe('red')
    })

    test('Can use prop value in interpolated style', () => {
      const Psyduck = styled('div')`
        background: yellow;
        ${props => `
          color: ${props['data-color']};
        `};
      `
      const wrapper = mount(<Psyduck data-color="white" />)
      const el = wrapper.find('div').node

      expect(styleProp(el, 'color')).toBe('white')

      wrapper.setProps({ 'data-color': 'yellow' })

      expect(styleProp(el, 'color')).toBe('yellow')
    })
  })

  describe('Function styles', () => {
    test('Can render styles based on prop interpolation', () => {
      const Psyduck = styled('div')(props => {
        return `
          background: yellow;
          ${props.title ? 'color: red;' : 'display: none;'}
        `
      })
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node
      expect(styleProp(el, 'display')).toBe('none')
      expect(styleProp(el, 'color')).not.toBe('red')

      wrapper.setProps({ title: true })

      expect(styleProp(el, 'display')).not.toBe('none')
      expect(styleProp(el, 'color')).toBe('red')
    })
  })
})

describe('Key primitive', () => {
  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  describe('Basics', () => {
    test('Can create a primitive component from a string', () => {
      const P = styled.p()
      const Ul = styled.ul()
      const Span = styled.span()
      const wrapper = mount(
        <div>
          <P />
          <Ul />
          <Span />
        </div>
      )

      expect(wrapper.find('p').length).toBe(1)
      expect(wrapper.find('ul').length).toBe(1)
      expect(wrapper.find('span').length).toBe(1)
    })
  })

  describe('String styles', () => {
    test('Automatically generates unique className', () => {
      const Psyduck = styled.div`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div')

      expect(el.prop('className')).toContain(PRIMITIVE_CLASSNAME)
    })

    test('Creates and applies styles', () => {
      const Psyduck = styled.div`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node

      expect(styleProp(el, 'background')).toBe('yellow')
    })

    test('Can properly create nested styles', () => {
      const Psyduck = styled.div`
        background: yellow;

        span {
          background: white;
        }
      `
      const wrapper = mount(
        <Psyduck>
          <span>Psyduck!</span>
        </Psyduck>
      )
      const el = wrapper.find('span').node

      expect(styleProp(el, 'background')).toBe('white')
    })
  })

  describe('Interpolated styles', () => {
    test('Can render styles based on prop interpolation', () => {
      const Psyduck = styled.div`
        background: yellow;
        ${props =>
          props.title
            ? `
          color: red;
        `
            : `
          display: none;
        `};
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node
      expect(styleProp(el, 'display')).toBe('none')
      expect(styleProp(el, 'color')).not.toBe('red')

      wrapper.setProps({ title: true })

      expect(styleProp(el, 'display')).not.toBe('none')
      expect(styleProp(el, 'color')).toBe('red')
    })

    test('Can use prop value in interpolated style', () => {
      const Psyduck = styled.div`
        background: yellow;
        ${props => `
          color: ${props['data-color']};
        `};
      `
      const wrapper = mount(<Psyduck data-color="white" />)
      const el = wrapper.find('div').node

      expect(styleProp(el, 'color')).toBe('white')

      wrapper.setProps({ 'data-color': 'yellow' })

      expect(styleProp(el, 'color')).toBe('yellow')
    })
  })

  describe('Function styles', () => {
    test('Can render styles based on prop interpolation', () => {
      const Psyduck = styled.div(props => {
        return `
          background: yellow;
          ${props.title ? 'color: red;' : 'display: none;'}
        `
      })
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node
      expect(styleProp(el, 'display')).toBe('none')
      expect(styleProp(el, 'color')).not.toBe('red')

      wrapper.setProps({ title: true })

      expect(styleProp(el, 'display')).not.toBe('none')
      expect(styleProp(el, 'color')).toBe('red')
    })
  })
})

describe('Component primitive', () => {
  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  const Psy = props => <div {...props} />

  describe('String styles', () => {
    test('Automatically generates unique className', () => {
      const Psyduck = styled(Psy)`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div')

      expect(el.prop('className')).toContain(PRIMITIVE_CLASSNAME)
    })

    test('Creates and applies styles', () => {
      const Psyduck = styled(Psy)`
        background: yellow;
      `
      const wrapper = mount(<Psyduck />)
      const el = wrapper.find('div').node

      expect(styleProp(el, 'background')).toBe('yellow')
    })

    test('Can properly create nested styles', () => {
      const Psyduck = styled(Psy)`
        background: yellow;

        span {
          background: white;
        }
      `
      const wrapper = mount(
        <Psyduck>
          <span>Psyduck!</span>
        </Psyduck>
      )
      const el = wrapper.find('span').node

      expect(styleProp(el, 'background')).toBe('white')
    })
  })
})

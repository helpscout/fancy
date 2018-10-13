import React from 'react'
import {mount} from 'enzyme'
import styled from '../../styled/index'
import ScopeProvider from '../index'
import ThemeProvider from '../../ThemeProvider'
import {getStyleProp, resetStyleTags} from '../../utils/testHelpers'

describe('ScopeProvider', () => {
  afterEach(() => {
    resetStyleTags()
  })

  describe('Basic', () => {
    test('Can render without children', () => {
      const wrapper = mount(<ScopeProvider />)

      expect(wrapper.instance()).toBeTruthy()
    })

    test('Can render a single child', () => {
      const wrapper = mount(
        <ScopeProvider>
          <div />
        </ScopeProvider>,
      )

      expect(wrapper.instance()).toBeTruthy()
    })

    test('Can render a multiple children', () => {
      const wrapper = mount(
        <ScopeProvider>
          <div />
          <div />
          <div />
        </ScopeProvider>,
      )

      expect(wrapper.instance()).toBeTruthy()
    })

    test('Can stylize components with scope', () => {
      const Compo = styled('span')`
        color: red;
      `

      const wrapper = mount(
        <ScopeProvider scope="#app">
          <div id="app">
            <Compo />
          </div>
        </ScopeProvider>,
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Can specify nested scope', () => {
      const Compo = styled('span')`
        color: red;
      `

      const wrapper = mount(
        <ScopeProvider scope=".raptor #app">
          <div className="raptor">
            <div id="app">
              <Compo />
            </div>
          </div>
        </ScopeProvider>,
      )
      const el = wrapper.find('span').getNode()
      const html = document.head.innerHTML

      expect(getStyleProp(el, 'color')).toBe('red')
      expect(html).toContain('>.raptor #app .css-')
    })

    test('Scoped selector can contain ScopeProvider', () => {
      const Compo = styled('span')`
        color: red;
      `

      const wrapper = mount(
        <div id="app">
          <ScopeProvider scope="#app">
            <Compo />
          </ScopeProvider>
        </div>,
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Scoped styles can render with original styles', () => {
      const Compo = styled('span')`
        color: red;
      `

      const wrapper = mount(
        <div>
          <Compo />
          <div id="app">
            <ScopeProvider scope="#app">
              <Compo />
            </ScopeProvider>
          </div>
        </div>,
      )
      const first = wrapper
        .find('span')
        .first()
        .getNode()
      const last = wrapper
        .find('span')
        .last()
        .getNode()
      const html = document.head.innerHTML

      expect(getStyleProp(last, 'color')).toBe('red')
      expect(getStyleProp(first, 'color')).toBe('red')

      expect(html).toContain('>.css-')
      expect(html).toContain('>#app .css-')
    })
  })

  describe('Nested', () => {
    test('Closest ScopeProvider is used for scoping', () => {
      const Compo = styled('span')`
        color: red;
      `
      const wrapper = mount(
        <div className="body">
          <div id="app">
            <ScopeProvider scope=".body">
              <ScopeProvider scope="#app">
                <Compo />
              </ScopeProvider>
            </ScopeProvider>
          </div>
        </div>,
      )

      const el = wrapper.find('span').getNode()
      const html = document.head.innerHTML

      expect(getStyleProp(el, 'color')).toBe('red')
      expect(html).toContain('>#app .css-')
      expect(html).not.toContain('>.body')
      expect(html).not.toContain('>.body #app')
      expect(html).not.toContain('>.body .css-')
    })
  })

  describe('ThemeProvider', () => {
    test('Can be used with ThemeProvider', () => {
      const Compo = styled('span')`
        ${props =>
          props.theme.color &&
          `
          color: ${props.theme.color};
        `};
      `
      const wrapper = mount(
        <div className="body">
          <div id="app">
            <ScopeProvider scope=".body">
              <ThemeProvider theme={{color: 'red'}}>
                <Compo />
              </ThemeProvider>
            </ScopeProvider>
          </div>
        </div>,
      )

      const el = wrapper.find('span').getNode()
      const html = document.head.innerHTML

      expect(getStyleProp(el, 'color')).toBe('red')
      expect(html).toContain('>.body .css-')
    })
  })
})

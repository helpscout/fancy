import React from 'react'
import {mount} from 'enzyme'
import styled from '../../styled/index'
import ThemeProvider from '../index'
import {getStyleProp, resetStyleTags} from '../../utils/testHelpers'

describe('ThemeProvider', () => {
  afterEach(() => {
    resetStyleTags()
  })

  describe('Basic', () => {
    test('Can stylize components with theme props', () => {
      const theme = {
        color: 'red',
      }
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Compo />
        </ThemeProvider>,
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Can stylize components with nested theme props', () => {
      const theme = {
        brand: {
          color: 'red',
        },
      }
      const Compo = styled('span')`
        ${props => `color: ${props.theme.brand.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Compo />
        </ThemeProvider>,
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Can re-render styles with theme prop change', () => {
      const theme = {
        color: 'blue',
      }
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <Compo />
        </ThemeProvider>,
      )
      wrapper.setProps({
        theme: {
          color: 'red',
        },
      })
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })
  })

  describe('Nesting', () => {
    test('Extends themes with varying props, if nested', () => {
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={{color: 'red'}}>
          <ThemeProvider theme={{backgroundColor: 'blue'}}>
            <Compo />
          </ThemeProvider>
        </ThemeProvider>,
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })

    test('Merges themes props, if nested', () => {
      const Compo = styled('span')`
        ${props => `color: ${props.theme.color};`};
      `

      const wrapper = mount(
        <ThemeProvider theme={{color: 'blue'}}>
          <ThemeProvider theme={{color: 'red'}}>
            <Compo />
          </ThemeProvider>
        </ThemeProvider>,
      )
      const el = wrapper.find('span').getNode()

      expect(getStyleProp(el, 'color')).toBe('red')
    })
  })

  describe('Custom theme prop', () => {
    test('Defining a custom theme prop, overrides ThemeProvider', () => {
      // Define our button
      const Button = styled('button')`
        font-size: 1em;
        margin: 1em;
        padding: 0.25em 1em;
        border-radius: 3px;

        /* Color the border and text with theme.main */
        color: ${props => props.theme.main};
        border: 2px solid ${props => props.theme.main};
      `

      // Define what main theme will look like
      const theme = {
        main: 'green',
      }

      const wrapper = mount(
        <div>
          <Button theme={{main: 'blue'}} className="adhoc">
            Ad hoc theme
          </Button>
          <ThemeProvider theme={theme}>
            <div>
              <Button className="themed">Themed</Button>
              <Button theme={{main: 'red'}} className="overridden">
                Overidden
              </Button>
            </div>
          </ThemeProvider>
        </div>,
      )

      const adhocNode = wrapper.find('button.adhoc').getNode()
      const themedNode = wrapper.find('button.themed').getNode()
      const overriddenNode = wrapper.find('button.overridden').getNode()

      expect(getStyleProp(adhocNode, 'color')).toBe('blue')
      expect(getStyleProp(adhocNode, 'border')).toContain('blue')

      expect(getStyleProp(themedNode, 'color')).toBe('green')
      expect(getStyleProp(themedNode, 'border')).toContain('green')

      expect(getStyleProp(overriddenNode, 'color')).toBe('red')
      expect(getStyleProp(overriddenNode, 'border')).toContain('red')
    })
  })
})

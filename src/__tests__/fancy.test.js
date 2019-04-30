import React from 'react'
import { mount } from 'enzyme'
import styled, {
  createStyled,
  FrameProvider,
  ScopeProvider,
  ThemeProvider,
} from '../index'
import { getStyleProp, resetStyleTags } from '../utils/testHelpers'

describe('Fancy', () => {
  afterEach(() => {
    resetStyleTags()
  })

  test('Correctly exports styled', () => {
    const Compo = styled('span')`
      background: red;
    `
    const wrapper = mount(<Compo />)
    const el = wrapper.find('span').getNode()

    expect(el).toBeTruthy()
    expect(getStyleProp(el, 'background')).toBe('red')
  })

  test('Correctly exports FrameProvider', () => {
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

  test('Correctly exports ScopeProvider', () => {
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

  test('Correctly exports ThemeProvider', () => {
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

  test('Correctly exports createStyled', () => {
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
})

import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from '../../index'
import styled from '../../styled'

const removeStyle = styled.StyleSheet.removeRule

describe('ThemeProvider', () => {
  const Card = () => {
    return <div className="card" />
  }

  const StyledCard = styled(Card)(
    props => `
    div {
      background: ${props.theme.bg};
    }
  `
  )

  afterEach(() => {
    global.document.head.innerHTML = ''
    /**
     * Removing styles ID, just for testing. This is to help
     * reset the environment.
     */
    removeStyle(StyledCard._styleId)
  })

  describe('internals', () => {
    test('Updates state if scope prop changes', () => {
      const wrapper = mount(<ThemeProvider />)
      wrapper.setProps({ scope: 'html' })

      expect(wrapper.state().scope).toBe('html')
    })

    test('Updates state if theme prop changes', () => {
      const wrapper = mount(<ThemeProvider />)
      wrapper.setProps({ theme: 'html' })

      expect(wrapper.state().theme).toBe('html')
    })

    test('Update callback fires during mount', () => {
      const spy = jest.spyOn(ThemeProvider.prototype, 'update')
      const wrapper = mount(<ThemeProvider />)

      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })

    test('Update callback fires if scope changes', () => {
      const spy = jest.spyOn(ThemeProvider.prototype, 'update')
      const wrapper = mount(<ThemeProvider />)
      wrapper.setProps({ scope: 'html' })

      expect(spy).toHaveBeenCalledTimes(2)
      spy.mockRestore()
    })

    test('Update callback fires if theme changes', () => {
      const spy = jest.spyOn(ThemeProvider.prototype, 'update')
      const wrapper = mount(<ThemeProvider />)
      wrapper.setProps({ theme: 'html' })

      expect(spy).toHaveBeenCalledTimes(2)
      spy.mockRestore()
    })

    test('Update callback does not fire if other props changes', () => {
      const spy = jest.spyOn(ThemeProvider.prototype, 'update')
      const wrapper = mount(<ThemeProvider />)
      wrapper.setProps({ other: 'html' })

      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })
  })

  describe('theme', () => {
    test('Can provide styled component with theme props', () => {
      const theme = { bg: 'red' }
      const wrapper = mount(
        <ThemeProvider theme={theme}>
          <StyledCard />
        </ThemeProvider>
      )
      const el = wrapper.find('.card').node

      expect(window.getComputedStyle(el).background).toBe('red')
    })
  })

  describe('scope', () => {
    test('Can provide styled component with scoping', () => {
      const theme = { bg: 'red' }
      const wrapper = mount(
        <ThemeProvider scope="h1" theme={theme}>
          <h1>Words</h1>
          <StyledCard />
        </ThemeProvider>
      )
      const el = wrapper.find('.card').node

      expect(window.getComputedStyle(el).background).not.toBe('red')
    })
  })
})

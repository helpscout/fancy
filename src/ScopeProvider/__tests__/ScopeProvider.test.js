import React from 'react'
import { mount } from 'enzyme'
import ScopeProvider from '../index'
import styled from '../../styled'
import { styleProp, resetStyleTags } from '../../utilities/testHelpers'

describe('ScopeProvider', () => {
  const Card = () => {
    return <div className="card" />
  }

  const StyledCard = styled(Card)(
    props => `
    div {
      background: red;
    }
  `
  )

  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  describe('internals', () => {
    test('Updates state if scope prop changes', () => {
      const wrapper = mount(<ScopeProvider />)
      wrapper.setProps({ scope: 'html' })

      expect(wrapper.state().scope).toBe('html')
    })

    test('Update callback fires during mount', () => {
      const spy = jest.spyOn(ScopeProvider.prototype, 'update')
      const wrapper = mount(<ScopeProvider />)

      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })

    test('Update callback fires if scope changes', () => {
      const spy = jest.spyOn(ScopeProvider.prototype, 'update')
      const wrapper = mount(<ScopeProvider />)
      wrapper.setProps({ scope: 'html' })

      expect(spy).toHaveBeenCalledTimes(2)
      spy.mockRestore()
    })

    test('Update callback does not fire if other props changes', () => {
      const spy = jest.spyOn(ScopeProvider.prototype, 'update')
      const wrapper = mount(<ScopeProvider />)
      wrapper.setProps({ other: 'html' })

      expect(spy).toHaveBeenCalledTimes(1)
      spy.mockRestore()
    })
  })

  describe('scope', () => {
    test('Can provide styled component with scoping', () => {
      const theme = { bg: 'red' }
      const wrapper = mount(
        <ScopeProvider scope="h1" theme={theme}>
          <StyledCard />
          <h1>
            <StyledCard />
          </h1>
        </ScopeProvider>
      )
      const el = wrapper.find('div').first().node
      const card = wrapper.find('h1 div').node

      expect(styleProp(el, 'background')).not.toBe('red')
      expect(styleProp(card, 'background')).toBe('red')
    })
  })
})

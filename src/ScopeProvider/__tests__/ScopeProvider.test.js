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

  test('Provides scope as context', () => {
    const wrapper = mount(
      <ScopeProvider scope="html">
        <StyledCard />
      </ScopeProvider>
    )
    const el = wrapper.find(StyledCard).getNode()

    expect(el.context.getScope()).toBe('html')
  })

  test('Returns undefined, if no scope defined', () => {
    const wrapper = mount(
      <ScopeProvider>
        <StyledCard />
      </ScopeProvider>
    )
    const el = wrapper.find(StyledCard).getNode()

    expect(el.context.getScope()).toBe(undefined)
  })

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

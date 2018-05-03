import React from 'react'
import { mount } from 'enzyme'
import fancy from '../index'

const removeStyle = fancy.StyleSheet.removeRule

/**
 * Integration tests to ensure that fancy is exported correctly.
 */

describe('HOC Composition', () => {
  const Button = props => (<button {...props} />)
  const css = `
    button {
      appearance: none;
      background: red;
      position: absolute;
    }
  `
  const StyledButton = fancy(css)(Button)

  afterEach(() => {
    global.document.head.innerHTML = ''
    /**
      * Removing styles ID, just for testing. This is to help
      * reset the environment.
      */
    removeStyle(StyledButton._FancyStyleId)
  })

  test('Renders styles declared when composing the component', () => {
    const wrapper = mount(<StyledButton />)
    const el = wrapper.find('button').node
    const styles = window.getComputedStyle(el)

    expect(styles.appearance).toBe('none')
    expect(styles.background).toBe('red')
    expect(styles.position).toBe('absolute')
  })

  test('Does not re-inject styles for multiple components', () => {
    mount(
      <StyledButton />
    )
    const headStyles = document.head.innerHTML

    mount(
      <div>
        <StyledButton />
        <StyledButton />
        <StyledButton />
        <StyledButton />
      </div>
    )

    expect(headStyles).toBe(document.head.innerHTML)
  })

  test('Does not re-inject styles for multiple components, even if they unmount', () => {
    mount(
      <StyledButton />
    )
    const headStyles = document.head.innerHTML
    const b1 = mount(<StyledButton />)

    expect(headStyles).toBe(document.head.innerHTML)

    b1.unmount()

    expect(headStyles).toBe(document.head.innerHTML)
    mount(
      <div>
        <StyledButton />
        <StyledButton />
        <StyledButton />
        <StyledButton />
      </div>
    )

    expect(headStyles).toBe(document.head.innerHTML)
  })

  test('Does not swallow props', () => {
    const wrapper = mount(<StyledButton type='submit' />)
    const el = wrapper.find('button')
    const styles = window.getComputedStyle(el.node)

    expect(styles.appearance).toBe('none')
    expect(styles.background).toBe('red')
    expect(styles.position).toBe('absolute')
    expect(el.prop('type')).toBe('submit')
  })
})

describe('Multiple Composed Components', () => {
  const Card = props => (<div {...props} />)
  const Tag = props => (<span {...props} />)
  const cardCSS = `
    div {
      background: red;
      position: relative;
      border: 1px solid black;
    }
  `
  const tagCSS = `
    span { 
      display: inline-flex;
      padding: 8px
    }
  `
  const StyledCard = fancy(cardCSS)(Card)
  const StyledTag = fancy(tagCSS)(Tag)

  afterEach(() => {
    global.document.head.innerHTML = ''
    /**
      * Removing styles ID, just for testing. This is to help
      * reset the environment.
      */
    removeStyle(StyledCard._FancyStyleId)
    removeStyle(StyledTag._FancyStyleId)
  })

  test('Renders styles declared when composing the component', () => {
    const wrapper = mount(
      <div>
        <StyledCard />
        <StyledTag />
      </div>
    )
    const card = wrapper.find('div').node
    const tag = wrapper.find('span').node
    const cardStyles = window.getComputedStyle(card)
    const tagStyles = window.getComputedStyle(tag)

    expect(cardStyles.background).toBe('red')
    expect(cardStyles.border).toBe('1px solid black')
    expect(cardStyles.position).toBe('relative')

    expect(tagStyles.display).toBe('inline-flex')
    expect(tagStyles.padding).toBe('8px')
  })
})

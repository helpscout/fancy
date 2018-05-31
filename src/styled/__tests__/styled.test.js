import React from 'react'
import { mount } from 'enzyme'
import styled from '../index'
import { resetStyleTags } from '../../utilities/testHelpers'

describe('HOC Composition', () => {
  const Button = props => {
    const { styles, ...rest } = props
    return <button {...rest} />
  }
  const css = `
    button {
      appearance: none;
      background: red;
      position: absolute;
    }
  `
  const StyledButton = styled(Button)(css)

  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
  })

  test('Renders component, without styles if non are defined', () => {
    const NonStyledButton = styled(Button)()
    const wrapper = mount(<NonStyledButton />)
    const el = wrapper.find('button').node

    expect(el).toBeTruthy()
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
    mount(<StyledButton />)
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
    mount(<StyledButton />)
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
    const wrapper = mount(<StyledButton type="submit" />)
    const el = wrapper.find('button')
    const styles = window.getComputedStyle(el.node)

    expect(styles.appearance).toBe('none')
    expect(styles.background).toBe('red')
    expect(styles.position).toBe('absolute')
    expect(el.prop('type')).toBe('submit')
  })

  test('Styles are preserved on re-renders', () => {
    const wrapper = mount(<StyledButton />)
    const el = wrapper.find('button').node

    wrapper.setProps({ title: 'yup' })
    wrapper.update()

    const styles = window.getComputedStyle(el)

    expect(styles.appearance).toBe('none')
    expect(styles.background).toBe('red')
    expect(styles.position).toBe('absolute')
  })
})

describe('Multiple Composed Components', () => {
  const Card = props => {
    const { styles, ...rest } = props
    return <div {...rest} />
  }
  const Tag = props => {
    const { styles, ...rest } = props
    return <span {...rest} />
  }
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
  const StyledCard = styled(Card)(cardCSS)
  const StyledTag = styled(Tag)(tagCSS)

  afterEach(() => {
    resetStyleTags()
    styled.StyleSheet.__dangerouslyResetStyleSheet()
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

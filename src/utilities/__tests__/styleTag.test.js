import React from 'react'
import { mount } from 'enzyme'
import {
  getStyleTag,
  makeStyleTag
} from '../styleTag'

describe('makeStyleTag', () => {
  test('Adds a <style> tag to the Head, if one does not exist', () => {
    // Clear it
    document.head.innerHTML = ''
    const tag = makeStyleTag()

    expect(document.head.querySelector('style')).toBe(tag)
  })
})

describe('getStyleTag', () => {
  test('Adds a <style> tag, based on a Components relative document', () => {
    // Clear it
    document.head.innerHTML = ''
    const spy = jest.fn()
    class Button extends React.Component {
      componentDidMount () {
        spy(getStyleTag(this))
      }

      render () {
        return (<button />)
      }
    }

    mount(<Button />)

    expect(spy).toHaveBeenCalledWith(document.head.querySelector('style'))
  })
})

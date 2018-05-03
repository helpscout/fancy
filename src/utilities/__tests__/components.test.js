import React from 'react'
import { mount } from 'enzyme'
import {
  fastGetReactDOMNode,
  getClosestDocument,
  getComponentName
} from '../components'

describe('getComponentName', () => {
  test('Returns component by default', () => {
    expect(getComponentName()).toBe('Component')
  })

  test('Returns displayName, if available', () => {
    expect(getComponentName({ displayName: 'B' })).toBe('B')
  })

  test('Returns name, if available', () => {
    expect(getComponentName({ name: 'B' })).toBe('B')
  })
})

describe('fastGetReactDOMNode', () => {
  test('Returns node element from a React component', () => {
    const spy = jest.fn()
    class Button extends React.Component {
      componentDidMount () {
        spy(fastGetReactDOMNode(this))
      }

      render () {
        return (<button />)
      }
    }

    const wrapper = mount(<Button />)
    const el = wrapper.find('button')

    expect(spy).toHaveBeenCalledWith(el.node)
  })
})

describe('getClosestDocument', () => {
  test('Returns document element from a React component', () => {
    const spy = jest.fn()
    class Button extends React.Component {
      componentDidMount () {
        spy(getClosestDocument(this))
      }

      render () {
        return (<button />)
      }
    }

    mount(<Button />)

    expect(spy).toHaveBeenCalledWith(global.document)
  })

  test('Falls back to document without args', () => {
    expect(getClosestDocument()).toBe(global.document)
  })
})

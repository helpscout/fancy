import React from 'react'
import { shallow } from 'enzyme'
import Style from '../Style'
import { ID } from '../index'

describe('Style', () => {
  test('Renders a <style> tag', () => {
    const wrapper = shallow(<Style />)
    const el = wrapper.find('style')

    expect(el.length).toBe(1)
  })

  test('Renders a <style> tag with ID', () => {
    const wrapper = shallow(<Style />)

    expect(wrapper.prop('id')).toBe(ID)
  })
})

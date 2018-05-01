import { getComponentName } from '../components'

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

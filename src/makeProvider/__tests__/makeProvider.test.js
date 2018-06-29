import makeProvider from '../index'

describe('makeProvider', () => {
  describe('name', () => {
    test('Sets the Component.displayName, if provided', () => {
      const TestProvider = makeProvider('TestProvider')

      expect(TestProvider.displayName).toBe('TestProvider')
    })

    test('Does not set the Component.displayName, if not provided', () => {
      const TestProvider = makeProvider()

      expect(TestProvider.displayName).toBeFalsy()
    })
  })
})

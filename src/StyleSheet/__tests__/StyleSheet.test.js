import StyleSheet from '../'

describe('StyleSheet', () => {
  describe('addStyles', () => {
    test('Adds new style to _styles', () => {
      const stylesheet = StyleSheet()
      stylesheet.addStyles('1', 'abc')

      expect(stylesheet.getStyles()['1']).toBe('abc')
    })

    test('Adds multiple new style to _styles', () => {
      const stylesheet = StyleSheet()
      stylesheet.addStyles('1', 'abc')
      stylesheet.addStyles('2', 'def')
      stylesheet.addStyles('3', 'zxc')

      expect(stylesheet.getStyles()['1']).toBe('abc')
      expect(stylesheet.getStyles()['2']).toBe('def')
      expect(stylesheet.getStyles()['3']).toBe('zxc')
    })

    test('Does not override existing keys', () => {
      const stylesheet = StyleSheet()
      stylesheet.addStyles('1', 'abc')
      stylesheet.addStyles('1', 'def')

      expect(stylesheet.getStyles()['1']).toBe('abc')
    })

    test('Returns style after setting', () => {
      const stylesheet = StyleSheet()

      expect(stylesheet.addStyles('1', 'abc')).toBe('abc')
    })
  })

  describe('scope', () => {
    test('Can update scope data', () => {
      const stylesheet = StyleSheet()
      const scope = 'html'
      stylesheet.updateScope(scope)

      expect(stylesheet.getScope()).toBe(scope)
    })
  })

  describe('theme', () => {
    test('Can update theme data', () => {
      const stylesheet = StyleSheet()
      const theme = {
        a: 1,
      }
      stylesheet.updateTheme(theme)

      expect(stylesheet.getTheme()).toBe(theme)
    })
  })

  describe('getCSSRules', () => {
    test('Returns cssRules value', () => {
      const stylesheet = StyleSheet()
      stylesheet.addRule('1', 'abc')

      expect(stylesheet.getCSSRules()['1']).toBe('abc')
    })
  })

  describe('getId', () => {
    test('Returns id value', () => {
      const stylesheet = StyleSheet()

      stylesheet.makeRule('1', 'abc')
      expect(stylesheet.getId()).toBe(1)

      stylesheet.makeRule('1213', 'abc')
      expect(stylesheet.getId()).toBe(2)
    })
  })

  describe('getState', () => {
    test('Returns state value', () => {
      const stylesheet = StyleSheet()

      stylesheet.addRule('1', 'abc')
      stylesheet.makeRule('1', 'abc')
      stylesheet.makeRule('1213', 'abc')

      const state = stylesheet.__getState()

      expect(state._id).toBe(2)
      expect(state._cssRules['1']).toBe('abc')
      // console.log(stylesheet.__getState())
    })
  })
})

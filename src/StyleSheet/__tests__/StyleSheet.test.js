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
})

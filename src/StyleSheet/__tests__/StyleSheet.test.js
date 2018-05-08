import StyleSheet from '../'

describe('StyleSheet', () => {
  describe('addStyles', () => {
    test('Adds new style to _styles', () => {
      const stylesheet = StyleSheet()
      stylesheet.addStyles('1', 'abc')

      expect(stylesheet.styles['1']).toBe('abc')
    })

    test('Adds multiple new style to _styles', () => {
      const stylesheet = StyleSheet()
      stylesheet.addStyles('1', 'abc')
      stylesheet.addStyles('2', 'def')
      stylesheet.addStyles('3', 'zxc')

      expect(stylesheet.styles['1']).toBe('abc')
      expect(stylesheet.styles['2']).toBe('def')
      expect(stylesheet.styles['3']).toBe('zxc')
    })

    test('Does not override existing keys', () => {
      const stylesheet = StyleSheet()
      stylesheet.addStyles('1', 'abc')
      stylesheet.addStyles('1', 'def')

      expect(stylesheet.styles['1']).toBe('abc')
    })

    test('Returns style after setting', () => {
      const stylesheet = StyleSheet()

      expect(stylesheet.addStyles('1', 'abc')).toBe('abc')
    })
  })
})

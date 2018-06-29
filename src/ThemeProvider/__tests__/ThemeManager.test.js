import createThemeManager from '../createThemeManager'

const ThemeManager = createThemeManager()

describe('ThemeManager', () => {
  afterEach(() => {
    ThemeManager.__dangerouslyResetTheme()
  })

  describe('addTheme', () => {
    test('Can add props to internal theme state', () => {
      ThemeManager.addTheme({ hello: 'there' })

      expect(ThemeManager.getTheme().hello).toBe('there')
    })

    test('Can add nested props to internal theme state', () => {
      ThemeManager.addTheme({ one: { two: 'three' } })

      expect(ThemeManager.getTheme().one.two).toBe('three')
    })

    test('Does not affect theme, if addTheme is invalid', () => {
      const initialTheme = { one: { two: 'three' } }
      ThemeManager.addTheme(initialTheme)
      ThemeManager.addTheme()

      expect(ThemeManager.getTheme()).toEqual(initialTheme)
    })
  })
})

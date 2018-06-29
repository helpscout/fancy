// @flow
import { isObject } from '../utilities/is'

class ThemeManager {
  constructor() {
    this.theme = {}
  }

  getTheme(theme: Object) {
    return this.theme
  }

  addTheme(theme: Object) {
    if (!isObject(theme)) return
    this.theme = { ...this.theme, ...theme }
  }

  __dangerouslyResetTheme() {
    this.theme = {}
  }
}

const createThemeManager = () => new ThemeManager()

export default createThemeManager

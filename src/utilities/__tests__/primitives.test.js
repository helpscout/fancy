import { makeInterpolatedStyles, makeInterpolatedCSSRules } from '../primitives'
import { PRIMITIVE_CLASSNAME } from '../../constants'

describe('makeInterpolatedStyles', () => {
  test('Can render component (string) with string args', () => {
    const Jolteon = 'div'
    const options = {}
    const args = [['color: yellow']]

    const styles = makeInterpolatedStyles(Jolteon, args, options)

    expect(styles()).toContain(PRIMITIVE_CLASSNAME)
    expect(styles()).toContain('color: yellow')
  })

  test('Can render component (fn) with string args', () => {
    const Jolteon = () => {}
    const options = {}
    const args = [['color: yellow']]

    const styles = makeInterpolatedStyles(Jolteon, args, options)

    expect(styles()).toContain(PRIMITIVE_CLASSNAME)
    expect(styles()).toContain('color: yellow')
  })

  test('Can render component (fn) with fn args', () => {
    const Jolteon = () => {}
    const options = {}
    const args = [[() => 'color: yellow']]

    const styles = makeInterpolatedStyles(Jolteon, args, options)

    expect(styles()).toContain(PRIMITIVE_CLASSNAME)
    expect(styles()).toContain('color: yellow')
  })

  test('Can render component (fn) with string args (non array)', () => {
    const Jolteon = () => {}
    const args = 'color: yellow'

    const styles = makeInterpolatedStyles(Jolteon, args)

    expect(styles()).toContain(PRIMITIVE_CLASSNAME)
    expect(styles()).toContain('color: yellow')
  })
})

describe('makeInterpolatedCSSRules', () => {
  test('Can render component (fn) with string args (non array)', () => {
    const Jolteon = () => {}
    const args = 'color: yellow'

    const styles = makeInterpolatedCSSRules(Jolteon, args)

    expect(styles()).toContain(PRIMITIVE_CLASSNAME)
    expect(styles()).toContain('color: yellow')
  })
})

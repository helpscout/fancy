import {
  classNames,
  makeUniqSelectorForCombinator,
  makeUniqSelector,
} from '../classNames'

describe('classNames', () => {
  test('Consolidate arguments into a single string, separated by spaces', () => {
    const o = classNames('a', 'b', 'c')

    expect(o).toBe('a b c')
  })

  test('Remove falsy arguments', () => {
    const falsy = 10 > 100
    const o = classNames('a', 'b', 'c', falsy && 'd')

    expect(o).toBe('a b c')
  })

  test('Remove `true` from final output', () => {
    const o = classNames('a', 'b', true, 'c')

    expect(o).toBe('a b c')
  })

  test('Return a string, even if arguments are numbers', () => {
    const o = classNames(1, 2)

    expect(typeof o).toBe('string')
    expect(o).toBe('1 2')
  })

  test('Returns empty string by default', () => {
    expect(classNames('')).toBe('')
  })
})

describe('makeUniqSelectorForCombinator', () => {
  const uuid = 'abc'
  const id = '123'

  // Structure
  // ${selector}__${uuid}-${id}

  test('Works with + combinator', () => {
    const combinator = '+'
    const selector = '.Card+.Card'
    const results = makeUniqSelectorForCombinator(
      combinator,
      selector,
      uuid,
      id
    )

    expect(results).toBe('.Card__abc-123+.Card__abc-123')
  })

  test('Works with ~ combinator', () => {
    const combinator = '~'
    const selector = '.Card~.Card'
    const results = makeUniqSelectorForCombinator(
      combinator,
      selector,
      uuid,
      id
    )

    expect(results).toBe('.Card__abc-123~.Card__abc-123')
  })

  test('Allows for arbirtary spacing between combinator token', () => {
    const combinator = '+'
    const selector = '.Card +   .Card'
    const results = makeUniqSelectorForCombinator(
      combinator,
      selector,
      uuid,
      id
    )

    expect(results).toBe('.Card__abc-123+.Card__abc-123')
  })

  test('Allows for differing combinator values', () => {
    const combinator = '+'
    const selector = '.Card + .Nope'
    const results = makeUniqSelectorForCombinator(
      combinator,
      selector,
      uuid,
      id
    )

    expect(results).toBe('.Card__abc-123+.Nope')
  })

  test('Allows for differing combinator values, but is aware of repeated base class', () => {
    const combinator = '+'
    const selector = '.Card + .Nope + .Card'
    const results = makeUniqSelectorForCombinator(
      combinator,
      selector,
      uuid,
      id
    )

    expect(results).toBe('.Card__abc-123+.Nope+.Card__abc-123')
  })

  test('Allows for differing combinator values, but is aware of repeated base class with underscore', () => {
    const combinator = '+'
    const selector = '.Card + .Nope + .Card__block'
    const results = makeUniqSelectorForCombinator(
      combinator,
      selector,
      uuid,
      id
    )

    expect(results).toBe('.Card__abc-123+.Nope+.Card__block__abc-123')
  })
})

describe('makeUniqSelector', () => {
  const uuid = 'abc'
  const id = '123'

  test('Returns untouched selector for non-classNames', () => {
    expect(makeUniqSelector('div', uuid, id)).toBe('div')
    expect(makeUniqSelector('div:before', uuid, id)).toBe('div:before')
    expect(makeUniqSelector('div:hover', uuid, id)).toBe('div:hover')
    expect(makeUniqSelector('#div', uuid, id)).toBe('#div')
    expect(makeUniqSelector('[class*="div"]', uuid, id)).toBe('[class*="div"]')
    expect(makeUniqSelector('[class^="div"]', uuid, id)).toBe('[class^="div"]')
  })

  test('Returns uniq selector for classNames', () => {
    expect(makeUniqSelector('.card', uuid, id)).toBe('.card__abc-123')
    expect(makeUniqSelector('.card:hover', uuid, id)).toBe(
      '.card__abc-123:hover'
    )

    expect(makeUniqSelector('.card:hover:focus', uuid, id)).toBe(
      '.card__abc-123:hover:focus'
    )
    expect(makeUniqSelector('.card + .card:hover:focus', uuid, id)).toBe(
      '.card__abc-123+.card__abc-123:hover:focus'
    )
    expect(makeUniqSelector('.card ~ .card:hover:focus', uuid, id)).toBe(
      '.card__abc-123~.card__abc-123:hover:focus'
    )

    expect(makeUniqSelector('.card\\@md', uuid, id)).toBe('.card\\@md__abc-123')
  })

  test('Returns uniq selector for classNames with nested selectors', () => {
    expect(makeUniqSelector('.a .b .c', uuid, id)).toBe('.a__abc-123 .b .c')
  })

  test('Returns uniq selector for classNames with commas', () => {
    expect(makeUniqSelector('.a, .b', uuid, id)).toBe('.a__abc-123, .b')
  })

  test('Returns uniq selector for classNames with hyphen', () => {
    expect(makeUniqSelector('.a--md', uuid, id)).toBe('.a--md__abc-123')
  })

  test('Returns uniq selector for chained classNames', () => {
    expect(makeUniqSelector('.a.b.c', uuid, id)).toBe('.a__abc-123.b.c')
    expect(makeUniqSelector('.a.b .c', uuid, id)).toBe('.a__abc-123.b .c')
    expect(makeUniqSelector('.a.is-awesome .a__child', uuid, id)).toBe(
      '.a__abc-123.is-awesome .a__child'
    )
  })

  test('Returns uniq selector for classNames with wildcard', () => {
    expect(makeUniqSelector('.c *', uuid, id)).toBe('.c__abc-123 *')
    expect(makeUniqSelector('* .c', uuid, id)).toBe('* .c')
    expect(makeUniqSelector('.c > *', uuid, id)).toBe('.c__abc-123 > *')
    expect(makeUniqSelector('.c + .c *', uuid, id)).toBe(
      '.c__abc-123+.c__abc-123 *'
    )
    expect(makeUniqSelector('.c + .c > *', uuid, id)).toBe(
      '.c__abc-123+.c__abc-123 > *'
    )
  })
})

import {
  makeStyleTag
} from '../styleTag'

describe('makeStyleTag', () => {
  test('Adds a <style> tag to the Head, if one does not exist', () => {
    // Clear it
    document.head.innerHTML = ''
    const tag = makeStyleTag()

    expect(document.head.querySelector('style')).toBe(tag)
  })
})

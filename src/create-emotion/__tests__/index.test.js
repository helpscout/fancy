import createEmotion from '../index'

describe('createEmotion', () => {
  afterEach(() => {
    global.__SECRET_EMOTION__ = undefined
    global.__SECRET_FANCY_EMOTION__ = undefined
  })

  test('Creats unique global instance of Emotion', () => {
    const inst = createEmotion(global)

    expect(global.__SECRET_FANCY_EMOTION__).toBe(inst)
  })

  test('Does not collide with stock instance of Emotion', () => {
    const mockEmotion = {}
    global.__SECRET_EMOTION__ = mockEmotion

    const inst = createEmotion(global)

    expect(global.__SECRET_EMOTION__).toBe(mockEmotion)
    expect(global.__SECRET_FANCY_EMOTION__).toBe(inst)
  })
})

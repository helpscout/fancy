import createEmotion from '../../create-emotion'
import createFrameManager from '../createFrameManager'

describe('createFrameManager', () => {
  test('Returns empty object if there are no args', () => {
    const FrameManager = createFrameManager()

    const emotion = FrameManager.getEmotion()

    expect(emotion).toBeTruthy()
    expect(emotion.css).not.toBeTruthy()
  })

  test('Creates new Emotion instances for a new frame', () => {
    const mockFrame = 'frame'
    const FrameManager = createFrameManager()

    const emotion = FrameManager.getEmotion(mockFrame)

    expect(emotion.css).toBeTruthy()
    expect(FrameManager.emotionInstances.length).toBe(1)
  })

  test('Does not duplicate an existing Emotion instance', () => {
    const emo = createEmotion(global)
    const mockFrame = 'frame'
    const FrameManager = createFrameManager()

    const emotion = FrameManager.getEmotion(mockFrame)

    expect(emotion).not.toEqual(emo)
  })

  test('Creates new Emotion instances for every unique frame', () => {
    const mockFrame = 'frame'
    const FrameManager = createFrameManager()

    FrameManager.getEmotion('anotherFrame')
    const emotion = FrameManager.getEmotion(mockFrame)

    expect(emotion.css).toBeTruthy()
    expect(FrameManager.emotionInstances.length).toBe(2)
  })

  test('Does not create a new Emotion instance for the same frame', () => {
    const mockFrame = 'frame'
    const FrameManager = createFrameManager()

    FrameManager.getEmotion(mockFrame)
    FrameManager.getEmotion(mockFrame)
    FrameManager.getEmotion(mockFrame)
    FrameManager.getEmotion(mockFrame)
    const emotion = FrameManager.getEmotion(mockFrame)

    expect(emotion.css).toBeTruthy()
    expect(FrameManager.emotionInstances.length).toBe(1)
  })
})

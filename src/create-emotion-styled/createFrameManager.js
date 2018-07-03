// @flow
import createEmotion from '../create-emotion/index'

type Frame = Document

export class FrameManager {
  constructor() {
    this.emotionInstances = []
    this.frames = new Set()
  }

  getIndex(frame?: Frame): number {
    return [...this.frames].indexOf(frame)
  }

  getEmotionNamespace() {
    return `__EMOTION_FRAMED_${this.frames.size}__`
  }

  getEmotion(frame?: Frame): Object {
    if (!frame) return {}

    const index = this.getIndex(frame)

    if (index >= 0) {
      return this.emotionInstances[index]
    }

    const newEmotion = createEmotion(
      {
        [this.getEmotionNamespace()]: {},
      },
      {
        container: frame.head,
      }
    )

    this.frames.add(frame)
    this.emotionInstances.push(newEmotion)

    return newEmotion
  }
}

const createFrameManager = () => new FrameManager()

export default createFrameManager

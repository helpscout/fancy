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
    return `__EMOTION_9_FRAMED_${this.frames.size}__`
  }

  createNewEmotionFromFrame(frame?: Frame): Object {
    const newEmotion = createEmotion(
      {
        [this.getEmotionNamespace()]: {},
      },
      {
        container: frame.head,
      },
    )

    this.frames.add(frame)
    this.emotionInstances.push(newEmotion)

    return newEmotion
  }

  getEmotion(frame?: Frame, currentEmotion: any) {
    if (!frame || window.document === frame) {
      return currentEmotion
    }

    let emotionInstance

    // This try/catch was added for IE11/Edge.
    // These browsers throw an error if an attempt was made to on an iFrame
    // that no longer exists (SCRIPT70 errors). This occurs when iFrames are
    // unmounted/destroyed.
    try {
      const index = this.getIndex(frame)

      if (index >= 0) {
        emotionInstance = this.emotionInstances[index]
      } else {
        emotionInstance = this.createNewEmotionFromFrame(frame)
      }
    } catch (e) {
      /* istanbul ignore next */
      emotionInstance = this.createNewEmotionFromFrame(frame)
    }

    return emotionInstance
  }
}

const createFrameManager = () => new FrameManager()

export default createFrameManager

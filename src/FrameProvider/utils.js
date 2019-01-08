// @flow
import channel from './channel'

export const contextTypes = {
  [channel]: () => undefined,
}

export {default as channel} from './channel'
export {default as createBroadcast} from './createBroadcast'
export type Frame = Object

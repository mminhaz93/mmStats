import { COVID_WORLD_TOTAL_STAT } from '../actions/types'

const initialState = {
  items: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case COVID_WORLD_TOTAL_STAT:
      return {
        ...state,
        items: action.payload,
      }
    default:
      return state
  }
}

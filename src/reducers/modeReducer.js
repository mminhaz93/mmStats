import { TOOGLE_DARKMODE } from '../actions/types'

const initialState = {
  isDarkMode: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOOGLE_DARKMODE:
      return { ...state, isDarkMode: action.isDarkMode }
    default:
      return state
  }
}

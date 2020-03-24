import {
  COVID_WORLD_TOTAL_STAT,
  COVID_COUNTRY,
  COVID_COUNTRIES,
  FETCH_COUNTRY_HISTORY_BEGIN,
  FETCH_COUNTRY_HISTORY_SUCCESS,
  FETCH_COUNTRY_HISTORY_FAILURE,
} from '../actions/types'

const initialState = {
  items: [],
  countryItems: [],
  countries: [],
  countryHistory: [],
  loadingHistory: false,
  historyError: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case COVID_WORLD_TOTAL_STAT:
      return {
        ...state,
        items: action.payload,
      }
    case COVID_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      }
    case COVID_COUNTRY:
      return {
        ...state,
        countryItems: action.payload,
      }
    case FETCH_COUNTRY_HISTORY_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loadingHistory: true,
        historyError: null,
      }

    case FETCH_COUNTRY_HISTORY_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loadingHistory: false,
        countryHistory: action.payload.history,
      }

    case FETCH_COUNTRY_HISTORY_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loadingHistory: false,
        historyError: action.payload.error,
        countryHistory: [],
      }
    default:
      return state
  }
}

import {
  COVID_WORLD_TOTAL_STAT,
  COVID_COUNTRY,
  COVID_COUNTRIES,
} from '../actions/types'

const initialState = {
  items: [],
  countryItems: [],
  countries: [],
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

    default:
      return state
  }
}

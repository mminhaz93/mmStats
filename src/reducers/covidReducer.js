import {
  COVID_WORLD_TOTAL_STAT,
  COVID_COUNTRY,
  FETCH_COVID_COUNTRIES_BEGIN,
  FETCH_COVID_COUNTRIES_SUCCESS,
  FETCH_COVID_COUNTRIES_FAILURE,
  TRANSFORM_COUNTRIES_DATA_FOR_GRAPH,
  FETCH_COVID_COUNTRY_HISTORY_BEGIN,
  FETCH_COVID_COUNTRY_HISTORY_SUCCESS,
  FETCH_COVID_COUNTRY_HISTORY_FAILURE,
  TRANSFORM_COUNTRY_HISTORY_DATA_FOR_GRAPH,
} from '../actions/types'

const initialState = {
  items: [],
  countryItems: [],
  countries: [],
  countriesGraphData: [],
  loadingCountries: false,
  countriesError: null,
  countryHistory: [],
  loadingHistory: false,
  historyError: null,
  historyGraphData: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case COVID_WORLD_TOTAL_STAT:
      return {
        ...state,
        items: action.payload,
      }
    case FETCH_COVID_COUNTRIES_BEGIN:
      return {
        ...state,
        loadingCountries: true,
        countriesError: null,
      }
    case FETCH_COVID_COUNTRIES_SUCCESS:
      return {
        ...state,
        loadingCountries: false,
        countries: action.payload.countries,
      }
    case TRANSFORM_COUNTRIES_DATA_FOR_GRAPH:
      return {
        ...state,
        countriesGraphData: action.payload.graphData,
      }
    case FETCH_COVID_COUNTRIES_FAILURE:
      return {
        ...state,
        loadingCountries: false,
        countriesError: action.payload.error,
        countries: [],
      }
    case COVID_COUNTRY:
      return {
        ...state,
        countryItems: action.payload,
      }
    case FETCH_COVID_COUNTRY_HISTORY_BEGIN:
      return {
        ...state,
        loadingHistory: true,
        historyError: null,
      }
    case FETCH_COVID_COUNTRY_HISTORY_SUCCESS:
      return {
        ...state,
        loadingHistory: false,
        countryHistory: action.payload.history,
      }
    case FETCH_COVID_COUNTRY_HISTORY_FAILURE:
      return {
        ...state,
        loadingHistory: false,
        historyError: action.payload.error,
        countryHistory: [],
      }
    case TRANSFORM_COUNTRY_HISTORY_DATA_FOR_GRAPH:
      return {
        ...state,
        historyGraphData: action.payload.graphData,
      }
    default:
      return state
  }
}

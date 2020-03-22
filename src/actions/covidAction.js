import fetch from 'cross-fetch'
import {
  headers,
  worldTotalUrl,
  countryUrl,
  countriesUrl,
} from '../util/config'

import { COVID_WORLD_TOTAL_STAT, COVID_COUNTRY, COVID_COUNTRIES } from './types'

export const fetchWorldTotalStat = () => dispatch => {
  fetch(worldTotalUrl, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: COVID_WORLD_TOTAL_STAT,
        payload: data,
      }),
    )
}

export const fetchCountryStat = () => dispatch => {
  fetch(`${countryUrl}canada`, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data =>
      dispatch({
        type: COVID_COUNTRY,
        payload: data,
      }),
    )
}

export const fetchCountriesStat = () => dispatch => {
  fetch(countriesUrl, {
    method: 'GET',
    headers,
  })
    .then(res => res.json())
    .then(data => {
      // eslint-disable-next-line camelcase
      const { countries_stat } = data
      dispatch({
        type: COVID_COUNTRIES,
        payload: countries_stat,
      })
    })
}

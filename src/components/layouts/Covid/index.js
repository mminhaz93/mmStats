import React from 'react'
import WorldDetails from './WorldDetails'
import CountriesDetails from './Countries/CountiresDetails'
import Graphs from '../../common/Graphs/Graphs'

const Covid = () => {
  return (
    <>
      <WorldDetails />
      <CountriesDetails />
      <Graphs />
    </>
  )
}

export default Covid

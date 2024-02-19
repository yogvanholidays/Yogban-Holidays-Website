import React from 'react'
import LatestAddedComponent from '../components/LatestAddedComponent'
import BestRatedComponent from '../components/BestRatedComponent'
import PickADestination from '../components/PickADestination'
import ListPropertyComponent from '../components/ListPropertyComponent'


function Homepage() {

  return (
    <div>
        <PickADestination/>
        <BestRatedComponent/>
        <LatestAddedComponent/>
        <ListPropertyComponent/>
    </div>
  )
}

export default Homepage
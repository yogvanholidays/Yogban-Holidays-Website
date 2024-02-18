import React from 'react'
import LatestAddedComponent from '../components/LatestAddedComponent'
import BestRatedComponent from '../components/BestRatedComponent'
import PickADestination from '../components/PickADestination'


function Homepage() {

  return (
    <div>
        <PickADestination/>
        <BestRatedComponent/>
        <LatestAddedComponent/>

    </div>
  )
}

export default Homepage
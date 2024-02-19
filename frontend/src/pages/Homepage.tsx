import React from 'react'
import LatestAddedComponent from '../components/LatestAddedComponent'
import BestRatedComponent from '../components/BestRatedComponent'
import PickADestination from '../components/PickADestination'
import ListPropertyComponent from '../components/ListPropertyComponent'
import CouponsList from '../components/CouponsList'


function Homepage() {

  return (
    <div>
        <PickADestination/>
        <BestRatedComponent/>
        <LatestAddedComponent/>
        <ListPropertyComponent/>
        <CouponsList/>
    </div>
  )
}

export default Homepage
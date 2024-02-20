import LatestAddedComponent from '../components/LatestAddedComponent'
import BestRatedComponent from '../components/BestRatedComponent'
import PickADestination from '../components/PickADestination'
import ListPropertyComponent from '../components/ListPropertyComponent'
import CouponsList from '../components/CouponsList'
import BlogComponent from '../components/BlogComponent'


function Homepage() {

  return (
    <div>
        <PickADestination/>
        <BestRatedComponent/>
        <LatestAddedComponent/>
        <ListPropertyComponent/>
        <CouponsList/>
        <BlogComponent/>
    </div>
  )
}

export default Homepage
import LatestAddedComponent from '../components/LatestAddedComponent'
import BestRatedComponent from '../components/BestRatedComponent'
import PickADestination from '../components/PickADestination'
// import ListPropertyComponent from '../components/ListPropertyComponent'
import CouponsList from '../components/CouponsList'
import BlogComponent from '../components/BlogComponent'
import GoToTopButton from '../components/GoToTopButton'


function Homepage() {

  return (
    <div>
        <PickADestination/>
        <BestRatedComponent/>
        <LatestAddedComponent/>
        {/* <ListPropertyComponent/> */}
        <CouponsList/>
        <BlogComponent/>
        <GoToTopButton/>
    </div>
  )
}

export default Homepage
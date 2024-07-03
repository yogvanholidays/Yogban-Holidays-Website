import LatestAddedComponent from '../components/LatestAddedComponent'
import BestRatedComponent from '../components/BestRatedComponent'
// import PickADestination from '../components/PickADestination'
// import ListPropertyComponent from '../components/ListPropertyComponent'
import CouponsList from '../components/CouponsList'
import BlogComponent from '../components/BlogComponent'
import ReviewHeaderComponent from '../components/ReviewHeaderComponent'


function Homepage() {

  return (
    <div>
        {/* <PickADestination/> */}
        <BestRatedComponent/>
        <LatestAddedComponent/>
        {/* <ListPropertyComponent/> */}
        <div className="grid landscape:grid-cols-2 grid-cols-1 gap-3 mb-6">
        <CouponsList/>
        <ReviewHeaderComponent/>
        </div>
        <BlogComponent/>
    </div>
  )
}

export default Homepage
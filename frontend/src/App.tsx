import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./contexts/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import AllBookings from "./pages/AllBookings";
import Homepage from "./pages/Homepage";
import UploadDestination from "./pages/UploadDestination";
import SearchAndDeleteDestinations from "./pages/SearchAndDeleteDestinations";
import SearchAndDeleteHotels from "./pages/DeleteHotel";
import ListYourProperty from "./pages/ListYourProperty";
import ListPropertyRequestsPage from "./pages/ListPropertyRequestsPage";
import CreateCoupon from "./pages/CreateCoupon";
import CreateBlog from "./pages/CreateBlog";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import SearchAndDeleteBlogs from "./pages/SearchAndDeleteBlogs";
import ReviewCouponsPage from "./pages/ReviewCouponsPage";
import CarouselImagesPage from "./pages/CarouselImagesPage";
import UploadFeatured from "./pages/UploadFeatured";


function App() {
  const { isLoggedIn,userEmail } = useAppContext();
  const isAdmin = (userEmail==='yogvan@admin.com')
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout hiddenSearchBar="" page="HomePage"><Homepage/></Layout>} />
        {/* <Route path="/" element={<HomePage/>}/> */}
        <Route path="/search" element={<Layout hiddenSearchBar="" page=''><Search/></Layout>} />
        <Route path="/register" element={<Layout hiddenSearchBar="hide" page=''><Register/></Layout>} />
        <Route path="/sign-in" element={<Layout hiddenSearchBar="hide" page=''><SignIn/></Layout>} />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout hiddenSearchBar="" page=''>
              <Detail />
            </Layout>
          }
        />
            <Route path="/blogs" element={<Layout hiddenSearchBar="" page=''><BlogsPage/></Layout>} />
            <Route path="/blogs/:id" element={<Layout hiddenSearchBar="" page=''><BlogDetailsPage/></Layout>} />

        {isLoggedIn && (
          <>
            <Route path="/hotel/:hotelId/booking" element={<Layout hiddenSearchBar="" page=''><Booking/></Layout>} />
            <Route path="/my-bookings" element={<Layout hiddenSearchBar="" page=''><MyBookings/></Layout>} />
            <Route path="/list-your-property" element={<Layout hiddenSearchBar="" page=''><ListYourProperty/></Layout>} />
          </>
        )}
        {isLoggedIn && isAdmin && (
          <>
          <Route path="/add-property" element={<Layout hiddenSearchBar="" page=''><AddHotel/></Layout>} />
            <Route path="/add-coupon" element={<Layout hiddenSearchBar="" page=''><CreateCoupon/></Layout>} />
            <Route path="/edit-hotel/:hotelId" element={<Layout hiddenSearchBar="" page=''><EditHotel/></Layout>} />
            <Route path="/admin" element={<Layout hiddenSearchBar="" page=''><MyHotels/></Layout>} />
            <Route path="/upload-destination" element={<Layout hiddenSearchBar="" page=''><UploadDestination/></Layout>} />
            <Route path="/view-destinations" element={<Layout hiddenSearchBar="" page=''><SearchAndDeleteDestinations/></Layout>} />
            <Route path="/review-properties" element={<Layout hiddenSearchBar="" page=''><SearchAndDeleteHotels/></Layout>} />
            <Route path="/view-all-bookings" element={<Layout hiddenSearchBar="" page=''><AllBookings/></Layout>} />
            <Route path="/view-all-requests" element={<Layout hiddenSearchBar="" page=''><ListPropertyRequestsPage/></Layout>} />
            <Route path="/create-blog" element={<Layout hiddenSearchBar="" page=''><CreateBlog/></Layout>} />
            <Route path="/review-blogs" element={<Layout hiddenSearchBar="" page=''><SearchAndDeleteBlogs/></Layout>} />
          <Route path="/carousel" element={<Layout hiddenSearchBar="" page=''><CarouselImagesPage/></Layout>} />
          <Route path="/upload-featured" element={<Layout hiddenSearchBar="" page=''><UploadFeatured/></Layout>} />
          </>
        )}
        <Route path="/review-coupons" element={<Layout hiddenSearchBar="" page=''><ReviewCouponsPage/></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

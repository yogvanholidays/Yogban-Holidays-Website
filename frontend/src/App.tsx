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
function App() {
  const { isLoggedIn,userEmail } = useAppContext();
  const isAdmin = (userEmail==='yogban@admin.com')
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout page="HomePage"><Homepage/></Layout>} />
        {/* <Route path="/" element={<HomePage/>}/> */}
        <Route path="/search" element={<Layout page=''><Search/></Layout>} />
        <Route path="/register" element={<Layout page=''><Register/></Layout>} />
        <Route path="/sign-in" element={<Layout page=''><SignIn/></Layout>} />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout page=''>
              <Detail />
            </Layout>
          }
        />
            <Route path="/blogs" element={<Layout page=''><BlogsPage/></Layout>} />
            <Route path="/blogs/:id" element={<Layout page=''><BlogDetailsPage/></Layout>} />

        {isLoggedIn && (
          <>
            <Route path="/hotel/:hotelId/booking" element={<Layout page=''><Booking/></Layout>} />
            <Route path="/my-bookings" element={<Layout page=''><MyBookings/></Layout>} />
            <Route path="/list-your-property" element={<Layout page=''><ListYourProperty/></Layout>} />
          </>
        )}
        {isLoggedIn && isAdmin && (
          <>
            <Route path="/add-hotel" element={<Layout page=''><AddHotel/></Layout>} />
            <Route path="/add-coupon" element={<Layout page=''><CreateCoupon/></Layout>} />
            <Route path="/edit-hotel/:hotelId" element={<Layout page=''><EditHotel/></Layout>} />
            <Route path="/admin" element={<Layout page=''><MyHotels/></Layout>} />
            <Route path="/upload-destination" element={<Layout page=''><UploadDestination/></Layout>} />
            <Route path="/view-destinations" element={<Layout page=''><SearchAndDeleteDestinations/></Layout>} />
            <Route path="/delete-hotels" element={<Layout page=''><SearchAndDeleteHotels/></Layout>} />
            <Route path="/view-all-bookings" element={<Layout page=''><AllBookings/></Layout>} />
            <Route path="/view-all-requests" element={<Layout page=''><ListPropertyRequestsPage/></Layout>} />
            <Route path="/create-blog" element={<Layout page=''><CreateBlog/></Layout>} />
            <Route path="/review-blogs" element={<Layout page=''><SearchAndDeleteBlogs/></Layout>} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

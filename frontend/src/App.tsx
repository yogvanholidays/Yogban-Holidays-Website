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
function App() {
  const { isLoggedIn,userEmail } = useAppContext();
  const isAdmin = (userEmail==='yogban@admin.com')
  console.log("Hello Admin")
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>Home Page</Layout>} />
        <Route path="/search" element={<Layout><Search/></Layout>} />
        <Route path="/register" element={<Layout><Register/></Layout>} />
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>} />
        <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        {isLoggedIn && isAdmin && (
          <>
            <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>} />
            <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout>} />
            <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

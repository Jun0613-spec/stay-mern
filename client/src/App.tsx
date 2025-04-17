import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/layout";

import Register from "./pages/auth/register";
import Login from "./pages/auth/login";

import Home from "./pages/home";
import MyAccount from "./pages/my-account";
import Settings from "./pages/settings";

import MyAccommodations from "./pages/buisness-account/my-accommodations";
import ListAccommodation from "./pages/buisness-account/list-accommodation";
import EditAccommodation from "./pages/buisness-account/edit-accommodation";

import MyBookings from "./pages/customer-account/my-bookings";

import Search from "./pages/search";

import SavedList from "./pages/customer-account/saved-list";
import AccommodationDetail from "./pages/customer-account/accommodation-detail";

import Spinner from "./components/spinner";

import { useAuth } from "./contexts/auth-context";
import Bookings from "./pages/customer-account/bookings";

function App() {
  const { isLoggedIn, currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/accommodation/detail/:accommodationId"
          element={<AccommodationDetail />}
        />

        {isLoggedIn ? (
          <>
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/settings" element={<Settings />} />

            {currentUser?.role === "CUSTOMER" && (
              <>
                <Route path="/my-bookings" element={<MyBookings />} />
                <Route path="/saved-list" element={<SavedList />} />
                <Route
                  path="/accommodation/:accommodationId/booking"
                  element={<Bookings />}
                />
              </>
            )}

            {currentUser?.role === "BUSINESS" && (
              <>
                <Route
                  path="/my-accommodations"
                  element={<MyAccommodations />}
                />
                <Route
                  path="/list-accommodation"
                  element={<ListAccommodation />}
                />
                <Route
                  path="/edit-accommodation/:accommodationId"
                  element={<EditAccommodation />}
                />
              </>
            )}
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Route>
    </Routes>
  );
}

export default App;

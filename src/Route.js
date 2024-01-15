import { BrowserRouter, Route, Routes, path, Navigate } from "react-router-dom";
import { Home } from "./Component/Home";
import { Login } from "./Component/login";
import { NewBooking } from "./Component/newBooking";
import { NewRoom } from "./Component/Addnewroom";
import { RoomInvertory } from "./Component/RoomInverntory";
import { RoomLocked } from "./Component/RoomLocked";
import { Booking } from "./Component/BookedBoom";
import { UpdateBooking } from "./Component/updatebooking";
import { Upcoming } from "./Component//BookedRoomCOmponet";
import { Invoice } from "./Component/Invoice";
import { User } from "./Component/Users";
export function Locations({ user }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Home user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/newbooking"
          exact
          element={
            <ProtectedRoute>
              <NewBooking user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/newRoom"
          exact
          element={
            <ProtectedRoute>
              <NewRoom user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/roomInventory"
          exact
          element={
            <ProtectedRoute>
              <RoomInvertory user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/roomsLocked"
          exact
          element={
            <ProtectedRoute>
              <RoomLocked user={user}/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookedroom"
          exact
          element={
            <ProtectedRoute>
              <Upcoming user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/EditRoom/:id"
          exact
          element={
            <ProtectedRoute>
              <UpdateBooking user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/invoice"
          exact
          element={
            <ProtectedRoute>
              <Invoice user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userdata"
          exact
          element={
            <ProtectedRoute>
              <User user={user}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
function ProtectedRoute({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

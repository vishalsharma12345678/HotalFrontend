import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { Sidebark } from "../Sidebar";
import "../upcoming.css";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

export function LastFragment({ user }) {
  const [rooms, setRooms] = useState([]);
  const [isFetching, setFetching] = useState(false);

  async function handleEdit(e, id, currentbookingid) {
    // setFetching(true);
    const ids = {
      bookingid: id,
      roomsid: currentbookingid,
    };
    let roomsdata = await axios.post(
      `https://hotelwebsitevishal.onrender.com/book/updateBooking`,
      ids
    );
    fetchData();

    // setFetching(false);
  }
  async function handleEdit1(e, id) {
    // setFetching(true);
    const ids = {
      bookingid: id,
      value: e.target.value,
    };
    // console.log(ids)
    let roomsdata = await axios.post(
      `https://hotelwebsitevishal.onrender.com/book/updateBookingEntry`,
      ids
    );
    fetchData();

    // setFetching(false);
  }
  async function DeleteRoom(id) {
    // setFetching(true);
    await axios.get(
      `https://hotelwebsitevishal.onrender.com/book/deletebooking/${id}`
    );
    fetchData();
    // setFetching(false);
  }
  async function fetchData() {
    setFetching(true);
    let roomsdata = await fetch(
      "https://hotelwebsitevishal.onrender.com/book/allBookings"
    );
    let data = await roomsdata.json();
    console.log(data);
    setRooms((s) => data.Lastbooking);
    setFetching(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  async function filterByDate(dates) {
    if (dates) {
      let rooms = await axios.post(
        "https://hotelwebsitevishal.onrender.com/book/allBookingswithdate",
        {
          check_in: dates[0],
          check_out: dates[1],
        }
      );
      console.log(dates);
      console.log(dates[0] + " " + dates[1]);
      console.log(rooms);
      setRooms(rooms.data.Lastbooking);
    } else {
      fetchData();
    }
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebark user={user} />
      <div className="rooms book" style={{ position: "relative", left: "20%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Room Booking Status</h1>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <RangePicker
              style={{ height: "38px" }}
              onChange={filterByDate}
              format="DD-MM-YYYY"
              className="m-2"
            />
          </div>
        </div>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Rooms No</th>
              <th>Guest Name</th>
              <th>Reg No.</th>
              <th>Checked In</th>
              <th>Expected CheckOut</th>
              <th>Verfied By</th>
              <th>Remark</th>
              <th>payment status</th>
              <th>Entry Status</th>
              <th>Booking Status</th>
              <th>Created Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? null : rooms.length === 0 ? (
              <tr>
                <td colSpan="12" style={{ textAlign: "center" }}>
                  No Booking Found in logs
                  <Link to="/newbooking">
                    <button>Add Booking</button>
                  </Link>
                </td>
              </tr>
            ) : (
              Array.from(rooms).map((room, index) => {
                return (
                  <tr key={room._id}>
                    <td>{index + 1}</td>
                    <td>{room.roomNo}</td>
                    <td>{room.full_name}</td>
                    <td>{room.registrationNo}</td>
                    <td>{room.check_in}</td>
                    <td>{room.check_out}</td>
                    <td>{room.verifiedby}</td>
                    <td>{room.payment_type}</td>
                    <td>{room.remark}</td>
                    <td>
                      <select
                        name="status"
                        disabled={
                          room.check_in_check_out === "Checkedout" ||
                          room.status !== "booked"
                            ? true
                            : false
                        }
                        onChange={(e) => handleEdit1(e, room._id)}
                      >
                        <option
                          value="Checkedin"
                          selected={room.check_in_check_out === "Checkedin"}
                        >
                          CheckedIn
                        </option>
                        <option
                          value="Checkedout"
                          selected={room.check_in_check_out === "Checkedout"}
                        >
                          CheckedOut
                        </option>
                        <option
                          value="waiting to checkin"
                          disabled
                          selected={
                            room.check_in_check_out === "waiting to checkin"
                          }
                        >
                          Waiting to checkIn
                        </option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="status"
                        disabled={
                          room.status !== "booked" ||
                          room.check_in_check_out === "Checkedin" ||
                          room.check_in_check_out === "Checkedout"
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          handleEdit(e, room._id, room.currentbooking)
                        }
                      >
                        <option value="" selected={room.status === "booked"}>
                          Booked
                        </option>
                        <option value="" selected={room.status !== "booked"}>
                          Canceled
                        </option>
                      </select>
                    </td>
                    <td>{room.createdAt}</td>
                    <td>
                      <NavLink to={`/EditRoom/${room._id}`}>
                        <button
                          disabled={room.status !== "booked" ? true : false}
                          style={{ cursor: `${room.status !== "booked"}` }}
                        >
                          Edit
                        </button>
                      </NavLink>
                      {user.isAdmin ? (
                        <button onClick={() => DeleteRoom(room._id)}>
                          Delete
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

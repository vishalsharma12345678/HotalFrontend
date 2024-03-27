import { Sidebark } from "./Sidebar";
import "./RoomInvertroy.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export function RoomInvertory({ user }) {
  const [rooms, setRooms] = useState([]);
  const [isFetching, setFetching] = useState(false);
  async function lockroom(id) {
    // setFetching(true);
    let roomsdata = await axios.get(
      `https://hotelwebsitevishal.onrender.com/room/lockRoom/${id}`
    );
    fetchData();

    // setFetching(false);
  }
  async function DeleteRoom(id) {
    // setFetching(true);
    // console.log(id)
    await axios.get(
      `https://hotelwebsitevishal.onrender.com/room/delete/${id}`
    );
    fetchData();
    // setFetching(false);
  }
  async function fetchData() {
    setFetching(true);
    let roomsdata = await fetch(
      "https://hotelwebsitevishal.onrender.com/room/getallrooms"
    );
    let data = await roomsdata.json();
    setRooms((s) => data);
    setFetching(false);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div style={{ display: "flex" }}>
      <Sidebark user={user} />

      <div className="rooms inv" style={{ position: "relative", left: "20%" }}>
        <h1>Rooms Inventory</h1>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Rooms</th>
              <th>Rooms_type</th>
              <th>Rooms_Ameneties</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {isFetching ? null : rooms.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No Rooms are Found.
                </td>
              </tr>
            ) : (
              Array.from(rooms).map((room, index) => {
                return (
                  <tr key={room._id}>
                    <td>{index + 1}</td>
                    <td>{room.roomNo}</td>
                    <td>{room.roomType}</td>
                    <td>{room.Room_amneities}</td>
                    <td>
                      <button onClick={() => DeleteRoom(room._id)}>
                        Delete
                      </button>
                      {room.Room_Status != "Locked" ? (
                        <button onClick={() => lockroom(room._id)}>Lock</button>
                      ) : null}
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

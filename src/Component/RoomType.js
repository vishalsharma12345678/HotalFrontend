import { useState, useEffect } from "react";
import { Sidebark } from "./Sidebar";
import axios from "axios";
import "./upcoming.css";
export function RoomType({ user }) {
  const [RoomType, setRoomType] = useState([]);
  const [open, setopen] = useState(false);
  async function fetch1() {
    const res = await axios.get(
      "https://hotelwebsitevishal.onrender.com/Roomtype"
    );
    setRoomType(res.data);
  }
  useEffect(() => {
    fetch1();
  }, []);

  return (
    <>
      {open && <RoomTypeg open={setopen} />}
      <div style={{ display: "flex" }}>
        <Sidebark user={user} />
        <div
          className="rooms book"
          style={{ position: "relative", left: "20%" }}
        >
          <h1>Room Types</h1>
          <button style={{ textAlign: "end" }} onClick={(e) => setopen(true)}>
            Add Room Type
          </button>
          <table width={"100%"}>
            <thead>
              <tr>
                <th>SNo..</th>
                <th>Room Type.</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(RoomType).map((i, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{i.name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export function RoomTypeg({ open }) {
  let style = {
    border: "2px solid white",
    borderRadius: "5px",
    height: "35px",
    margin: "5px",
  };
  const [data, setuser] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .post("https://hotelwebsitevishal.onrender.com/addRoomtype", {
        data: data,
      })
      .then((result) => {
        open(false);
      });
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "10000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgb(255,255,255,0.7)",
      }}
    >
      <form
        action=""
        style={{
          width: "30%",
          padding: "2rem",
          backgroundColor: "black",
          borderRadius: "10px",
          opacity: "1",
        }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <p
          onClick={() => {
            open(false);
          }}
          style={{
            color: "white",
            width: "100%",
            textAlign: "end",
            cursor: "pointer",
          }}
        >
          X
        </p>
        <label style={{ color: "white" }} htmlFor="">
          Room Type
        </label>
        <input
          type="text"
          value={data}
          style={style}
          onChange={(e) => setuser(e.target.value)}
        />
        <button>Save</button>
      </form>
    </div>
  );
}

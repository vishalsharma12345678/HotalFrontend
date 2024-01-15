import { useEffect, useRef, useState } from "react";
import { Sidebark } from "./Sidebar";
import { Opions } from "./options";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import "./newboing.css";
import axios from "axios";

export function NewBooking({user1}) {
  const user = localStorage.getItem("user");
  const g = JSON.parse(user);
  const [disabled, setDisabled] = useState(true);
  const [wpps, setWpps] = useState(false);
  const [check_in, setCheck_in] = useState();
  const [check_out, setcheck_out] = useState();
  const [rooms, setRooms] = useState([]);
  const [data, setData] = useState({});
  const [phone, setPhone] = useState(0);
  const [room, setRoom] = useState();

  const [guests, setGuests] = useState([]);
  function handlerCheckIn(e) {
    setCheck_in((a) => e.target.value);
  }
  async function handlerCheckOut(e) {
    let rooms = await fetch("https://hotelwebsitevishal.onrender.com/room/getallroomsAvalible");
    let data = await rooms.json();
    console.log(data);
    console.log(check_in + " " + check_out);
    let g = [];
    Array.from(data).forEach((item) => {
      let availability = <tr></tr>;
      for (var booking of item.currentbookings) {
        availability = true;
        if (item.currentbookings.length) {
          const date = new Date(check_in);
          const date1 = new Date(check_out);

          const start = new Date(booking.formdate);
          const end = new Date(booking.todate);
          if ((date >= start && date <= end) || (date1 >= start && date1 <= end)  
          ) {
            availability = false;
          }if((start >= date && start <= date1) || (end >= date && end <= date1)){
            availability = false;
          }
        }
        if (!availability) break;
      }
      //   console.log(availability);
      if (availability || item.currentbookings.length == 0) {
        g.push(item);
      }
    });
    setRooms(g);
  }
  function handleraddGuest(e) {
    e.preventDefault();
    setGuests((items) => [...items, {}]);
  }
  const updateData = (e) => {
    if(e.target.name == 'adultCharges'){
      setData((s) => ({ ...s, [e.target.name]: e.target.checked }));
      setData((s) => ({ ...s, ["price"]: s['price'] + room[0].adult_charge }));
      return ;
    }
    setData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };
  const updateData1 = (e) => {
    setData((s) => ({
      ...s,
      ["price"]:( Number(room[0].rate_type_name) + room[0][e.target.value]) ,
    }));
    setData((s) => ({
      ...s,
      ["verifiedby"]: g.username,
    }));
  };
  const updateGuest = (e, i) => {
    const newguests = [...guests];
    newguests[i][e.target.name] = e.target.value;
    setGuests(newguests);
  };
  async function handlerChange(value) {
    setData((s) => ({ ...s, ["userid"]: g._id }));
    const i = rooms.filter((roomg) => {
      if (roomg._id === value) {
        return roomg;
      }
    });
    setRoom(i);
    setData((s) => ({ ...s, ["price"] :  Number(i[0].rate_type_name) }));
  }
  async function handlerSubmit(e) {
    e.preventDefault();
    let f = data.meal_plan;
    console.log(data.price);
    setData((s) => ({
      ...s,
      ["price"]: s['price'] + Number(room[0].rate_type_name) + room[0][f]
    }));

    const fullData = { ...data, guest: guests };
    console.log(fullData);
    const curUser = await axios.post(
      "https://hotelwebsitevishal.onrender.com/book/addbooking",
      fullData
    );
    console.log(curUser);
    window.location.href = "/";
  }

  return (
    <div style={{ display: "flex" }}>
              <Sidebark user={user1}/>

      <div className="d-flex" style={{ position: "relative", left: "20%" }}>
        <div>
          <form
            onSubmit={handlerSubmit}
            className="formreg"
            style={{
              display: "flex",
              flexWrap: "wrap",
              padding: "3rem",
              gap: "10px",
            }}
          >
            <h1 style={{ width: "100%" }}>NEW BOOKING</h1>

            <p>
              <label for="">Reg No</label>
              <br />
              <input type="text" required name="registrationNo" onChange={updateData} />
            </p>
            <p>
              <label for="">Invoice No.</label>
              <br />
              <input type="number" required name="invoice_No" onChange={updateData} />
            </p>
            <p>
              <label for="">Log No.</label>
              <br />
              <input type="number" required name="log_No" onChange={updateData} />
            </p>
            <p>
              <label for="">check in</label>
              <br />
              <input
                type="date"
                name="check_in"
                required
                onChange={(e) => {
                  handlerCheckIn(e), updateData(e);
                }}
              />
            </p>
            <p>
              <label for="">Expected Check out</label>
              <br />
              <input
                type="date"
                name="check_out"
                required
                onChange={(e) => {
                  setcheck_out(e.target.value), updateData(e);
                }}
              />
            </p>
            <p>
              <label for="">Room Type</label>
              <br />
              <select
                name="room_type"
                required
                onChange={(e) => {
                  handlerCheckOut(), updateData(e);
                }}
              >
                <option value=""  selected>
                  choose...
                </option>
                <option value="Standard">Standard Room</option>
              </select>
            </p>
            <p>
              <label for="">Meal Plan</label>
              <br />
              <select
                name="meal_plan"
                required
                onChange={(e) => {
                  updateData(e);
                  updateData1(e);
                }}
              >
                <option value="" disabled selected>
                  choose...
                </option>
                <option value="room_only">Room Only</option>
                <option value="breakfast_price">Bed & BreakFast</option>
                <option value="lunch_price">Lunch Only</option>
                <option value="dinner_price">Dinner Only </option>
                <option value="breakfast_lunch">Breakfast and Lunch</option>
                <option value="lunch_dinner">Lunch and Dinner</option>
                <option value="dinner_breakfast">Dinner Breakfast</option>
                <option value="full_board">Full Board</option>
              </select>
            </p>
            <p>
              <label for="">Room Number</label>
              <br />
              <select
                name="room_number"
                required
                onChange={(e) => (updateData(e), handlerChange(e.target.value))}
              >
                <option value="">choose...</option>
                {rooms.map((room) => {
                  return <option value={room._id}>{room.roomNo}</option>;
                })}
              </select>
            </p>
            <p>
              <label for="">Guest Basis</label>
              <br />
              <select required name="guest_basis" onChange={updateData}>
                <option value="" disabled selected>
                  choose...
                </option>
                <option value="direct booking">Direct booking</option>
                <option value="fit">FIT</option>
                <option value="OTA">OTA</option>
              </select>
            </p>
            <p>
              <label for="">Guest Type</label>
              <br />
              <select
                name="guest_type"
                required
                onChange={(e) => {
                  e.target.value === "tourist" ? setWpps(true) : setWpps(false);
                  updateData(e);
                }}
              >
                <option value="" disabled selected>
                  choose...
                </option>
                <option value="local">Local</option>
                <option value="work_permit">Work Permit</option>
                <option value="tourist">Tourist</option>
              </select>
            </p>
            <div style={{ width: "32.33%" }}>
              <p style={{ margin: 0 }}>
                <label for="">bill to</label>
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <input
                  type="radio"
                  name="bill_to"
                  value="customer"
                  required
                  onChange={(e) => {
                    setDisabled(true);
                    updateData(e);
                  }}
                />
                <label for="customer">Customer</label>
                <input
                  type="radio"
                  name="bill_to"
                  required
                  onChange={(e) => {
                    setDisabled(false);
                    updateData(e);
                  }}
                  value="company"
                />
                <label for="company">Company</label>
              </div>
            </div>
            <p>
              <label for="">Company Name</label>
              <input
                type="text"
                required
                name="company_name"
                disabled={disabled}
                onChange={updateData}
              />
            </p>
            <p>
              <label for="">Full Name</label>
              <input type="text" required name="full_name" onChange={updateData} />
            </p>
            <p>
              <label for="">Email</label>
              <input type="text" required name="email" onChange={updateData} />
            </p>
            <p>
              <label for="">Mobile number</label>
              <PhoneInput
                country={"eg"}
                enableSearch={true}
                value={phone}
                onChange={(phone1) => (
                  setPhone((s) => phone1),
                  setData((s) => ({ ...s, ["phone"]: phone1 }))
                )}
              />
            </p>
            <p>
              <label for="">WP/ND</label>
              <input
                type="text"
                name="wp_nd"
                disabled={wpps}
                onAbort={updateData}
              />
            </p>
            <p>
              <label for="">Passport</label>
              <input
                type="text"
                disabled={!wpps}
                name="passport_number"
                onChange={updateData}
              />
            </p>

            <p>
              <label for="">Natinality</label>
              <select name="nationality" required onChange={updateData}>
                <Opions />
              </select>
            </p>
            <p>
              <label for="">Country of Residence</label>
              <select name="country_residence" required onChange={updateData}>
                <Opions />
              </select>
            </p>
            <p>
              <label for="">D.O.B</label>
              <input type="date" name="dob" required onChange={updateData} />
            </p>
            <p>
              <label for="">Profession</label>
              <input type="text" name="proffesion" required onChange={updateData} />
            </p>
            <p>
              <label for="">No of Pax</label>
              <div style={{ display: "flex", width: "100%" }}>
                <input
                  type="text"
                  required
                  style={{ width: "45%" }}
                  name="adultNo"
                  value={data.adultNo}
                  onChange={(e)=>(updateData(e),(e.target.value>4?setData((s) => ({ ...s, [e.target.name]: 4 })):""))}
                  placeholder="no of adult"
                />
                <input
                  type="text"
                  style={{ width: "45%" }}
                  name="children"
                  required
                  onChange={updateData}
                  placeholder="no of child"
                />
                <input type="checkbox" name="adultCharges" onChange={updateData} id="" />
              </div>
            </p>
            <p>
              <label for="">Group</label>
              <div style={{ display: "flex", width: "100%" }}>
                <select name="group" required onChange={updateData}>
                  <option value="no">no</option>
                  <option value="yes">yes</option>
                </select>
              </div>
            </p>

            <p>
              {/* <!-- <label for="">Upload Id</label>
              <input type="file" name=""  style="border: 1px solid black" /> --> */}
            </p>
            
            <p>
              <button onClick={(e) => handleraddGuest(e)}>
                Add More Guest
              </button>
            </p>
            {guests.map((guest, i) => {
              return (
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                  className="guest"
                >
                  <input
                    type="text"
                    placeholder="name"
                    required
                    name="name"
                    onChange={(e) => updateGuest(e, i)}
                  />
                  <input
                    type="date"
                    name="dob"
                    required
                    onChange={(e) => updateGuest(e, i)}
                  />
                  <input
                    type="number"
                    name="wp_pass"
                    required
                    placeholder="wp/passport"
                    onChange={(e) => updateGuest(e, i)}
                  />
                  <select
                    name="nationality"
                    required
                    onChange={(e) => updateGuest(e, i)}
                  >
                    <Opions />
                  </select>
                  <input type="file" />
                  <a href="">Remove</a>
                </div>
              );
            })}

            <p>
              <label for="">Payment Type</label>
              <select name="payment_type" required onChange={updateData}>
                <option value="" selected disabled>
                  Payment Type
                </option>
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
                <option value="onhold" >Onhold</option>

              </select>
            </p>
            <p>
              <label for="">Remark</label>
              <input type="text" name="remark" required onChange={updateData} />
            </p>
            <p>
              <label for="">Verified By</label>

              <input type="text" required value={g.username} onChange={updateData} />
            </p>
            <div>
              <button>Save Data</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

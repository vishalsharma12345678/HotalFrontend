import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";

import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import './index.css'

export function Sidebark({user}){
  const [data, setdata] = useState(false)
  useEffect(() =>{
      setdata((JSON.parse(localStorage.getItem('user')).isAdmin ? true : false))
  },[])
    console.log(user)

    return (
        <Sidebar className="sidebar" aria-label="Sidebar with multi-level dropdown example" style={{height:'calc(100vh - 60px)',position:"fixed",zIndex:'1000'}}>
          <div style={{textAlign:'center'}}>
            <img style={{width:'205px',height:'113px',position:'relative',objectFit:'scale-down'}} src="./Image20231227194121.jpg" alt="" />
          </div>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Collapse icon={HiShoppingBag} label="Booking">
              <Sidebar.Item href="/newbooking">Create New</Sidebar.Item>
              <Sidebar.Item href="/bookedroom">Booked Rooms</Sidebar.Item>
            </Sidebar.Collapse>
            <Sidebar.Collapse href="#" icon={HiInbox} label="Invoices">
              <Sidebar.Item href="/invoice">Create Invoices</Sidebar.Item>
            </Sidebar.Collapse>
            {data ? (
            <Sidebar.Collapse href="#" icon={HiUser} label="Rooms">
            <Sidebar.Item href="/newRoom">Add New</Sidebar.Item>
            <Sidebar.Item href="/roomInventory">Rooms Inventory</Sidebar.Item>
            <Sidebar.Item href="/roomsLocked">Locked Rooms</Sidebar.Item>
            <Sidebar.Item href="#">Room Type</Sidebar.Item>
            <Sidebar.Item href="#">Room Rates</Sidebar.Item>
          </Sidebar.Collapse>
            ):(
              null
            )}

            <Sidebar.Item href="#" icon={HiShoppingBag}>
              Guests
            </Sidebar.Item>
            {data ? (
              <Sidebar.Item href='/userdata' icon={HiUser}>
                User
              </Sidebar.Item>
            ):(
              <Sidebar.Item href='/' icon={HiUser}>
                Profile
              </Sidebar.Item>
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    )
}
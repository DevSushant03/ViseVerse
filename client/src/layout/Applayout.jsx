import React from 'react'
import { Outlet } from 'react-router-dom'
import "../App.css"
import Navbar from '../components/Navbar'

export default function Applayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )

}

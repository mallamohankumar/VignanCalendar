import React from 'react'
import "../css/App.css"
import { Outlet, Link } from "react-router-dom";

const THome = () => {
  return (
    <div>
    <nav>
        <input type="checkbox" id="check" />
        <label for="check" className="checkbtn">
            <i className="fas fa-bars"></i>
        </label>
        <label className="logo">Vignan Calendar</label>
        <ul>
            <li><Link className="active" to="/thome">Home</Link></li>
            <li><Link  to="/student">Add Student </Link></li>
            <li><Link  to="/staff">Add Staff </Link></li>
            <li><Link  to="/event">Add Event </Link></li>
            <li><Link  to="/cal">Calendar </Link></li>
        </ul>
    </nav>
    <div className="container">
        <div className="imgBx">
            <lottie-player src="https://assets9.lottiefiles.com/private_files/lf30_g0us1yjd.json"  background="transparent"  speed="1"   loop autoplay></lottie-player>
        </div>
        <div className="main-content">
            <h1>Enjoy Everyday</h1>
            <p>This Website is Designed to see the events and holidays at particular date in vignan college</p>
        </div>
    </div>
    </div>
  )
}

export default THome
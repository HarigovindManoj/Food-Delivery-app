import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  
  
  
  return (
    <div className="footer " id="footer" >
        <div className="footer-content app">
            <div className="footer-content-left">
             <img src={assets.logo} alt="" />
             <p>Build Full Stack Food Ordering Website using React JS, MongoDB, Express, Node JS & Strip | Full Stack Project for students 2024</p>
             <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
             </div>
            </div>
            <div className="footer-content-center">
               <h2>COMPANY</h2>
               <ul>
                 <li >Home</li>
                 <li>About Us</li>
                 <li>Delivery</li>
                 <li>Privacy policy</li>
               </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212678875</li>
                    <li>contact@tomato.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">Copyright 2024 @ tomato - All Right Reserved </p>
    </div>
  )
}

export default Footer

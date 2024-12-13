import React from 'react'
import Navbar from '../Componenets/LandingPage/Navbar'
import styles from '../LandingPage.module.css'
import HeroSection from '../Componenets/LandingPage/HeroSection'
import FeatureSection from '../Componenets/LandingPage/FeatureSection'
import Workflow from '../Componenets/LandingPage/Workflow'
import Pricing from '../Componenets/LandingPage/Pricing'
import Testimonials from '../Componenets/LandingPage/Testimonials'
import Footer from '../Componenets/LandingPage/Footer'



function LandingPage() {
  return (
    <div className={styles.landingPage}>
        <Navbar/>
        <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection/>
        <FeatureSection/>
        <Workflow/>
        <Pricing/>
        <Testimonials/>
        <Footer/>
        </div>
    </div>
  )
}

export default LandingPage
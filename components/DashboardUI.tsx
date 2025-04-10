"use client"

import { useState, useEffect } from "react"
import { useUser } from "@descope/nextjs-sdk/client"
import "./dashboardUI.css"

interface DashboardUIProps {
  onLogout: () => void;
}

export default function DashboardUI({ onLogout }: DashboardUIProps) {
  const { user} = useUser()
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Format date for greeting
  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  const formatDate = () => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  const userData = {
    name: user?.name,
    email: user?.email || "",
    picture: user?.picture|| "",
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="shape dashboard-shape-1"></div>
        <div className="shape dashboard-shape-2"></div>
        <div className="shape dashboard-shape-3"></div>
        <div className="shape dashboard-shape-4"></div>
      </div>

      <div className="dashboard-content">
        <header className="dashboard-header">
          <div className="logo">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" className="logo-icon">
                <path d="M3,13h8V3H3V13z M3,21h8v-6H3V21z M13,21h8V11h-8V21z M13,3v6h8V3H13z" />
              </svg>
            </div>
            <span className="logo-text">Dashboard</span>
          </div>

          <div className="header-actions">
            <button className="logout-button" onClick={onLogout}>
              <svg viewBox="0 0 24 24">
                <path d="M17,7l-1.41,1.41L18.17,11H8v2h10.17l-2.58,2.58L17,17l5-5L17,7z M4,5h8V3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h8v-2H4V5z" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </header>

        <div className="dashboard-main">
          <div className="welcome-section centered">
            <div className="welcome-text">
              <h1 className="large-greeting">
                {getGreeting()}, {userData?.name?.split(" ")[0] || "User"}!
              </h1>
              <p className="date-text">{formatDate()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

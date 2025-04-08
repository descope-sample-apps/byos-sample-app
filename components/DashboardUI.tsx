"use client"

import { useState, useEffect } from "react"
import "./dashboardUI.css"

interface DashboardUIProps {
  userData: {
    name?: string;
    email?: string;
    picture?: string;
  };
  onLogout: () => void;
}

export default function DashboardUI({ userData, onLogout }: DashboardUIProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [stats, setStats] = useState({
    visitors: 0,
    revenue: 0,
    orders: 0,
    conversions: 0,
  })

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Animate stats on load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStats({
        visitors: 1482,
        revenue: 12628,
        orders: 259,
        conversions: 24,
      })
    }, 500)

    return () => clearTimeout(timeout)
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
            <div className="notification-bell" onClick={() => setShowNotifications(!showNotifications)}>
              <svg viewBox="0 0 24 24">
                <path d="M12,22c1.1,0,2-0.9,2-2h-4C10,21.1,10.9,22,12,22z M18,16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-0.83-0.67-1.5-1.5-1.5 S10.5,3.17,10.5,4v0.68C7.63,5.36,6,7.92,6,11v5l-2,2v1h16v-1L18,16z" />
              </svg>
              <span className="notification-badge">3</span>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <button className="mark-read">Mark all as read</button>
                  </div>
                  <div className="notification-list">
                    <div className="notification-item unread">
                      <div className="notification-icon new">
                        <svg viewBox="0 0 24 24">
                          <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z" />
                        </svg>
                      </div>
                      <div className="notification-content">
                        <p>Your account was successfully created</p>
                        <span className="notification-time">Just now</span>
                      </div>
                    </div>
                    <div className="notification-item unread">
                      <div className="notification-icon message">
                        <svg viewBox="0 0 24 24">
                          <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                        </svg>
                      </div>
                      <div className="notification-content">
                        <p>You have a new message from support</p>
                        <span className="notification-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <div className="notification-icon update">
                        <svg viewBox="0 0 24 24">
                          <path d="M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z" />
                        </svg>
                      </div>
                      <div className="notification-content">
                        <p>System update completed successfully</p>
                        <span className="notification-time">Yesterday</span>
                      </div>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <button>View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            <div className="user-profile" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="user-avatar">
                {userData?.picture ? (
                  <img src={userData.picture || "/placeholder.svg"} alt={userData?.name || "User"} />
                ) : (
                  <div className="avatar-placeholder">
                    {userData?.name?.charAt(0) || userData?.email?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <span className="user-name">{userData?.name || "User"}</span>
              <svg className={`dropdown-arrow ${showUserMenu ? "open" : ""}`} viewBox="0 0 24 24">
                <path d="M7,10l5,5l5-5H7z" />
              </svg>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="user-dropdown-avatar">
                      {userData?.picture ? (
                        <img src={userData.picture || "/placeholder.svg"} alt={userData?.name || "User"} />
                      ) : (
                        <div className="avatar-placeholder large">
                          {userData?.name?.charAt(0) || userData?.email?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <div className="user-dropdown-info">
                      <h4>{userData?.name || "User"}</h4>
                      <p>{userData?.email || ""}</p>
                    </div>
                  </div>
                  <div className="user-dropdown-menu">
                    <button className="user-dropdown-item">
                      <svg viewBox="0 0 24 24">
                        <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,5c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3 S10.34,5,12,5z M12,19.2c-2.5,0-4.71-1.28-6-3.22c0.03-1.99,4-3.08,6-3.08c1.99,0,5.97,1.09,6,3.08 C16.71,17.92,14.5,19.2,12,19.2z" />
                      </svg>
                      <span>Profile</span>
                    </button>
                    <button className="user-dropdown-item">
                      <svg viewBox="0 0 24 24">
                        <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                      </svg>
                      <span>Settings</span>
                    </button>
                    <button className="user-dropdown-item" onClick={onLogout}>
                      <svg viewBox="0 0 24 24">
                        <path d="M17,7l-1.41,1.41L18.17,11H8v2h10.17l-2.58,2.58L17,17l5-5L17,7z M4,5h8V3H4C2.9,3,2,3.9,2,5v14c0,1.1,0.9,2,2,2h8v-2H4V5z" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="dashboard-main">
          <div className="welcome-section">
            <div className="welcome-text">
              <h1>
                {getGreeting()}, {userData?.name?.split(" ")[0] || "User"}!
              </h1>
              <p>{formatDate()}</p>
            </div>
            <div className="welcome-actions">
              <button className="action-button primary">
                <svg viewBox="0 0 24 24">
                  <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                </svg>
                <span>New Project</span>
              </button>
              <button className="action-button secondary">
                <svg viewBox="0 0 24 24">
                  <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M17,12H7v-2h10V12z M14,15H7v-2h7V15z M7,8h10v2H7V8z" />
                </svg>
                <span>View Reports</span>
              </button>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-card">
              <div className="stat-icon visitors">
                <svg viewBox="0 0 24 24">
                  <path d="M16,11c1.66,0,2.99-1.34,2.99-3S17.66,5,16,5c-1.66,0-3,1.34-3,3S14.34,11,16,11z M8,11c1.66,0,2.99-1.34,2.99-3 S9.66,5,8,5C6.34,5,5,6.34,5,8S6.34,11,8,11z M8,13c-2.33,0-7,1.17-7,3.5V19h14v-2.5C15,14.17,10.33,13,8,13z M16,13 c-0.29,0-0.62,0.02-0.97,0.05c1.16,0.84,1.97,1.97,1.97,3.45V19h6v-2.5C23,14.17,18.33,13,16,13z" />
                </svg>
              </div>
              <div className="stat-content">
                <h3>Visitors</h3>
                <div className="stat-value">{stats.visitors.toLocaleString()}</div>
                <div className="stat-change positive">+12.5% from last week</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue">
                <svg viewBox="0 0 24 24">
                  <path d="M11.8,10.9c-2.27-0.59-3-1.2-3-2.15c0-1.09,1.01-1.85,2.7-1.85c1.78,0,2.44,0.85,2.5,2.1h2.21 c-0.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94,0.42-3.5,1.68-3.5,3.61c0,2.31,1.91,3.46,4.7,4.13c2.5,0.6,3,1.48,3,2.41 c0,0.69-0.49,1.79-2.7,1.79c-2.06,0-2.87-0.92-2.98-2.1h-2.2c0.12,2.19,1.76,3.42,3.68,3.83V21h3v-2.15 c1.95-0.37,3.5-1.5,3.5-3.55C16.5,12.46,14.07,11.49,11.8,10.9z" />
                </svg>
              </div>
              <div className="stat-content">
                <h3>Revenue</h3>
                <div className="stat-value">${stats.revenue.toLocaleString()}</div>
                <div className="stat-change positive">+8.2% from last month</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orders">
                <svg viewBox="0 0 24 24">
                  <path d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z" />
                </svg>
              </div>
              <div className="stat-content">
                <h3>Orders</h3>
                <div className="stat-value">{stats.orders.toLocaleString()}</div>
                <div className="stat-change positive">+5.3% from last week</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon conversions">
                <svg viewBox="0 0 24 24">
                  <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M9,17H7v-7h2V17z M13,17h-2V7h2V17z M17,17h-2v-4h2V17z" />
                </svg>
              </div>
              <div className="stat-content">
                <h3>Conversion</h3>
                <div className="stat-value">{stats.conversions}%</div>
                <div className="stat-change negative">-2.1% from last week</div>
              </div>
            </div>
          </div>

          <div className="dashboard-tabs">
            <div className="tab-header">
              <button
                className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`tab-button ${activeTab === "analytics" ? "active" : ""}`}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </button>
              <button
                className={`tab-button ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`tab-button ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
            </div>

            <div className="tab-content">
              {activeTab === "overview" && (
                <div className="overview-tab">
                  <div className="recent-activity">
                    <div className="section-header">
                      <h2>Recent Activity</h2>
                      <button className="view-all">View All</button>
                    </div>
                    <div className="activity-list">
                      <div className="activity-item">
                        <div className="activity-icon login">
                          <svg viewBox="0 0 24 24">
                            <path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z" />
                          </svg>
                        </div>
                        <div className="activity-content">
                          <h4>New Login</h4>
                          <p>You logged in from a new device</p>
                          <span className="activity-time">Just now</span>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="activity-icon update">
                          <svg viewBox="0 0 24 24">
                            <path d="M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z" />
                          </svg>
                        </div>
                        <div className="activity-content">
                          <h4>Account Updated</h4>
                          <p>Your account information was updated</p>
                          <span className="activity-time">2 hours ago</span>
                        </div>
                      </div>
                      <div className="activity-item">
                        <div className="activity-icon project">
                          <svg viewBox="0 0 24 24">
                            <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M13.96,12.29 l-2.75,3.54l-1.96-2.36L6.5,17h11L13.96,12.29z" />
                          </svg>
                        </div>
                        <div className="activity-content">
                          <h4>Project Created</h4>
                          <p>You created a new project "Website Redesign"</p>
                          <span className="activity-time">Yesterday</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="quick-actions">
                    <div className="section-header">
                      <h2>Quick Actions</h2>
                    </div>
                    <div className="action-grid">
                      <button className="action-card">
                        <svg viewBox="0 0 24 24">
                          <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                        </svg>
                        <span>New Project</span>
                      </button>
                      <button className="action-card">
                        <svg viewBox="0 0 24 24">
                          <path d="M19,3h-4.18C14.4,1.84,13.3,1,12,1S9.6,1.84,9.18,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5 C21,3.9,20.1,3,19,3z M12,3c0.55,0,1,0.45,1,1s-0.45,1-1,1s-1-0.45-1-1S11.45,3,12,3z M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z" />
                        </svg>
                        <span>Create Task</span>
                      </button>
                      <button className="action-card">
                        <svg viewBox="0 0 24 24">
                          <path d="M21,6h-2v9H6v2c0,0.55,0.45,1,1,1h11l4,4V7C22,6.45,21.55,6,21,6z M17,12V3c0-0.55-0.45-1-1-1H3C2.45,2,2,2.45,2,3v14 l4-4h10C16.55,13,17,12.55,17,12z" />
                        </svg>
                        <span>Send Message</span>
                      </button>
                      <button className="action-card">
                        <svg viewBox="0 0 24 24">
                          <path d="M19,8l-4,4h3c0,3.31-2.69,6-6,6c-1.01,0-1.97-0.25-2.8-0.7l-1.46,1.46C8.97,19.54,10.43,20,12,20c4.42,0,8-3.58,8-8h3 L19,8z M6,12c0-3.31,2.69-6,6-6c1.01,0,1.97,0.25,2.8,0.7l1.46-1.46C15.03,4.46,13.57,4,12,4c-4.42,0,8,3.58,8,8h-3l4,4L17,12z" />
                        </svg>
                        <span>Sync Data</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="analytics-tab">
                  <div className="analytics-placeholder">
                    <svg viewBox="0 0 24 24" className="placeholder-icon">
                      <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M9,17H7v-7h2V17z M13,17h-2V7h2V17z M17,17h-2v-4h2V17z" />
                    </svg>
                    <h3>Analytics Dashboard</h3>
                    <p>Detailed analytics will be displayed here</p>
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="projects-tab">
                  <div className="projects-placeholder">
                    <svg viewBox="0 0 24 24" className="placeholder-icon">
                      <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M13.96,12.29 l-2.75,3.54l-1.96-2.36L6.5,17h11L13.96,12.29z" />
                    </svg>
                    <h3>Projects Dashboard</h3>
                    <p>Your projects will be displayed here</p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="settings-tab">
                  <div className="settings-placeholder">
                    <svg viewBox="0 0 24 24" className="placeholder-icon">
                      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
                    </svg>
                    <h3>Settings Dashboard</h3>
                    <p>Account settings will be displayed here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

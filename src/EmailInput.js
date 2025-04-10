"use client"
import { useState, useEffect } from "react"
import "./emailInput.css"

export default ({ onFormUpdate, onClick, onChange, errorText }) => {
  const [email, setEmail] = useState("")
  const [focused, setFocused] = useState(false)
  const [valid, setValid] = useState(true)
  const [animating, setAnimating] = useState(false)

  // Email validation
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      setValid(emailRegex.test(email))
    } else {
      setValid(true)
    }
  }, [email])

  const handleInputChange = (e) => {
    setEmail(e.target.value)
    onFormUpdate({ [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (email && valid) {
      setAnimating(true)
      setTimeout(() => {
        onClick()
      }, 600)
    }
  }

  return (
    <div className="email-container">
      <div className="email-card">
        <div className="card-header">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" className="logo-icon">
                <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
              </svg>
            </div>
          </div>
          <h2>Welcome Back</h2>
          <p>Enter your email to continue</p>
        </div>

        <div className="input-group">
          <div className={`custom-input ${focused ? "focused" : ""} ${!valid && email ? "invalid" : ""}`}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
            />
            <span className={`floating-label ${email || focused ? "active" : ""}`}>Email Address</span>

            {email && (
              <span className={`validation-icon ${valid ? "valid" : "invalid"}`}>
                {valid ? (
                  <svg viewBox="0 0 24 24">
                    <path d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24">
                    <path d="M19,6.41L17.59,5 12,10.59 6.41,5 5,6.41 10.59,12 5,17.59 6.41,19 12,13.41 17.59,19 19,17.59 13.41,12z" />
                  </svg>
                )}
              </span>
            )}
          </div>

          {errorText && <p className="error-message">{errorText}</p>}
          {!valid && email && <p className="validation-message">Please enter a valid email address</p>}
        </div>

        <button
          className={`sign-in-button ${animating ? "animating" : ""} ${!valid || !email ? "disabled" : ""}`}
          type="button"
          onClick={handleSubmit}
          disabled={!valid || !email || animating}
        >
          <span className="button-text">Continue</span>
          <span className="button-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12,4l-1.41,1.41L16.17,11H4v2h12.17l-5.58,5.59L12,20l8-8L12,4z" />
            </svg>
          </span>
          <span className="loading-spinner"></span>
        </button>

        <div className="alternative-options">
          <span className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">or</span>
            <span className="divider-line"></span>
          </span>

          <div className="social-buttons">
            <button className="social-button google">
              <svg viewBox="0 0 24 24">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>

      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
    </div>
  )
}

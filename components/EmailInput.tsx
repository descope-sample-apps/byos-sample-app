"use client"
import { useState, useEffect } from "react"
import "./emailInput.css"

interface EmailInputProps {
  onFormUpdate: (data: Record<string, string>) => void;
  onClick: () => void;
  onChange: () => void;
  errorText?: string;
}

export default function EmailInput({ onFormUpdate, onClick, onChange, errorText }: EmailInputProps) {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    onFormUpdate({ [e.target.name]: e.target.value })
    onChange()
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

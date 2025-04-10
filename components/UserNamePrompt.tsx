"use client"

import type React from "react"

import { useState, useEffect } from "react"
import "./userNamePrompt.css"

interface UserNamePromptProps {
  email?: string
  onSubmit: (name: string) => void
  errorText?: string
  onFormUpdate?: (data: Record<string, string>) => void
  onChange?: () => void
  state?: { error?: { text?: string, code?: string }, screenName?: string, next?: (stepId: string, data?: any) => Promise<void> }
}

export default function UserNamePrompt({ email, onSubmit, errorText, state, onFormUpdate, onChange }: UserNamePromptProps) {
  const [name, setName] = useState("")
  const [focused, setFocused] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [valid, setValid] = useState(true)

  // Name validation
  useEffect(() => {
    if (name) {
      setValid(name.trim().length >= 2)
    } else {
      setValid(true)
    }
  }, [name])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setName(newName)
    if (onFormUpdate) {
      onFormUpdate({ fullName: newName })
    }
    if (onChange) {
      onChange()
    }
  }

  const handleSubmit = () => {
    if (name && valid) {
      setIsSubmitting(true)

      // Store the name in localStorage for persistence
      if (typeof window !== "undefined") {
        localStorage.setItem("user_name", name.trim())
      }

      setTimeout(() => {
        onSubmit(name.trim())
      }, 600)
    }
  }

  return (
    <div className="name-prompt-container">
      <div className="name-prompt-card">
        <div className="card-header">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" className="logo-icon">
                <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,5c1.66,0,3,1.34,3,3s-1.34,3-3,3s-3-1.34-3-3S10.34,5,12,5z M12,19.2c-2.5,0-4.71-1.28-6-3.22c0.03-1.99,4-3.08,6-3.08c1.99,0,5.97,1.09,6,3.08C16.71,17.92,14.5,19.2,12,19.2z" />
              </svg>
            </div>
          </div>
          <h2>Almost Done!</h2>
          <p>Please tell us your name to complete your profile</p>
          {email && <div className="email-display">{email}</div>}
        </div>

        <div className="input-group">
          <div className={`custom-input ${focused ? "focused" : ""} ${!valid && name ? "invalid" : ""}`}>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              required
            />
            <span className={`floating-label ${name || focused ? "active" : ""}`}>Full Name</span>

            {name && (
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
          {!valid && name && <p className="validation-message">Please enter a valid name (at least 2 characters)</p>}
        </div>

        <button
          className={`submit-button ${isSubmitting ? "submitting" : ""} ${!valid || !name ? "disabled" : ""}`}
          type="button"
          onClick={handleSubmit}
          disabled={!valid || !name || isSubmitting}
        >
          <span className="button-text">Complete Profile</span>
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

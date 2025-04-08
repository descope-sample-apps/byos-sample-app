"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import "./authSuccess.css"

interface AuthSuccessProps {
  userName?: string
  onContinue: () => void
}

export default function AuthSuccess({ userName, onContinue }: AuthSuccessProps) {
  const router = useRouter()
  const [animationComplete, setAnimationComplete] = useState(false)
  const [redirectCountdown, setRedirectCountdown] = useState(5)

  // Handle success animation completion
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1500)

    return () => clearTimeout(animationTimer)
  }, [])

  // Auto-redirect countdown
  useEffect(() => {
    if (animationComplete && redirectCountdown > 0) {
      const countdownTimer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1)
      }, 1000)

      return () => clearTimeout(countdownTimer)
    } else if (animationComplete && redirectCountdown === 0) {
      onContinue()
    }
  }, [animationComplete, redirectCountdown, onContinue])

  const displayName = userName || "there"

  return (
    <div className="auth-success-container">
      <div className="auth-success-card">
        <div className={`success-animation ${animationComplete ? "complete" : ""}`}>
          <div className="checkmark-circle">
            <div className="checkmark-circle-bg"></div>
            <div className="checkmark-check"></div>
          </div>
          <div className="success-sparkles">
            <div className="success-sparkle sparkle-1"></div>
            <div className="success-sparkle sparkle-2"></div>
            <div className="success-sparkle sparkle-3"></div>
            <div className="success-sparkle sparkle-4"></div>
            <div className="success-sparkle sparkle-5"></div>
            <div className="success-sparkle sparkle-6"></div>
          </div>
        </div>

        <div className={`success-content ${animationComplete ? "visible" : ""}`}>
          <h2>Authentication Successful!</h2>
          <p className="welcome-message">Welcome back, {displayName}!</p>
          <p className="redirect-message">
            You'll be redirected to your dashboard in <span className="countdown">{redirectCountdown}</span> seconds
          </p>

          <button className="continue-button" onClick={onContinue}>
            <span>Continue to Dashboard</span>
            <svg viewBox="0 0 24 24">
              <path d="M12,4l-1.41,1.41L16.17,11H4v2h12.17l-5.58,5.59L12,20l8-8L12,4z" />
            </svg>
          </button>
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

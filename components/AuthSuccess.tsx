"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import "./authSuccess.css"

interface AuthSuccessProps {
  userName?: string
  onContinue: () => void
}

export default function AuthSuccess({ userName, onContinue }: AuthSuccessProps) {
  const [animationComplete, setAnimationComplete] = useState(false)

  // Handle success animation completion
  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setAnimationComplete(true)
    }, 1500)

    return () => clearTimeout(animationTimer)
  }, [])

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
          <p className="tab-instruction">
            You are now authenticated. You can now close this tab.
          </p>

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

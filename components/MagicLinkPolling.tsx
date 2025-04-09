"use client"

import { useState, useEffect } from "react"
import "./magicLinkPolling.css"

interface MagicLinkPollingProps {
  email: string;
  state: any;
  onResendClick: () => void;
  onBackClick: () => void;
  errorText?: string;
}

export default function MagicLinkPolling({
  email,
  state,
  onResendClick,
  onBackClick,
  errorText,
}: MagicLinkPollingProps) {
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)

  // Countdown timer for resend button
  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !canResend) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  // Simple polling effect
  useEffect(() => {
    // Don't poll if we don't have the next function or if action is ""
    if (!state.next) return;
    if (state.next.action==="") return;
    
    // Set up a simple interval to call next('polling', {}) every 3 seconds
    const pollingInterval = setInterval(() => {
      if (state.next && state.next.action!=="") {
        state.next('polling', {});
      }
    }, 3000); // Poll every 3 seconds
    
    // Clean up on unmount
    return () => {
      clearInterval(pollingInterval);
    };
  }, [state.next]);

  const handleResend = () => {
    if (canResend) {
      setIsResending(true)
      // Call the resend function
      onResendClick()
      // Reset the countdown
      setTimeout(() => {
        setIsResending(false)
        setCanResend(false)
        setCountdown(60)
      }, 1000)
    }
  }

  return (
    <div className="magic-link-container">
      <div className="magic-link-card">
        <div className="card-header">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" className="logo-icon">
                <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
              </svg>
            </div>
          </div>
          <h2>Check Your Email</h2>
          <p>We've sent a magic link to</p>
          <div className="email-display">{email}</div>
        </div>

        <div className="magic-link-animation">
          <div className="envelope">
            <div className="envelope-top"></div>
            <div className="envelope-body"></div>
            <div className="letter">
              <div className="letter-line"></div>
              <div className="letter-line"></div>
              <div className="letter-line"></div>
            </div>
          </div>
          <div className="magic-sparkles">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
          </div>
        </div>

        <div className="instructions">
          <p>Click the link in the email to sign in to your account.</p>
          <p>If you don't see the email, check your spam folder.</p>
        </div>

        {errorText && <p className="error-message">{errorText}</p>}

        <div className="action-buttons">
          <button
            className={`resend-button ${canResend ? "active" : "disabled"} ${isResending ? "resending" : ""}`}
            onClick={handleResend}
            disabled={!canResend || isResending}
          >
            {isResending ? (
              <>
                <span className="button-text">Resending...</span>
                <span className="loading-spinner"></span>
              </>
            ) : canResend ? (
              <span className="button-text">Resend Magic Link</span>
            ) : (
              <span className="button-text">Resend in {countdown}s</span>
            )}
          </button>

          <button className="back-button" onClick={onBackClick}>
            <svg viewBox="0 0 24 24">
              <path d="M20,11H7.83l5.59-5.59L12,4l-8,8l8,8l1.41-1.41L7.83,13H20V11z" />
            </svg>
            <span>Try a different email</span>
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

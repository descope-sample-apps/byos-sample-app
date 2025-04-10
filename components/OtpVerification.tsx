"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import "./otpVerification.css"

interface OtpVerificationProps {
  email: string
  onSubmit: (data: { form: { code: string }, sentTo: { maskedEmail: string } }) => void
  onResendClick: () => void
  onBackClick: () => void
  errorText?: string
  onFormUpdate?: (data: Record<string, string>) => void
  onChange?: () => void
  state?: { error?: { text?: string, code?: string }, screenName?: string, next?: (stepId: string, data?: any) => Promise<void> }
}

export default function OtpVerification({
  email,
  onSubmit,
  onResendClick,
  onBackClick,
  errorText,
  onFormUpdate,
  onChange,
  state,
}: OtpVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Reset OTP input when error is E061102
  useEffect(() => {
    if (state?.error?.code === "E061102") {
      setOtp(Array(6).fill(""))
      setIsSubmitting(false)
    }
  }, [state?.error?.code])

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

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(0, 1)
    setOtp(newOtp)

    // Update form state
    if (onFormUpdate) {
      onFormUpdate({ code: newOtp.join('') })
    }
    if (onChange) {
      onChange()
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key press for backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input when backspace is pressed on empty input
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle paste functionality
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a valid OTP (numbers only)
    if (!/^\d+$/.test(pastedData)) return

    // Fill the OTP fields with pasted data
    const newOtp = [...otp]
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newOtp[i] = pastedData[i]
    }
    setOtp(newOtp)

    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    if (nextEmptyIndex !== -1 && nextEmptyIndex < 6) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[5]?.focus()
    }
  }

  // Handle form submission
  const handleSubmit = () => {
    const otpValue = otp.join("")
    if (otpValue.length === 6) {
      setIsSubmitting(true)
      onSubmit({
        form: {
          code: otpValue
        },
        sentTo: {
          maskedEmail: email
        }
      })

      // Reset submitting state after a delay (in case of error)
      setTimeout(() => {
        setIsSubmitting(false)
      }, 2000)
    }
  }

  // Handle resend click
  const handleResend = () => {
    if (canResend) {
      setIsResending(true)
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
    <div className="otp-container">
      <div className="otp-card">
        <div className="card-header">
          <div className="logo-container">
            <div className="logo-circle">
              <svg viewBox="0 0 24 24" className="logo-icon">
                <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1c1.71,0,3.1,1.39,3.1,3.1V8z" />
              </svg>
            </div>
          </div>
          <h2>Verification Code</h2>
          <p>Enter the 6-digit code sent to</p>
          <div className="email-display">{email}</div>
        </div>

        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : undefined}
              ref={(el) => { inputRefs.current[index] = el }}
              className="otp-input"
              autoFocus={index === 0}
            />
          ))}
        </div>

        {errorText && <p className="error-message">{errorText}</p>}

        <button
          className={`submit-button ${isSubmitting ? "submitting" : ""} ${otp.join("").length !== 6 ? "disabled" : ""}`}
          onClick={handleSubmit}
          disabled={otp.join("").length !== 6 || isSubmitting}
        >
          <span className="button-text">Verify</span>
          <span className="loading-spinner"></span>
        </button>

        <div className="action-links">
          <button
            className={`resend-link ${canResend ? "active" : "disabled"} ${isResending ? "resending" : ""}`}
            onClick={handleResend}
            disabled={!canResend || isResending}
          >
            {isResending ? "Resending..." : canResend ? "Resend code" : `Resend code in ${countdown}s`}
          </button>

          <button className="back-link" onClick={onBackClick}>
            Try a different email
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

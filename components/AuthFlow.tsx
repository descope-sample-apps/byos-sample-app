"use client"

import { useState, useEffect } from "react"
import { Descope } from "@descope/nextjs-sdk"
import { useSession } from "@descope/nextjs-sdk/client"
import { useRouter } from "next/navigation"
import EmailInput from "./EmailInput"
import OtpVerification from "./OtpVerification"
import UserNamePrompt from "./UserNamePrompt"

const emailScreenName = "Welcome Screen"
const verifyScreenName = "Verify OTP"
const nameScreenName = "User Information"

interface FormState {
  email?: string;
  provider?: string;
  code?: string;
}

export default function AuthFlow() {
  const router = useRouter()
  const { isAuthenticated } = useSession()
  const [state, setState] = useState<{ error: { text?: string }, screenName?: string, next?: (stepId: string, data?: any) => Promise<void> }>({ error: {} })
  const [form, setForm] = useState<FormState>({})

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <Descope
      flowId="sign-up-or-in-otp"
      onScreenUpdate={(screenName: string, state: { error: {} }, next: any) => {
        console.log("STATE", screenName, state)
        setState((prevState) => ({ ...prevState, ...state, next, screenName }))

        return screenName === emailScreenName || screenName === verifyScreenName || screenName === nameScreenName
      }}
      onSuccess={() => {
        console.log("success")
        setState((prevState) => ({ ...prevState }))
        router.push("/dashboard")
      }}
    >
      {state?.screenName === emailScreenName &&
        <EmailInput
          onFormUpdate={setForm}
          onClick={async () => {
            if (state.next) {
              await state.next('sign-up-or-in', form)
            }
          }}
          errorText={state?.error?.text}
          onChange={() => {
            setState(prevState => ({ ...prevState }))
          }}
        />}
      {state?.screenName === verifyScreenName &&
        <OtpVerification
          email={form.email || ''}
          onFormUpdate={(data) => {
            setForm(prev => ({ ...prev, ...data }))
          }}
          onSubmit={async (data) => {
            if (state.next) {
              await state.next('submit-otp', { code: data.form.code })
            }
          }}
          onResendClick={async () => {
            if (state.next) {
              await state.next('resend', form)
            }
          }}
          onBackClick={() => {
            if (state.next) {
              state.next('back', {})
            }
          }}
          errorText={state?.error?.text}
          onChange={() => {
            setState(prevState => ({ ...prevState }))
          }}
          state={state}
        />}
      
      {state?.screenName === nameScreenName &&
        <UserNamePrompt
          state={state}
          onFormUpdate={setForm}
          onSubmit={async () => {
            if (state.next) {
              await state.next('submit-name', form)
            }
          }}
          errorText={state?.error?.text}
        />}

    </Descope>
  )
}

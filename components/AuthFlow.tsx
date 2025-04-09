"use client"

import { useState, useEffect } from "react"
import { Descope } from "@descope/nextjs-sdk"
import { useSession } from "@descope/nextjs-sdk/client"
import { useRouter } from "next/navigation"
import EmailInput from "./EmailInput"
import MagicLinkPolling from "./MagicLinkPolling"
import AuthSuccess from "./AuthSuccess"

const passwordScreenName = "Welcome Screen"
const emailScreenName = "Sign Up Or In"
const pollingScreenName = "Magic Link Sent"
const successScreenName = "Verified Successfully"

interface FormState {
  email?: string;
  provider?: string;
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

  const handleGoogleAuth = async () => {
    if (state.next) {
      const googleData = { provider: 'google' };
      setForm({ provider: 'google' });
      // Call next with the Google data
      await state.next('google', googleData);
    }
  };

  return (
    <Descope
      flowId="sign-in-magic-link"
      onScreenUpdate={(screenName: string, state: { error: {} }, next: any) => {
        console.log("STATE", screenName, state)
        setState((prevState) => ({ ...prevState, ...state, next, screenName }))

        return screenName === passwordScreenName || screenName === emailScreenName || screenName === pollingScreenName || screenName === successScreenName
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
          onGoogleClick={handleGoogleAuth}
          errorText={state?.error?.text}
          onChange={() => {
            setState(prevState => ({ ...prevState }))
          }}
        />}
      {state?.screenName === pollingScreenName &&
        <MagicLinkPolling
          email={form.email || ''}
          state={state}
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
        />}

      {state?.screenName === successScreenName &&
        <AuthSuccess
          userName={form.email?.split('@')[0]}
          onContinue={() => {
            router.push("/dashboard")
          }}
        />}

    </Descope>
  )
}

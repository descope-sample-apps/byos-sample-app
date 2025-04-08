"use client"

import { useEffect } from "react"
import { useSession } from "@descope/nextjs-sdk/client"
import { useRouter } from "next/navigation"
import AuthFlow from "@/components/AuthFlow"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated } = useSession()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  return (
    <main>
      <AuthFlow />
    </main>
  )
}

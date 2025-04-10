"use client"

import { useEffect, useState } from "react"
import { useDescope, useSession } from '@descope/nextjs-sdk/client';
import { useRouter } from "next/navigation"
import DashboardUI from "@/components/DashboardUI"

export default function Dashboard() {
  const router = useRouter()
  const { isAuthenticated, isSessionLoading, sessionToken } = useSession()
  const sdk = useDescope()
  const [userData, setUserData] = useState<{ name?: string; email?: string; picture?: string }>({ name: "User", email: "", picture: undefined })

  useEffect(() => {
    if (!isAuthenticated && !isSessionLoading) {
      router.push("/")
      return
    }
  }, [isAuthenticated, isSessionLoading, router, sessionToken])

  const handleLogout = async () => {
    try {
      await sdk.logout()
      router.push("/")
    } catch (error) {
      console.error("Logout failed", error)
    }
  }

  if (isSessionLoading) {
    return <LoadingScreen />
  }

  return <DashboardUI onLogout={handleLogout} />
}

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading your dashboard...</p>

      <style jsx>{`
        .loading-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        }
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(99, 102, 241, 0.3);
          border-radius: 50%;
          border-top-color: #6366f1;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        p {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #4b5563;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

"use client"

export default ({ onFormUpdate, onClick, onChange, errorText }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", height: "fit-content" }}>
        <button
          type="button"
          onClick={() => {
            onFormUpdate({ provider: "google" })
            onClick()
          }}
        >
          Sign In
        </button>
      </div>

      {errorText && <p className="error">{errorText}</p>}
    </div>
  )
}

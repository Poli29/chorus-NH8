import React, { useState } from 'react'

export default function Home() {
  const [verdict, setVerdict] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const file = e.target.elements.file.files[0]
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/verdict", {
      method: "POST",
      body: formData
    })

    const data = await res.json()
    setVerdict(data.verdict || "No verdict returned")
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CHORUS-X™ WebApp</h1>
      <p>Upload a TradingView chart to get a verdict</p>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button type="submit">Analyze</button>
      </form>
      <h3>Verdict:</h3>
      <pre>{verdict}</pre>
    </div>
  )
}
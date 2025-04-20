import React, { useState } from 'react'

type Props = {
  onBackToResults: () => void
  onSubmit: (formData: { name: string; email: string; company: string }) => void
}

export const EmailMeForm = ({ onBackToResults, onSubmit }: Props) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && company) {
      onSubmit({ name, email, company })
      setSubmitted(true)
    }
  }

  return (
    <div className="email-me-form">
      <h2>Email Me the Results</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Company
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </label>
          <div className="form-actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={onBackToResults}>
              Back
            </button>
          </div>
        </form>
      ) : (
        <p>Thanks! We’ll email your results shortly.</p>
      )}
    </div>
  )
}

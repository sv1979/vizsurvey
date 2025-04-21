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
      <h1>Unlock your results.</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            <span className="label-text">Your Name <i>required</i></span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="label-text">Company Email <i>required</i></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span className="label-text">Company Name <i>required</i></span>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </label>
          <div className="navigation">
            <button type="submit">Submit</button>
            {/* <button type="button" onClick={onBackToResults}>
              Back
            </button> */}
          </div>
        </form>
      ) : (
        <p>Thanks! We’ll email your results shortly.</p>
      )}
    </div>
  )
}

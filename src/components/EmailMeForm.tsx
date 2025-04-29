import React, { useEffect, useState } from 'react'

type Props = {
  onSubmit: (formData: { username: string; email: string; company: string }) => void;
  initialData?: {
    username: string;
    email: string;
    company: string;
  } | null;
}

export const EmailMeForm = ({ onSubmit, initialData }: Props) => {
  const [username, setUsername] = useState(initialData?.username || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [submitted, setSubmitted] = useState(false);
  const [emailValid, setEmailValid] = useState<boolean>(true);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const restrictedEmails = ['@gmail.com', '@hotmail.com', '@yahoo.com', '@outlook.com']

  useEffect(() => {
    if (username && email && company && emailValid) {
      setSubmitDisabled(false)
    } else {
      setSubmitDisabled(true)
    }
  }, [username, email, company, emailValid])

  useEffect(() => {
    if (email) {
      setEmailValid(restrictedEmails.every(value => !email.includes(value)))
    } else {
      setEmailValid(true)
    }
  }, [email])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (username && email && company && emailValid) {
      onSubmit({ username, email, company })
      setSubmitted(true)
    }
  }

  return (
    <div className="email-me-form">
      <h1>Save your results.</h1>
      <h2>Fill out the form to save your results and continue to the next assessment.</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label>
            <span className="label-text">Your Name <i>required</i></span>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, '');
                setUsername(filteredValue);
              }}
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

            {!emailValid && <span className="label-error">Please use your company email address.</span>}
          </label>
          <label>
            <span className="label-text">Company Name <i>required</i></span>
            <input
              type="text"
              value={company}
              onChange={(e) => {
                const value = e.target.value;
                const filteredValue = value.replace(/[^a-zA-Z0-9 .]/g, '');
                setCompany(filteredValue);
              }}
              required
            />
          </label>
          <div className="navigation">
            <button type="submit" className="navbutton button-solid-yellow" disabled={submitDisabled}>Submit</button>
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

import EmailConfirmationForm from '@/app/components/EmailConfirmationForm'
import React from 'react'

const EmailConfirmation = async () => {
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      paddingBottom: "50vh"
    }}>
      <EmailConfirmationForm />
    </div>
  )
}

export default EmailConfirmation

import React from 'react'
import Navbar from '../Components/Navbar/Navbar'

const User = () => {
  return (
    <div>
        <Navbar />
        <div className="container mt-5">
            <h1>User Page</h1>
            <p>This is the user page content.</p>
        </div>
    </div>
  )
}

export default User
import React from 'react'
import { NavLink } from 'react-router-dom'
import './error.css'

const Error = (error, cleanError) => {
  return (
    <div className="person-details card">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <h1 className="alert alert-danger">ERROR</h1>
          <h2 className="term">Ой-ей, что-то пошло не так</h2>
        </li>
        <li className="list-group-item">
          <span>{error}</span>
        </li>
        <NavLink
          to="/home/globalfeed/1"
          className="text-center"
          onClick={cleanError}
        >
          <div className="btn btn-primary">Back Home</div>
        </NavLink>
      </ul>
    </div>
  )
}

export default Error

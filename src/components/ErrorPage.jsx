import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div>
            404 Error
            <Link to="/">Go to Home Page</Link>
        </div>
    )
}

export default ErrorPage

import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'

function RedirectPathOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/market' }} />
}

export default RedirectPathOnly

import React from 'react'
import { Link,Outlet } from 'react-router-dom'
const LoginCommon = () => {
  return (
    
    <>
    <div>
      <a><Link to=""></Link></a>
      <a><Link to="register" ></Link></a>
    </div>
    <div>
      <Outlet/>
    </div>
    </>
  )
}

export default LoginCommon

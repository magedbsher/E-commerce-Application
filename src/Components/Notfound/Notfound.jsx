import React from 'react'
import styles from './Notfound.module.css'
import Error from'../../assets/images/error.png'
export default function Notfound() {
  return (
    <>
      <div className='container'>
        <div className='w-50 mx-auto my-5'>
        <img src={Error} className='w-100' alt=''/>
        </div>
      </div>
    </>
  )
}

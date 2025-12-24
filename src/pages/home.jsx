import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='my-24 xl:mt-40 mx-auto max-w-full px-4 xl:px-4 2xl:px-0'>
        <div className='w-full block lg:flex justify-between items-center'>
            <div className='lg:w-2/5'>
                <div className='text-5xl lg:text-9xl '>
                    Home Loading
                </div>
                <div className='my-8 text-base lg:text-xl pe-4'>
                    This is a demo Home Page
                    Please return back to homepage
                </div>
                <div className='my-4 '>
                    <button className='bg-light text-white text-xl px-8 py-3 rounded-full'><Link to='/'>Back to homepage</Link> </button>
                </div>
            </div>
            <div className='text-center text-2xl'>
                <img src='/illustration.png' />
            </div>
        </div>
    </div>
  )
}

export default Home
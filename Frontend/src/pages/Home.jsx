import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div className='bg-[url(urban-traffic-road-with-cityscape_1359-377.avif)] bg-cover bg-bottom h-screen pt-5 flex justify-between flex-col  w-full'>
        {/* <img className='w-40 ml-8 ' src="9a3ca1da-2eeb-4b84-a7e0-05b5f138038f.jpeg" alt="" /> */}
        <h1 className='w-48 text-5xl ml-8 text-white font-bold ' > SAWARI </h1>
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-3xl font-bold'> Get Started with Sawari</h2>
                <Link to="/login" className=' flex item-center  justify-center w-full bg-black text-white py-3 rounded mt-5'> Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
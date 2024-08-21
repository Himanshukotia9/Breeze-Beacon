import React from 'react'

export default function Loader({title}) {
  return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className="flex items-center justify-center bg-cover bg-center bg-no-repeat">
            <div className="text-center bg-weather bg-opacity-50 p-8 mx-4 rounded-lg max-w-md">
                <div className="text-6xl mb-6">
                    <img src='/Images/WeatherIcons.gif?url'/>
                </div>
                <h2 className="text-white text-2xl mb-2">{title}</h2>
                <p className="text-gray-200 text-sm">
                Your current location will be displayed on the App & used for calculating Real-time weather.
                </p>
            </div>
        </div>
    </div>
  )
}

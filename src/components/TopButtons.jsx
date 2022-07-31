import React from 'react'

function TopButtons({ setQuery }) {

    const cities = [
        {
            id: 1,
            title: 'Ankara'
        },
        {
            id: 2,
            title: 'London'
        },
        {
            id: 3,
            title: 'Sydney'
        },
        {
            id: 4,
            title: 'Tokyo'
        },
        {
            id: 5,
            title: 'Toronto'
        },
        {
            id: 6,
            title: 'Paris'
        },
    ]

    return (
        <div className='flex items-center justify-around my-6'>
            {cities.map((city) => (
                <button className='text-white text-lg font-medium ' key={city.id}
                    onClick={() => setQuery({ q: city.title })}
                >
                    {city.title}
                </button>
            ))}
        </div>
    )
}

export default TopButtons
import React, { useState } from 'react'
import { UilSearch, UilMapMarker } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Inputs({ setQuery, units, setUnits }) {

    const [city, setCity] = useState('');

    const handleSearchClick = () => {
        if (city) {
            setQuery({ q: city })
        }
    }

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            toast.info('Fetching users location.')
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success('Location fetched!');
                let lat = position.coords.latitude;
                let lon = position.coords.longitude

                setQuery({ lat, lon })
            })
        }
    }

    const handleUnitsChange = (event) => {
        const selectedUnit = event.currentTarget.name;
        if (units !== selectedUnit) {
            setUnits(selectedUnit);
        }
    }

    return (
        <div className='flex flex-row justify-center my-6'>
            <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
                <input type="text"
                    value={city}
                    onChange={(event) => setCity(event.currentTarget.value)}
                    className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize'
                    placeholder='Search for city' />
                <UilSearch size={25} className="text-white cursor-pointer  hover:scale-125" onClick={handleSearchClick} />
                <UilMapMarker size={25} className="text-white cursor-pointer  hover:scale-125" onClick={handleLocationClick} />
            </div>
            <div className='flex flex-row w1/4 items-center justify-center ml-10'>
                <button name='metric' className='text-xl text-white font-light hover:scale-125' onClick={handleUnitsChange}>
                    °C
                </button>
                <p className='text-white text-xl mx-1'>|</p>
                <button name='imperial' className='text-xl text-white font-light hover:scale-125' onClick={handleUnitsChange}>
                    °F
                </button>
            </div>
        </div>
    )
}

export default Inputs
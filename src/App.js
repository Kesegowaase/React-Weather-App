import { useEffect, useState } from 'react';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState({ q: 'Bursa' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {

    const fetchWeather = async () => {
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for ' + message)
      await getFormattedWeatherData({ ...query, units }).then(data => {
        toast.success(`Succesfully fetched weather for ${data.name}, ${data.country}`)
        setWeather(data)
      });
    }

    fetchWeather();
  }, [query, units])

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 from-cyan-700 to-blue-700`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </div>
      )}
      <ToastContainer autoClose={1000} theme={'colored'} newestOnTop={true} />
    </div>
  );
}

export default App;

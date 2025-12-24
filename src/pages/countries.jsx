import '../assets/flag-icons/css/flag-icons.css';
import { FiChevronRight, FiChevronLeft, FiCheckCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Prefooter from '../components/templates_blocks/preFooter';
import config from '../config';
import Connect from '../components/templates_blocks/connect';

export default function Countries () {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [countriesList, setCountries] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${APP_BASE_URL}academics/country/list`)
      .then(res => {
        const countriesRes = res.data.results;
        setCountries(countriesRes);
        setCount(countriesRes.length);     
        setLoading(false);

      });
  }, []);
  return (
    <>
      {loading
      ? <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light' />
      </div>
      : 
      <div className=' my-6 px-2 xl:px-4 2xl:px-0'>
      <section className=' max-w-full lg:flex mx-auto flex-col justify-center'>
        <div>
          <h1 className='lg:mt-24 font-bold lg:text-4xl mx-auto '>Countries</h1>

        </div>
        <div className='flex w-full items-center mt-10 justify-between'>
          <div className='w-full lg:w-76'>
            <form action=''>
              <label htmlFor='' className='pe-3'>Sort by:</label>
              <select className=' p-2 w-60 2xs:w-78 sm:w-72 lg:w-52 xl:w-56 rounded-md border border-light_black bg-white text-sm border-opacity-60'>
                <option value='Name'>Name</option>
                <option value='programme_count'>No. of Programmes</option>

              </select>
            </form>
          </div>
          <div className=' sm:me-4 hidden w-8/12 lg:w-6/12 xl:w-7/12 sm:block'>
            <hr className='lg:w-full mb-2  text-light_black opacity-80' />

          </div>
          <div className='md:flex items-center gap-x-2 text-light_black opacity-80 sm:w-4/12 lg:w-2/12 hidden '>
            <div><FiCheckCircle /></div>
            <div>{count} countries</div>
          </div>

        </div>
        <div>
          <div className='flex sm:flex-row flex-col gap-x-5 lg:gap-x-0 gap-y-2 my-6 flex-wrap'>
            {countriesList.map((country) => (
              <Link to={`/countries/${country.name}?id=${country.id}&slug=${country.slug}`} state={country}>
                <div className='flex w-64 lg:w-60 xl:w-64 px-4 py-1 gap-x-4 text-base'>
                  <div className={`fi fi-${country.short_code}`} />
                  <div className='text-light'>{country.name}</div>
                  {/* <div className='text-light_black'>(8)</div> */}
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>

      <div className='mx-auto mt-20  max-w-full lg:flex flex-col justify-center'>
      {/* <Prefooter props={ {disciplines: 'law'}}/> */}
      {/* <Connect /> */}
      </div>
    </div>
}

</>
  );
}

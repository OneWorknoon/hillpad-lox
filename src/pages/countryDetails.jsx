import { useParams, useLocation, Link, useSearchParams } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { FiArrowLeft, FiChevronsRight, FiEdit, FiFlag, FiImage, FiHeart, FiShare2 } from 'react-icons/fi';
import { FaGlobeAmericas, FaGraduationCap, FaSchool, FaSuitcaseRolling, FaUserGraduate, FaUsers } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AboutCountry from '../components/country/aboutCountry';
import LivingCost from '../components/country/livingCost';
import CountrySchools from '../components/country/countrySchools';
import Prefooter from '../components/templates_blocks/preFooter';
import config from '../config';
import Connect from '../components/templates_blocks/connect';
import Share from "../components/templates_blocks/share";

export default function CountryDetail () {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const continentList = {
    eu: 'Europe',
    na: 'North America',
    as: 'Asia',
    af: 'Africa',
    sa: 'South America',
    oc: 'Oceania'
  };
  const [info, setInfo] = useState('about');
  const [schools, setSchools] = useState([]);
  const [details, setDetails] = useState({});
  const [pageCount, setPageCount] = useState(1);
  const [count, setCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showShare, setShowShare] = useState(false);


  const id = searchParams.get('id');
  const slug_link = searchParams.get('slug');

  const incrementPageCount = (_count = pageCount) => {
    if (_count <= Math.ceil(count / 20)){
       setPageCount(_count); 
       //console.log('increment', _count);

    }

  };

  const decrementPageCount = () => {
    if (pageCount > 1) {
      setPageCount(pageCount - 1);
    }
  };
  let continent = '';
  const param = useParams();
  const slug = param.name;
  const location = useLocation();
  const props = location.state;

  useEffect(() => {
    const fetchSchools = async () => {
      const response = await axios.get(`${APP_BASE_URL}academics/school/list?country=${props ? props.slug : slug_link}&page=${pageCount}`);
      //console.log('url', `${APP_BASE_URL}academics/school/list?country=${props ? props.slug : slug_link}&page=${pageCount}`)
      //console.log('pageCount', pageCount)
      const data = response.data.results;
      const count = response.data.count;
      setSchools(data);
      setCount(count);
    };
    const fetchCountries = async () => {
      const response = await axios.get(`${APP_BASE_URL}academics/country/detail/${props ? props.id : id}`);
      const data = response.data;
      setDetails(data);
      //console.log(data);
    };
    fetchSchools();
    fetchCountries();
  }, [pageCount, slug, props]);
  function renderInfo (info) {
    if (info === 'about') {
      return <AboutCountry props={details} />;
    }
    if (info === 'schools') {
      return <CountrySchools props={{ schools, count, incrementPageCount }} />;
    }
    if (info === 'costs') {
      return <LivingCost props={details} />;
    }
  }
  if (details.continent) {
    continent = details.continent.toLowerCase();
  }


  return (
    details.name
      ? (
        <div className='mt-24 xl:mt-40 mx-auto max-w-full px-4 xl:px-4 2xl:px-0'>
          {showShare && <Share />}
          <div className='text-light_black flex gap-x-2 text-sm my-10'>
            <Link to='/'><div className='flex gap-x-2 items-center'><span>Home</span><span><FiChevronsRight /> </span></div></Link>
            <Link to='/countries'><div className='flex gap-x-2 items-center'><span>Countries</span><span><FiChevronsRight /> </span></div> </Link>
            <Link to=''><span className='text-light'>{details.name}</span></Link>
          </div>
          <div className=' my-6 md:my-0 xl:my-6 w-full'>
            <div className='flex items-center gap-x-2 text-sm text-light_black'><div><FaGlobeAmericas /> </div><div>{continentList[continent]}</div></div>
            <div>
              <div><h2 className='text-3xl text-light font-bold mt-2 mb-12'>{details.name}</h2></div>
              <div className='flex justify-between'>
                <div className='flex gap-x-6 2xs:gap-x-4 my- md:my-0 xl:my-4 flex-wrap gap-y-4 '>
                  <div className={`flex gap-x-2 items-center py-2 px-4 bg-light_black bg-opacity-5 shadow w-fit rounded-full justify-center ${info === 'about' ? 'text-orange' : 'text-light_black'}`} onClick={() => setInfo('about')}><div><BsInfoCircle /> </div><div className=''>About</div></div>
                  <div className={`flex gap-x-2 items-center py-2 px-4 bg-light_black bg-opacity-5 shadow w-fit rounded-full justify-center ${info === 'schools' ? 'text-orange' : 'text-light_black'}`} onClick={() => setInfo('schools')}><div><FiImage /> </div><div>Schools</div></div>
                  <div className={`flex gap-x-2 items-center py-2 px-4 bg-light_black bg-opacity-5 shadow w-fit rounded-full justify-center ${info === 'costs' ? 'text-orange' : 'text-light_black'}`} onClick={() => setInfo('costs')}><div><FiEdit /> </div><div>Living Cost</div></div>
                </div>
                <div className='md:flex gap-x-4 text-light_black items-center hidden '>
                  <FiHeart  className='cursor-pointer' />
                  <FiShare2 className='cursor-pointer' onClick={() => setShowShare(!showShare)} />
                </div>
              </div>
              <div className='md:flex md:w-full md:justify-between  my-8 md:my-4 xl:my-0 border-t border-light_black border-opacity-10 pt-6 lg:gap-x-6'>
                <div className='md:w-7/12 lg:w-9/12'>
                  {renderInfo(info)}
                </div>
                <aside className='flex flex-column justify-center xs:w-84 2xs:w-88 md:w-5/12 lg:w-96 xl:w-100'>
                  <div className=' rounded-lg lg:p-8 p-8 md:p-4 w-full shadow-2 text-light_black h-fit border-border_white border-2 my-8 md:my-0 md:sticky md:top-32 '>
                    <div className=' border-b border-opacity-20 border-light_black py-4'>
                      <div className='text-xl font-bold text-light_black mb-2'>{details.name}</div>
                      <div className='flex gap-x-2 lg:text-sm'>
                        <div className='flex gap-x-2 items-center'><div><FaGlobeAmericas /> </div><div>{continentList[continent]}</div></div>
                        <div className='flex gap-x-2 items-center '><div><FiFlag /> </div><div>{details.capital}</div></div>
                      </div>
                      <Link to={`/search?country=${details.slug}`} className='flex gap-x-2 items-center  border-light border w-fit px-4 py-2 text-light font-bold rounded-lg my-4'><div><FaGraduationCap /> </div><div>Explore schools</div></Link>
                    </div>
                    <div className='py-4'>
                      <div className='flex gap-x-2 items-center'>
                        <div> <FaUsers /> </div>
                        <div className='font-bold'>{details.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</div>
                        <div className='text-base'>population</div>
                      </div>
                      <div className='flex gap-x-2 items-center'>
                        <div><FaSchool /></div>
                        <div className='font-bold'>{count}</div>
                        <div className='text-base'>Listed Schools</div>
                      </div>
                      <div className='flex gap-x-2 items-center'>
                        <div><FaUserGraduate /></div>
                        <div className='font-bold'>{details.studuents ? details.students.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : 'NIL'}</div>
                        <div className='text-base'>Students</div>
                      </div>
                      <div className='flex gap-x-2 items-center'>
                        <div><FaSuitcaseRolling /></div>
                        <div className='font-bold'>{details.international_students.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</div>
                        <div className='text-base'>International_students</div>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
          <div className='mx-auto mt-20  max-w-full lg:flex flex-col justify-center'>
            <Prefooter props={ {country: details.slug}}/>
          </div>
        </div>
      )
      : (
        <div className='flex justify-center items-center h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light' />
        </div>
      )
  );
}

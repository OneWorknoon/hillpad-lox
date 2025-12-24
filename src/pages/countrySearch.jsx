import Carousel from '../components/courses/carousel';
import FlatCourseCard from '../components/courses/flatCourseCard';
import { FiChevronDown, FiChevronUp, FiFilter } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { GiConsoleController, GiSettingsKnobs } from 'react-icons/gi';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import RangeSlider from '../components/templates_blocks/RangeSlider';
import config from '../config';

export default function CountrySearch ({ props }) {
  const countriesList = useSelector((state) => state.country.countryList);
  const degreeTypes = useSelector((state) => state.degreeTypes.degreeTypesList);
  const currencies = useSelector((state) => state.currencies.currenciesList);

  const [searchParams, setSearchParams] = useSearchParams();

  // const { country_code } = useParams();
  const discipline = searchParams.get('discipline');
  const countryName = searchParams.get('country');
  const APP_BASE_URL = config.VITE_BASE_URL;

  const baseUrl = `${APP_BASE_URL}academics/course/list`;

  const [sortOrder, setSortOrder] = useState('Ascending');
  const [isChecked, setIsChecked] = useState(false);
  const [attendanceChecked, setIsAttendanceChecked] = useState(false);
  const [searchParam, setSearchParam] = useState({ discipline: '', degree_type: [], attendance: [], format: [], duration: [], tuition: '', countries: [] });
  const [clickedDiscipline, setClickedDiscipline] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [countries, setCountries] = useState(countriesList);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(true);

  const url = `${baseUrl}?country=${countryName}&page=${currentPage + 1}&`;

  const fetchData = async (Params = { discipine: '', degree_type: [], attendance: [], format: [], duration: [], tuition: '', countries: [] }) => {
    const degree_type = Params.degree_type;
    const learning = Params.attendance;
    const formatList = Params.format;
    const durationList = Params.duration;
    const tuitionVal = Params.tuition;
    // let chosenCountries = Params.countries
    let url = `${baseUrl}?country=${countryName}&page=${currentPage + 1}&`;

    if (discipline) {
      url = url + `discipline=${discipline}&`;
      //console.log(url);
    }
    if (formatList.length > 0) {
      formatList.map((format) => {
        url = url + `course_format=${format}&`;
        //console.log(url);
      });
    }
    // if (chosenCountries) {

    //     }
    // }
    if (tuitionVal.length > 0) {
      url = url + `tuition=${tuitionVal}&`;
      //console.log(url);
    }
    if (durationList.length > 0) {
      durationList.map((duration) => {
        url = url + `duration=${duration}&`;
        //console.log(url);
      });
    }
    if (discipline && degree_type || discipline && learning) {
      if (degree_type.length > 0) {
        degree_type.map((degree) => {
          url = url + `degree_type=${degree}&`;
        });
        //console.log(url);
      } else if (learning.length > 0) {
        learning.map((style) => {
          url = url + `attendance=${style}&`;
        });
        //console.log(url);
      }
    } else if (degree_type.length > 0) {
      degree_type.map((degree) => {
        url = url + `degree_type=${degree}&`;
      });
      //console.log(url);
    } else if (learning.length > 0) {
      learning.map((style) => {
        url = url + `attendance=${style}&`;
      });
      //console.log(url);
    }

    //console.log(url);
    //console.log(Params);
    const res = await axios.get(url);
    const data = await res.data;
    setCourses(data.results);
    setCount(res.data.count);
    setLoading(true);
    return data;
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleViewChange = (event) => {
    setView(event.target.value);
  };

  const param = useParams();
  const [id, setId] = (param.id) ? useState(param.id) : useState('');
  const disciplinesList = useSelector((state) => state.disciplines.disciplinesList);

  const [count, setCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [disciplines, setDisciplines] = useState([]);

  const sortedCourses = [...courses];
  if (sortOrder === 'ascending') {
    sortedCourses.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === 'descending') {
    sortedCourses.sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleTuition = () => {
    // Get the selected currency (convert to lowercase)
    const userCurrency = selectedCurrency.toLowerCase();

    // Get the currency USD exchange rate
    const selectedUserCurrency = currencies.find(currency => currency.short_code == userCurrency);
    const userCurrencyExchangeRate = selectedUserCurrency.usd_exchange_rate;

    // minTuition, maxTuition * exchange rate == USD value
    const minTuitionUSD = Math.round(minTuition / userCurrencyExchangeRate);
    const maxTuitionUSD = Math.round(maxTuition / userCurrencyExchangeRate);

    // tuitionRange = minTuitionUSD, maxTuitionUSD
    const tuitionRange = `${minTuitionUSD},${maxTuitionUSD}`;

    // const tuitionRange = `${minTuition},${maxTuition}`;
    const anotherParam = { ...searchParam };
    anotherParam.tuition = (tuitionRange);
    setSearchParam(anotherParam);
    //console.log(tuitionRange);
  };

  useEffect(() => {
    const param = searchParam;
    fetchData(param);

    setDisciplines(disciplinesList);
    setCountries(countriesList);
  }, [searchParam, isChecked, attendanceChecked, disciplinesList, searchParams, discipline, url]);

  const duration = ['Less than 1 year', '1 - 2 years', '2 - 3 years', '3 - 4 years', 'More than 4 years'];
  const format = ['Full-time', 'Part-time'];
  const formatDict = {
    'Full-time': 'FULL',
    'Part-time': 'PART'
  };
  const durationDict = {
    'Less than 1 year': '0,364',
    '1 - 2 years': '365,728',
    '2 - 3 years': '729,1095',
    '3 - 4 years': '730,1460',
    'More than 4 years': '1461,-1'
  };
  const [attendance, setAttendance] = useState({
    'Blended Learning': 'BLENDED',
    'Online Learning': 'ONLINE',
    'On Campus Learning': 'SITE'
  });

  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const [showInfo, setShowInfo] = useState(false);
  const [showUndergrad, setUndergradInfo] = useState(false);
  const [showMasters, setMastersInfo] = useState(false);
  const [showDoc, setDocInfo] = useState(false);
  const [showDuration, setDurationInfo] = useState(false);
  const [showAttendance, setAttendanceInfo] = useState(false);
  const [showFormat, setFormatInfo] = useState(false);
  const [showTuition, setTuitionInfo] = useState(true);
  const [minTuition, setMinTuition] = useState(0);
  const [maxTuition, setMaxTuition] = useState(10000); // Set this to the maximum tuition fee

  const [view, setView] = useState('List');

  const [query, setQuery] = useState('');

  const handleOnChange = (event) => {
    const selectedDegreeType = parseInt(event.target.value);
    setIsChecked(!isChecked);

    // Create a new object with the updated degree_type array
    const newParam = {
      ...searchParam,
      degree_type: searchParam.degree_type.includes(selectedDegreeType)
        ? searchParam.degree_type.filter((type) => type !== selectedDegreeType)
        : [...searchParam.degree_type, selectedDegreeType]
    };

    // Set the state with the new object
    setSearchParam(newParam);
  };

  const handleAttendanceChange = (event) => {
    const selectedAttendance = event.target.value;
    setIsAttendanceChecked(!attendanceChecked);

    // Clone the current searchParam object
    const latestParam = { ...searchParam };

    if (!latestParam.attendance) {
      latestParam.attendance = []; // Initialize attendance as an empty array if it doesn't exist
    }

    if (latestParam.attendance.includes(selectedAttendance)) {
      // If selected, remove it
      latestParam.attendance = latestParam.attendance.filter((type) => type !== selectedAttendance);
      //console.log('removed attendance');
    } else {
      // If not selected, add it
      latestParam.attendance.push(selectedAttendance);
      //console.log('added attendance');
    }

    // Update the searchParam state
    setSearchParam(latestParam);
  };
  const handlePageChange = (data) => {
    const selected = data.selected + 1;
    setCurrentPage(selected);
    fetchData(searchParam);
  };
  const handleFormatChange = (event) => {
    const latestParam = { ...searchParam };
    if (!latestParam.format) {
      latestParam.format = []; // Initialize attendance as an empty array if it doesn't exist
    }
    const selectedFormat = event.target.value;

    if (latestParam.format.includes(selectedFormat)) {
      latestParam.format = latestParam.format.filter((type) => type !== selectedFormat);
    } else {
      latestParam.format.push(selectedFormat);
      //console.log('added format');
    }
    setSearchParam(latestParam);
  };

  const handleDurationChange = (event) => {
    const latestParam = { ...searchParam };
    if (!latestParam.duration) {
      latestParam.duration = []; // Initialize attendance as an empty array if it doesn't exist
    }
    const selectedDuration = event.target.value;

    if (latestParam.duration.includes(selectedDuration)) {
      latestParam.duration = latestParam.duration.filter((type) => type !== selectedDuration);
    } else {
      latestParam.duration.push(selectedDuration);
      //console.log('added duration');
    }
    setSearchParam(latestParam);
  };

  return (
    <div className='w-screen'>
      <div className='lg:flex flex-row mt-24 justify-start w-screen max-w-full mb-10 mx-auto'>
        <aside className='hidden lg:block px-8 shadow-2 py-4 lg:w-100 h-fit sticky left-0 top-24  bg-white max-w-full'>
          <div className='text-orange text-center text-xl lg:text-3xl font-bold mb-4 flex items-center gap-x-6 justify-center'><div>Filters</div> <span><GiSettingsKnobs /></span></div>
          <div className=' h-fit '>
            <div className=''>
              <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setShowInfo(!showInfo); }}><div>Disciplines</div>  <button className=''>
                {showInfo ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                            </button>
              </div>
              <div className='flex gap-x-8 h-fit'>
                <div className=' border-s h-100 mt-2 mb-6' />
                <div className={showInfo ? 'block py-4' : 'hidden'}>
                  {disciplines.map((discipline) => (
                    <Link
                        key={discipline.slug}
                        to={`/search?country=${countryName}&discipline=${discipline.slug}`}
                        onClick={() => setClickedDiscipline(discipline.slug)}
                      >
                        <div
                            className={`flex gap-x-2 py-2 text-sm text-light_black ${clickedDiscipline === discipline.slug || searchParams.get('discipline') === discipline.slug ? 'text-orange' : ''}`}
                          >
                            <div onClick={() => { setId(discipline.id); const latestParam = { ...searchParam }; latestParam.discipline = (discipline.id); setSearchParam(latestParam); }}>
                                <span className='flex items-center gap-x-1 gap-y-2'>
                                <i className={`fa fa-${discipline.icon}`} aria-hidden='true' />
                                <div className='text-sm'> {discipline.name}</div>
                              </span>
                              </div>
                          </div>
                      </Link>
                  ))}

                </div>
              </div>
            </div>
            <div className='block'>
              <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setUndergradInfo(!showUndergrad); }}><div>Undergraduates</div>  <button className=''>
                {showUndergrad ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                          </button>
              </div>
              <div className={showUndergrad ? 'block py-4' : 'hidden'}>
                {degreeTypes.filter(function (degrees) { return degrees.programme_type.id === 7; }).map((degree) => (
                  <div key={degree.id} className='flex gap-x-2 pb-1 text-sm text-light_black'>
                    <input
                        type='checkbox'
                        id=''
                        name=''
                        value={degree.id}
                        checked={searchParam.degree_type.includes(degree.id)}
                        onChange={handleOnChange}
                      />
                    <label htmlFor=''> <span className='flex items-center gap-x-1'>
                        <div className='text-xs'> <span>{degree.short_name ? degree.short_name : ''}</span> {degree.name} </div>
                                         </span>
                      </label>
                  </div>
                ))}
              </div>
            </div>
            <div className='block'>
              <div className='text-lg  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setMastersInfo(!showMasters); }}><div>Masters</div>  <button className=''>
                {showMasters ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                               </button>
              </div>
              <div className={showMasters ? 'block py-4' : 'hidden'}>
                {degreeTypes.filter(function (degrees) { return degrees.programme_type.id === 8; }).map((degree) => (
                  <div key={degree.id} className='flex gap-x-2 pb-1 text-sm text-light_black'> <input
                    type='checkbox'
                    id=''
                    name=''
                    value={degree.id}
                    checked={searchParam.degree_type.includes(degree.id)}
                    onChange={handleOnChange}
                                                                                               />
                    <label htmlFor=''> <span className='flex items-center gap-x-1'>
                        <div className='text-xs'> <span>{degree.short_name ? degree.short_name : ''}</span> {degree.name} </div>
                                         </span>
                      </label>
                  </div>
                ))}
              </div>
            </div>
            <div id='shortcourse' className='block'>

              <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setDocInfo(!showDoc); }}><div>Doctorate</div>  <button className=''>
                {showDoc ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                        </button>
              </div>
              <div className={showDoc ? 'block py-4' : 'hidden'}>
                {degreeTypes.filter(function (degrees) { return degrees.programme_type.id === 9; }).map((degree) => (
                  <div key={degree.id} className='flex gap-x-2'>
                    <input
                        type='checkbox'
                        id=''
                        name=''
                        value={degree.id}
                        checked={searchParam.degree_type.includes(degree.id)}
                        onChange={handleOnChange}
                      />
                    <label htmlFor=''> <span className='flex items-center gap-x-1'>
                        <div className='text-xs'><span>{degree.short_name ? degree.short_name : ''}</span> {degree.name} </div>
                                         </span>
                      </label>
                  </div>
                ))}
              </div>

            </div>
            <div>
              <div className='text-lg  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setDurationInfo(!showDuration); }}>
                <div>Duration</div>
                <button className=''>
                  {showDuration ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={showDuration ? 'block' : 'hidden'}>

                {duration.map((duration, index) => (
                  <div key={index} className='flex gap-x-2'>

                    <div className='flex gap-x-2'>
                        <input
                            type='checkbox'
                            id=''
                            name=''
                            value={durationDict[duration]}
                            checked={searchParam.duration.includes(durationDict[duration])}
                            onChange={handleDurationChange}
                          />
                      </div>
                    <label htmlFor=''> {duration}
                      </label>
                  </div>

                ))}
              </div>
            </div>
            <div>
              <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setTuitionInfo(!showTuition); }}>
                <div>Tuition</div>
                <button className=''>
                  {showTuition ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={showTuition ? 'block my-2' : 'hidden'}>
                <div className='mb-2'>
                  <select
                    className='currency-select'
                    id='currency'
                    name='currency'
                    value={selectedCurrency}
                    onChange={(e) => {
                        setSelectedCurrency(e.target.value);
                      }}
                  >
                    {currencies.map((currency) => (
                        <option key={currency.short_code} value={currency.short_code}>
                            {currency.short_code.toUpperCase()} - {currency.name}
                          </option>
                      ))}

                  </select>

                </div>

                <div className='flex gap-x-2 gap-y-4 flex-col '>

                  <RangeSlider
                    min={0}
                    max={100000}
                    values={[minTuition, maxTuition]}
                    setValues={(values) => {
                        setMinTuition(values[0]);
                        setMaxTuition(values[1]);
                      }}
                  />

                  <button className='text-orange font-semibold  hover:border-2 hover:border-orange  w-28 mx-auto py-2 px-1 hover:text-orange' onClick={handleTuition}>APPLY</button>
                </div>
              </div>
            </div>
            {/* <div>
              <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setAttendanceInfo(!showAttendance); }}><div>Attendance</div>  <button className=''>
                {showAttendance ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                                       </button>
              </div>
              <div className={showAttendance ? 'block py-4' : 'hidden'}>

                {Object.keys(attendance).map((key) => (
                  <div key={key} className='flex gap-x-2'>

                    <div className='flex gap-x-2'>
                        <input
                            type='checkbox'
                            id=''
                            name=''
                            value={attendance[key]}
                            checked={searchParam.attendance.includes(attendance[key])}
                            onChange={handleAttendanceChange}
                          />
                      </div>
                    <label htmlFor=''> {key}
                      </label>
                  </div>

                ))}
              </div>
            </div> */}
            <div>
              <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setFormatInfo(!showFormat); }}><div>Format</div>
                <button className=''>
                  {showFormat ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={showFormat ? 'block border-b border-light_black border-opacity-20' : 'hidden'}>
                {format.map((format) => (
                  <div key={format} className='flex gap-x-2 text-xs '>
                    <div className='flex gap-x-2'>
                        <input
                            type='checkbox'
                            id=''
                            name=''
                            value={formatDict[format]}
                            checked={searchParam.format.includes(formatDict[format])}
                            onChange={handleFormatChange}
                          />
                      </div>
                    <label htmlFor='' className='text-sm'> {format}
                      </label>
                  </div>
                ))}
              </div>
            </div>
            <div className='my-8 hidden'>
              <button className=' text-orange border-orange border py-2 px-4 rounded-full hidden lg:block'>Filter</button>
            </div>
          </div>

        </aside>
        {
                    !showFilterBar
                      ? <aside className='lg:block px-8 shadow-2 py-4 lg:w-100 h-fit sticky left-0 top-24  bg-white max-w-full'>
                        <div className='text-orange text-center text-xl lg:text-3xl font-bold mb-4 flex items-center gap-x-6 justify-center'><div>Filters</div> <span><GiSettingsKnobs /></span></div>
                        <div className=' h-fit '>
                          <div className=''>
                            <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setShowInfo(!showInfo); }}><div>Disciplines</div>  <button className=''>
                              {showInfo ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                                          </button>
                            </div>
                            <div className='flex gap-x-8 h-fit'>
                              <div className=' border-s h-100 mt-2 mb-6' />
                              <div className={showInfo ? 'block py-4' : 'hidden'}>
                                {disciplines.map((discipline) => (
                                  <Link
                                    key={discipline.slug}
                                    to={`/search?country=${countryName}&discipline=${discipline.slug}`}
                                    onClick={() => setClickedDiscipline(discipline.slug)}
                                  >
                                    <div
                                      className={`flex gap-x-2 py-2 text-sm text-light_black ${clickedDiscipline === discipline.slug || searchParams.get('discipline') === discipline.slug ? 'text-orange' : ''}`}
                                    >
                                      <div onClick={() => { setId(discipline.id); const latestParam = { ...searchParam }; latestParam.discipline = (discipline.id); setSearchParam(latestParam); }}>
                                  <span className='flex items-center gap-x-1 gap-y-2'>
                                    <i className={`fa fa-${discipline.icon}`} aria-hidden='true' />
                                    <div className='text-sm'> {discipline.name}</div>
                                  </span>
                                </div>
                                    </div>
                                  </Link>
                                ))}

                              </div>
                            </div>
                          </div>
                          <div className='block'>
                            <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setUndergradInfo(!showUndergrad); }}><div>Udergraudates</div>  <button className=''>
                              {showUndergrad ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                                        </button>
                            </div>
                            <div className={showUndergrad ? 'block py-4' : 'hidden'}>
                              {degreeTypes.filter(function (degrees) { return degrees.programme_type.id === 6; }).map((degree) => (
                                <div key={degree.id} className='flex gap-x-2 pb-1 text-sm text-light_black'>
                                  <input
                                    type='checkbox'
                                    id=''
                                    name=''
                                    value={degree.id}
                                    checked={searchParam.degree_type.includes(degree.id)}
                                    onChange={handleOnChange}
                                  />
                                  <label htmlFor=''> <span className='flex items-center gap-x-1'>
                                    <div className='text-xs'> <span>{degree.short_name ? degree.short_name : ''}</span> {degree.name} </div>
                                  </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className='block'>
                            <div className='text-lg  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setMastersInfo(!showMasters); }}><div>Masters</div>  <button className=''>
                              {showMasters ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                                             </button>
                            </div>
                            <div className={showMasters ? 'block py-4' : 'hidden'}>
                              {degreeTypes.filter(function (degrees) { return degrees.programme_type.id === 5; }).map((degree) => (
                                <div key={degree.id} className='flex gap-x-2 pb-1 text-sm text-light_black'> <input
                                  type='checkbox'
                                  id=''
                                  name=''
                                  value={degree.id}
                                  checked={searchParam.degree_type.includes(degree.id)}
                                  onChange={handleOnChange}
                                                                                                             />
                                  <label htmlFor=''> <span className='flex items-center gap-x-1'>
                                    <div className='text-xs'> <span>{degree.short_name ? degree.short_name : ''}</span> {degree.name} </div>
                                  </span>
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div id='shortcourse' className='block'>

                            <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setDocInfo(!showDoc); }}><div>Doctorate</div>  <button className=''>
                              {showDoc ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                                      </button>
                            </div>
                            <div className={showDoc ? 'block py-4' : 'hidden'}>
                              {degreeTypes.filter(function (degrees) { return degrees.programme_type.id === 4; }).map((degree) => (
                                <div key={degree.id} className='flex gap-x-2'>
                                  <input
                                    type='checkbox'
                                    id=''
                                    name=''
                                    value={degree.id}
                                    checked={searchParam.degree_type.includes(degree.id)}
                                    onChange={handleOnChange}
                                  />
                                  <label htmlFor=''> <span className='flex items-center gap-x-1'>
                                    <div className='text-xs'><span>{degree.short_name ? degree.short_name : ''}</span> {degree.name} </div>
                                  </span>
                                  </label>
                                </div>
                              ))}
                            </div>

                          </div>
                          <div>
                            <div className='text-lg  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setDurationInfo(!showDuration); }}>
                              <div>Duration</div>
                              <button className=''>
                                {showDuration ? <FiChevronUp /> : <FiChevronDown />}
                              </button>
                            </div>
                            <div className={showDuration ? 'block' : 'hidden'}>

                              {duration.map((duration, index) => (
                                <div key={index} className='flex gap-x-2'>

                                  <div className='flex gap-x-2'>
                                    <input
                                      type='checkbox'
                                      id=''
                                      name=''
                                      value={durationDict[duration]}
                                      checked={searchParam.duration.includes(durationDict[duration])}
                                      onChange={handleDurationChange}
                                    />
                                  </div>
                                  <label htmlFor=''> {duration}
                                  </label>
                                </div>

                              ))}
                            </div>
                          </div>
                          <div>
                            <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setTuitionInfo(!showTuition); }}>
                              <div>Tuition</div>
                              <button className=''>
                                {showTuition ? <FiChevronUp /> : <FiChevronDown />}
                              </button>
                            </div>
                            <div className={showTuition ? 'block my-2' : 'hidden'}>
                              <div className='mb-2'>
                                <select
                                  className='currency-select'
                                  id='currency'
                                  name='currency'
                                  value={selectedCurrency}
                                  onChange={(e) => {
                                    setSelectedCurrency(e.target.value);
                                  }}
                                >
                                  {currencies.map((currency) => (
                                    <option key={currency.short_code} value={currency.short_code}>
                                      {currency.short_code.toUpperCase()} - {currency.name}
                                    </option>
                                  ))}

                                </select>

                              </div>

                              <div className='flex gap-x-2 gap-y-4 flex-col '>

                                <RangeSlider
                                  min={0}
                                  max={100000}
                                  values={[minTuition, maxTuition]}
                                  setValues={(values) => {
                                    setMinTuition(values[0]);
                                    setMaxTuition(values[1]);
                                  }}
                                />

                                <button className='text-orange font-semibold  hover:border-2 hover:border-orange  w-28 mx-auto py-2 px-1 hover:text-orange' onClick={handleTuition}>APPLY</button>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setAttendanceInfo(!showAttendance); }}><div>Attendance</div>  <button className=''>
                              {showAttendance ? <FiChevronUp /> : <FiChevronDown />}
                                                                                                                                                                                                                     </button>
                            </div>
                            <div className={showAttendance ? 'block py-4' : 'hidden'}>

                              {Object.keys(attendance).map((key) => (
                                <div key={key} className='flex gap-x-2'>

                                  <div className='flex gap-x-2'>
                                    <input
                                      type='checkbox'
                                      id=''
                                      name=''
                                      value={attendance[key]}
                                      checked={searchParam.attendance.includes(attendance[key])}
                                      onChange={handleAttendanceChange}
                                    />
                                  </div>
                                  <label htmlFor=''> {key}
                                  </label>
                                </div>

                              ))}
                            </div>
                          </div>
                          <div>
                            <div className='text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between' onClick={() => { setFormatInfo(!showFormat); }}><div>Format</div>
                              <button className=''>
                                {showFormat ? <FiChevronUp /> : <FiChevronDown />}
                              </button>
                            </div>
                            <div className={showFormat ? 'block border-b border-light_black border-opacity-20' : 'hidden'}>
                              {format.map((format) => (
                                <div key={format} className='flex gap-x-2 text-xs '>
                                  <div className='flex gap-x-2'>
                                    <input
                                      type='checkbox'
                                      id=''
                                      name=''
                                      value={formatDict[format]}
                                      checked={searchParam.format.includes(formatDict[format])}
                                      onChange={handleFormatChange}
                                    />
                                  </div>
                                  <label htmlFor='' className='text-lg'> {format}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className='my-8 hidden'>
                            <button className=' text-orange border-orange border py-2 px-4 rounded-full hidden lg:block'>Filter</button>
                          </div>
                        </div>

                      </aside>
                      : <aside className='hidden' />
            }
        <div className=' flex w-full'>
          <div className='mb-4 w-full px-4'>
            <h1 className='text-3xl w-fit'>{countryName.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Courses</h1>
            <div className='w-full'>
              <div className='flex gap-x-2 justify-between md:gap-x-4 items-center text-light_black w-full'>
                <div className='flex justify-between gap-x-4 my-4 items-center w-full  lg:w-5/12'>
                  {/* <span> View: </span>
                  <select
                    className='focus:outline-none p-2 rounded-md bg-white border border-light_black border-opacity-30 w-20 md:w-32' value={view}
                    onChange={handleViewChange}
                  >
                    <option value='List'>List</option>

                  </select> */}
                  <div>
                    <span>Order: </span>
                    <select
                        className='focus:outline-none p-2 rounded-md bg-white border  border-light_black border-opacity-30  w-20 md:w-32' value={sortOrder}
                        onChange={handleSortChange}
                        >
                          <option value='random' >Random</option>
                          <option value='ascending' >Ascending</option>
                          <option value='descending'>Descending</option>
                      </select>
                  </div>

                </div>
                <div className='text-md text-light_black hidden md:flex gap-x-8 items-center w-8/12'>
                  <hr className=' opacity-30 w-28  md:w-40 lg:w-4/5  ' />
                  <div className='flex gap-x-2'>
                    <span>{count}</span>
                    <span>results</span>
                  </div>

                </div>
              </div>
              <div className='flex justify-start w-full max-w-full'>
                <div className=' w-full max-w-full'>
                  {sortedCourses.length > 0
                    ? <div className='flex flex-col w-full gap-y-4'>
                        {sortedCourses.map((degree, index) => (<FlatCourseCard key={index} prop={degree} />))}

                        </div>
                    : loading ?<div>
                          <div className='text-center text-light_black'> No results. But we've got a lot more! Modify your filters or make a 
                            <a href='http://hillpad.com/coursefinder?name=&country=Where?' className=' ps-2 text-light'>fresh start.</a>
                          </div>
                          <h2 className='text-light text-4xl text-center my-4 font-semibold '>Other interesting programmes for you</h2>
                            <Carousel />
                      </div>
                      :
                      <div className='flex justify-center items-center h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light' />
        </div>
                      }
                </div>
              </div>
            </div>

          </div>

        </div>

        <div>
          {!showFilter
            ? <div className='flex gap-x-2 bg-light text-white p-3 fixed z-20 bottom-0 w-full justify-center items-center lg:hidden' onClick={() => { setShowFilter(!showFilter); setShowFilterBar(!showFilterBar); }}>
              <div>
                <FiFilter />
              </div>
              <div>Filter</div>
            </div>
            : <div className='flex gap-x-2 bg-light text-white p-3 fixed z-20 bottom-0 w-full justify-center items-center lg:hidden' onClick={() => { setShowFilter(!showFilter); setShowFilterBar(!showFilterBar); }}>
              <div>Show {count} results</div>
            </div>}
        </div>
      </div>
      <ReactPaginate
        previousLabel={<FaChevronLeft />}
        nextLabel={<FaChevronRight />}
        breakLabel='...'
        breakClassName='break-me'
        pageCount={Math.ceil(count / 20)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName='flex gap-x-6 mx-auto text-center items-center justify-center mb-2 text-2xl text-orange '
        subContainerClassName='pages pagination'
        activeClassName='text-black border-2 p-2'
      />
    </div>
  );
}

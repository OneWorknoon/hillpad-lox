import { FiCalendar, FiChevronsRight, FiClock, FiLock, FiMapPin, FiStar, FiUnlock } from 'react-icons/fi';
import hero from '../assets/images/harvard.jpg';
import { FaCoins, FaFlagCheckered, FaPaperPlane, FaRainbow, FaSchool } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Prefooter from '../components/templates_blocks/preFooter';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AiOutlineTeam } from 'react-icons/ai';
import config from '../config';
import Connect from '../components/templates_blocks/connect';
import {  useDispatch } from 'react-redux';
import { showLoginModal, hideLoginModal } from '../../src/redux/loginSlice.js';

export default function SchoolDetails () {
  const param = useParams();
  const slug = param.slug;
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(user.isLoggedIn);
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get(`${APP_BASE_URL}academics/school/detail/${slug}`).then((res) => {
      const schoolData = res.data;
      setData(schoolData);
      setLoading(false);
      setIsLoggedIn(user.isLoggedIn);
    }).catch((err) => {
    });
  }, [isLoggedIn, user.isLoggedIn]);
  const month = {
    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May ',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
  };
  const dispatch = useDispatch();
  const handleAddToWishlist = (courseId) => {
    if (!user.email) {
      dispatch(showLoginModal());
    } else {
      // Logic to add to wishlist when user is logged in
      console.log("Adding course", courseId, "to wishlist");
    }
  };

  const [info, setInfo] = useState('background');
  const [showBg, setShowBg] = useState(true);
  const [showAdmission, setshowAdmission] = useState(false);
  const [showStructure, setShowStructure] = useState(false);

  // function renderInfo(info) {
  //     if (info === 'background') {
  //         return <Background prop={data} />
  //     }
  //     if (info === 'requirements') {
  //         return <AdmissionReq prop={data} />
  //     }
  //     if (info === 'programme') {
  //         return <ProjectStructure prop={data} />
  //     }
  // }

  const buttons = document.querySelectorAll('.courseButton');
  const selectedButton = buttons[0];

  // function buttonClick(button) {
  //     if (selectedButton) {
  //         selectedButton.classList.remove('text-white');
  //         selectedButton.classList.remove('bg-orange');
  //     }
  //     button.classList.add('bg-orange');
  //     button.classList.add('text-white');
  //     selectedButton = button

  // }

  // for (let i = 0; i < buttons.length; i++) {
  //     buttons[i].addEventListener("click", function () {
  //         buttonClick(this);
  //     });
  // }

  return (
    <>
      {loading
        ? <div className='flex justify-center items-center h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light' />
        </div>
        : <div>
          {/* ----------------------------- Desktop View  ----------------------------------- */}

          <div className='w-screen my-20 xl:px-4 hidden lg:block'>
            <div className='w-full text-lg '>
              <div className='xl:flex mx-auto bg-no-repeat bg-cover bg-center text-white absolute -z-10 ' style={{ width: '100vw', height: '600px', background: `url(${data.banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center 30%' }}>
                <div className='w-full bg-black bg-opacity-60' style={{ height: '600px' }} />
              </div>
              <div className='flex justify-between w-full max-w-full mx-auto xl:mx-4 2xl:mx-auto'>
                <div className=' py-20 xl:w-9/12'>
                  <section className='mx-auto flex flex-col max-w-full text-white ' style={{ minHeight: '800px !important' }}>
                    <div className='max-w-full w-full mx-auto mt-6 w-max-full'>
                        <div className='w-full'>

                            <div className='w-full items-center mt-40'>
                                  <div className='flex items-center gap-x-4'>
                                    <div className='w-32'>
                                        <img src={data.logo} alt={data.name} />
                                      </div>
                                    <div>
                                        {/* <div className='my-2 text-2xl'>
                                                            <h2>{data.name}</h2>
                                                        </div> */}
                                        <div className='max-w-lg '>
                                            <h1 className='text-5xl font-bold leading-tight'>
                                                {data.name}
                                              </h1>
                                          </div>
                                      </div>
                                  </div>

                                </div>

                          </div>

                      </div>
                  </section>

                  <section className='w-full mx-auto max-w-full text-light_black xl:mx-4 mt-52'>
                    <div className='w-full'>
                        <h2 className='text-3xl mt-72 text-black font-semibold'>About </h2>
                        <div className='my-6'>

                            <div className='mt-3'>

                                  <p dangerouslySetInnerHTML={{ __html: data.about }} />
                                </div>
                          </div>

                        {/* <a href='' className='text-light underline py-1'>Show more</a> */}

                      </div>

                  </section>
                </div>
                <aside className='w-100 lg:flex flex-col py-20 items-end'>
                  <div className='sticky' style={{ top: '12rem', zIndex: '5' }}>

                    <div className=' rounded-none card shadow-2 w-88 bg-white h-fit p-2 text-light_black flex flex-col justify-between '>
                        <div className='w-88'>
                            {/* <iframe width="350" height="190" src="https://www.youtube.com/embed/Uk4xjhq2QjE?si=dOn-PbbIEo3aTcfZ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
                            <iframe width='350' height='190' src={data.video} title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' allowFullScreen />

                          </div>
                        <div>
                            <h3 className='font-semibold text-lg px-4'>{data.name}</h3>
                            <div className='text-sm px-4'>
                                  <div className='flex items-center gap-x-2'><span><FiMapPin /></span><span>{data.city} {data.country.name}</span></div>
                                  <div className='flex items-center gap-x-2'><span><FiStar /></span><span>4.4 (53 Reviews)</span></div>
                                  <div />
                                </div>
                          </div>
                        <div className='flex items-center gap-x-2 px-4 text-light_black border-b border-light_black border-opacity-30 py-2'>
                            {/* <span className='text-xl text-light_black'><FaCoins /></span>
                                                <span className='text-light_black'>Tution: </span>
                                                <span className='font-semibold text-2xl'>{data.tuition_fee > 1 ? data.tuition_fee.toLocaleString() : 0}</span> <span> {data.tuition_currency ? data.tuition_currency.short_code.toUpperCase() : null}</span> */}
                          </div>
                        <div className='flex flex-col gap-y-2 py-2 px-4 font-semibold text-opacity-40'>
                            <div className='flex items-center gap-x-2'><span><FaSchool /></span><span className='text-sm font-normal'>Institution Type: </span><span>{data.institution_type}</span></div>
                            <div className='flex items-center gap-x-2'><span><AiOutlineTeam /></span><span className='text-sm font-normal'>Undergraduates: </span><span>{data.courses_undergraduates}</span></div>
                            <div className='flex items-center gap-x-2'><span><AiOutlineTeam /></span><span className='text-sm font-normal'>Postgraduates: </span><span>{data.courses_postgraduates}</span></div>
                            <div className='flex items-center gap-x-2'><span><AiOutlineTeam /></span><span className='text-sm font-normal'>Short Courses: </span><span>{data.courses_shortcourses}</span></div>
                            <div className='flex items-center gap-x-2'><span><AiOutlineTeam /></span><span className='text-sm font-normal'>Total: </span><span>{data.courses_total}</span></div>

                          </div>
                        <div className='py-3'>
                            
                                                    
                                                      <a href={`/coursefinder?name=&country=Where?&school_slug=${data.slug}`} target='_blank' rel='noreferrer'>
                                                        <button className='bg-orange px-4 py-3 rounded-md w-full text-white flex items-center gap-x-2 justify-center'>
                                                          <span className='text-white font-semibold'>View School Courses</span>
                                                          <div><FiUnlock className='font-bold text-lg' /></div>
                                                        </button>

                                                      </a>
                                                     
                                                

                          </div>
                      </div>
                  </div>

                </aside>

              </div>

              <div className='w-full max-w-full mx-auto my-10 xl:mx-4 2xl:mx-auto 2xl:px-4'>
              <Prefooter props={{school: data.slug }} onAddToWishlist={handleAddToWishlist}/>
                {/* <Connect /> */}
             

              </div>
            </div>

          </div>

          {/* ----------------------------- Mobile View  ----------------------------------- */}
          <div className='w-screen lg:hidden'>
            <div className='flex mx-auto items-center justify-center bg-no-repeat bg-cover bg-center text-white  mt-16 relative' style={{ width: '100vw', height: '400px',background: `url(${data.banner})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div className='flex flex-col  mt-52 w-full'>
                <div className='flex  justify-center mx-auto w-full'>

                  <div className=' card shadow-2 w-72 2xs:w-88 bg-white p-4 h-fit rounded-lg text-light_black flex flex-col justify-between '>
                    <div>
                        <h3 className='font-semibold text-2xl'>{data.name}</h3>
                        <div className='text-sm'>
                            <div className='flex items-center gap-x-2'><span><FiMapPin /></span><span>{data.city} {data.country.name}</span></div>
                            {/* <div className='flex items-center gap-x-2'><span><FiStar /></span><span>4.4 (53 Reviews)</span></div> */}
                            <div />
                          </div>
                      </div>
              
                    <div className='flex flex-col gap-y-2 py-2 font-semibold text-opacity-40'>
                        <div className='flex items-center gap-x-2'><span><FiClock /></span><span className='text-xs font-normal'>Institution Type: </span><span>{data.institution_type}</span></div>
                        <div className='flex items-center gap-x-2'><span><FaPaperPlane /></span><span className='text-xs font-normal'>Undergraduates: </span><span>{data.courses_undergraduates}</span></div>
                        <div className='flex items-center gap-x-2'><span><FaPaperPlane /></span><span className='text-xs font-normal'>Postgraduates: </span><span>{data.courses_postgraduates}</span></div>
                        <div className='flex items-center gap-x-2'><span><FaPaperPlane /></span><span className='text-xs font-normal'>Short Courses: </span><span>{data.courses_shortcourses}</span></div>
                        <div className='flex items-center gap-x-2'><span><FaPaperPlane /></span><span className='text-xs font-normal'>Total: </span><span>{data.courses_total}</span></div>
                        <div className='flex items-center gap-x-2'><span><FaFlagCheckered /></span><span className='text-xs font-normal'>Year Established: </span><span>{data.year_established}</span></div>

                      </div>
                    <div className='py-3'>
                        {
                                                isLoggedIn
                                                  ? <a href={`/coursefinder?name=&country=Where?&school_slug=${data.slug}`} target='_blank' rel='noreferrer'>
                                                    <button className='bg-orange px-4 py-3 rounded-md w-full text-white flex items-center gap-x-2 justify-center'>
                                                      <span className='text-white font-semibold'>View School Courses</span>
                                                      <div><FiUnlock className='font-bold text-lg' /></div>
                                                    </button>

                                                  </a>
                                                  : <button className='bg-orange px-4 py-3 rounded-md w-full text-white flex items-center gap-x-2 justify-center'>
                                                    <span className='text-white font-semibold'>View School Courses</span>
                                                    <div><FiLock className='font-bold text-lg' /></div>
                                                  </button>
                                            }

                      </div>
                  </div>
                </div>

              </div>
            </div>

            <section className='w-full mx-2 max-w-full mt-28  text-light_black px-2'>
              <div className='w-full'>
                <div>
                  <h2 className='font-semibold text-black text-2xl mb-6'>About School</h2>
                </div>
                <div className='myStyle' dangerouslySetInnerHTML={{ __html: data.about }} />
              </div>

            </section>

            <div className='w-full  my-10 flex  justify-center px-4 '>
              <Prefooter props={{school: data.slug }} onAddToWishlist={handleAddToWishlist}/>

            </div>
          </div>
        </div>}
    </>

  );
}

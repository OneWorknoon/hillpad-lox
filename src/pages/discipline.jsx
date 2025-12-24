
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import DisciplinesList from '../components/templates_blocks/disciplineList';
import config from '../config';
import Connect from '../components/templates_blocks/connect';

export default function Disciplines() {
  const [disciplines, setDisciplines] = useState([]);
  const [count, setCount] = useState(0);
  const APP_BASE_URL = config.VITE_BASE_URL;

  const disciplinesList = useSelector((state) => state.disciplines.disciplinesList);

  useEffect(() => {
    if (disciplinesList.length > 0) {
      setDisciplines(disciplinesList);
      setCount(disciplinesList.length);
      //console.log('redux discipline called');
    } else {
      axios.get(`${APP_BASE_URL}academics/discipline/list`)
        .then(res => {
          const disciplineRes = res.data.results;
          setDisciplines(disciplineRes);
          setCount(res.data.count);
        })
        .catch(err => {
          //console.log(err);
        });
    }
  }, []);


  return (
    <div className='w-screen mx-auto mt-20'>
      <section className='w-screen bg-light flex justify-center items-center' style={{ width: '100vw', height: '500px', background: `url(${'/explore.jpg'})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='text-7xl font-bold text-light text-center'>
          Browse By Discipines
        </div>
      </section>

      <section className='w-full max-w-full mx-auto'>
        <div>
          <h1 className='lg:mt-24 font-bold lg:text-4xl mx-auto '>Browse By Disciplines</h1>
        </div>
        <DisciplinesList />
      </section>

      {/* <section className='w-full max-w-full mx-auto'>
        <Connect />
      </section> */}

    </div>
  );
}

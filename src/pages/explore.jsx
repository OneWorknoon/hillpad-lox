import Carousel from '../components/courses/carousel';
import Connect from '../components/templates_blocks/connect';
import DisciplinesList from '../components/templates_blocks/disciplineList';
import config from '../config';

export default function Explore () {
  return (
    <div className='w-screen mx-auto mt-20'>
      <section className='w-screen bg-light flex justify-center items-center' style={{ width: '100vw', height: '500px', background: `url(${'/explore.jpg'})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className='text-7xl font-bold text-light text-center'>
          Explore Online Courses <br /> and Programs
        </div>
      </section>
      
      <section className='w-screen max-w-full mx-auto mt-8 '>
        <div className=' lg:mx-4  font-bold text-2xl  md:text-3xl lg:text-5x text-center lg:font-semibold lg:text-5xl'>
          Browse By <span className='text-orange'>Programme</span>
        </div>
        <div className='w-full '>
          <Carousel />
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

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export default function Background ({ prop }) {
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const param = useParams();
  const courses = useSelector((state) => state.courses.coursesList);
  let disciplines = {};

  const month = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May ',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };

  if (prop) {
    disciplines = prop.disciplines;
  }

  return (
    <div className="mb-4">
      <div className='mt-6 mb-4'>
      <h2 className='font-semibold text-light_black text-2xl'>Basic Information</h2>
      </div>
      <div className='py-4 flex items-center'>
        <h3 className=' text-lg me-32'>Discipline</h3>
        <div className='text-base flex '>
          {
                        disciplines.map((discipline, index) => {
                          return (
                            <div key={index} className='text-light bg-orange bg-opacity-5 p-2 rounded-2xl'>
                              {discipline.name}
                            </div>
                          );
                        })
                    }
        </div>

      </div>
      <div className='flex items-center '>
        <h3 className='  text-lg me-32 '>Language</h3>
        <div className='text-base text-light bg-orange bg-opacity-5 p-2 rounded-2xl'>
          {prop.language.name}
        </div>

      </div>
      <div className='flex items-center'>
        <h3 className=' text-lg me-16' >Programme Type</h3>
        <div className='my-3 text-base text-light bg-orange bg-opacity-5 p-2 rounded-2xl'>
          {prop.programme_type.name}
        </div>

      </div>
      {/* <div className='lg:font-semibold mt-4 text-base'>
        <h3 className='text-light text-lg'>Dates and Deadlines</h3>
        <div className='my-3'> <span>Application Deadline: </span>
          {month[prop.course_dates.deadline_month]} {prop.course_dates.deadline_year}
        </div>
        <div className='my-3'> <span>Session Starts: </span>
          {month[prop.course_dates.start_month]} {prop.course_dates.start_year}
        </div>

      </div> */}
    </div>

  );
}

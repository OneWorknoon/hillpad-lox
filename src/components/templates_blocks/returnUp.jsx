import { FiArrowUp } from 'react-icons/fi';
export default function ReturnUp () {
  return (
    <button className='fixed bottom-4 sm:left-[95.5%] left-[89.5%] me-2 lg:me-24 rounded-full bg-orange text-white p-3 shadow-lg' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <FiArrowUp />
    </button>
  );
}

import { FiCheckCircle } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight, FaSort } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";

export default function CountrySchools({ props }) {
  const { schools, count, incrementPageCount, decrementPageCount } = {
    ...props
  };
  const [currentPage, setCurrentPage] = useState(1);
  const totalSchools = schools.length; // Assuming 'schools' contains all schools
  const schoolsPerPage = 20;
  const totalPages = Math.ceil(totalSchools / schoolsPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Here, you would also fetch the schools for the new page
  };

  useEffect(() => {
    

  }, [currentPage])
  
  const handlePageChange = (data) => {
    const selected = data.selected + 1;
    setCurrentPage(selected);
    incrementPageCount(selected)
   
  };

  // Calculate the schools to display based on the current page
  const indexOfLastSchool = currentPage * schoolsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - schoolsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);
  return (
    <div>
      <div className="flex w-full md:w-full items-center md:justify-between lg:mt-0 md:gap-x-0">
        <div className="w-full md:w-48 xl:w-74">
          <form
            action=""
            className="flex gap-x-2 items-center md:text-sm md:w-48 lg:w-72"
          >
            <div>
              <FaSort />
            </div>
            <label htmlFor="" className="pe-3">
              Sort by:
            </label>
            <select className=" p-2 w-48 2xs:w-50 md:w-24 xl:w-44 rounded-md border border-light_black bg-white text-sm border-opacity-60">
              <option value="Name">Name</option>
              <option value="programme_count">No. of Programmes</option>
            </select>
          </form>
        </div>
        <div className="mx-8 md:mx-0 w-72 lg:w-74 xl:w-80 hidden md:block">
          <hr className=" md:block xl:w-full mb-2  text-light_black opacity-20" />
        </div>
        <div className="hidden md:flex items-center gap-x-2 text-light_black opacity-80 w-2/12 md:w-80 lg:w-40 font-medium">
          <div>
            <FiCheckCircle />
          </div>
          <div>
            {count} schools
          </div>
        </div>
      </div>
      <div className="my-6 flex flex-wrap gap-4 justify-start lg:justify-between">
        {schools.map((school, index) =>
          <Link to={`/school/${school.slug}`}>
            <div className="p-4 border  w-full sm:w-44 md:w-50 lg:w-50 xl:w-64 2xl:w-65 text-sm flex flex-col gap-y-2 card shadow-2">
              <div>
                {school.courses_bachelors} Undergraduate
              </div>
              <div>
                {school.courses_masters} Masters
              </div>
              <div>
                {school.courses_doctorates} Doctorates
              </div>
              <a href={props.slug} className="text-orange text-base my-2">
                {school.name}
              </a>
            </div>
          </Link>
        )}
      </div>
      <div className="flex justify-center text-lg text-light mx-auto w-full">
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
      />      </div>
    </div>
  );
}

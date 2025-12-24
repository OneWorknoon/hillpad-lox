import { FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { GiConsoleController, GiSettingsKnobs } from "react-icons/gi";
import FlatCourseCard from "../components/courses/flatCourseCard";
import Carousel from "../components/courses/carousel";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import RangeSlider from "../components/templates_blocks/RangeSlider";
import config from "../config";
import Modal from "react-modal";

export default function SearchPage({ props }) {
  const countriesList = useSelector((state) => state.country.countryList);
  const currencies = useSelector((state) => state.currencies.currenciesList);
  const disciplinesList = useSelector(
    (state) => state.disciplines.disciplinesList
  );
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const courseName = searchParams.get("name");

  const [count, setCount] = useState(0);
  const [courses, setCourses] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [sortOrder, setSortOrder] = useState("Ascending");
  const [isChecked, setIsChecked] = useState(false);
  const [attendanceChecked, setIsAttendanceChecked] = useState(false);
  const [searchParam, setSearchParam] = useState({
    discipline: "",
    programme: "",
    duration: [],
    tuition: "",
    format: "",
    countries: [],
    page: 1
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [countries, setCountries] = useState(countriesList);
  const [loading, setLoading] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(true);
  const [showTuition, setTuitionInfo] = useState(true);
  const [minTuition, setMinTuition] = useState(0);
  const [maxTuition, setMaxTuition] = useState(10000);
  const [showDuration, setDurationInfo] = useState(false);
  const [showInfo, setShowInfo] = useState("");
  const [showFormat, setFormatInfo] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [subMenu, setSubMenu] = useState(false);
  const params = new URLSearchParams(searchParams);
  console.log("params", params.get("discipline"));

  const fetchData = async () => {
    const entries = Array.from(params.entries());
    let finalUrl = `${APP_BASE_URL}academics/course/list?published=true&ordering=random&`;
    entries.forEach(([key, value]) => {
      if (value && !value.toLowerCase().includes("where")) {
        finalUrl += `${key}=${value}&`;
      }
    });
    console.log(finalUrl);

    const res = await axios.get(finalUrl);
    const data = await res.data;
    setCourses(data.results);
    setCount(res.data.count);
    setLoading(true);

    return data;
  };

  const handleCountrySelect = (country) => {
    setSelectedCountries([country]);
    const countryCode = country.slug;
    console.log("countryCode", countryCode);
    setSearchParam((prevParam) => ({ ...prevParam, countries: [countryCode] }));
    updateSearchParams("country", countryCode);
  };

  const handleCountryDeselect = (deselectedCountry) => {
    setSelectedCountries((prevCountries) => {
      const updatedCountries = prevCountries.filter(
        (country) => country !== deselectedCountry
      );
      const countryCode = updatedCountries.map((country) => country.slug);
      setSearchParam((prevParam) => ({ ...prevParam, countries: countryCode }));
      updateSearchParams("country", countryCode.join(","));
      return updatedCountries;
    });
  };

  const handleSearchChange = (event) => {
    setSearchCountry(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchCountry.toLowerCase())
  );

  // Set this to the maximum tuition fee

  const sortedCourses = [...courses];

  if (sortOrder === "ascending") {
    sortedCourses.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOrder === "descending") {
    sortedCourses.sort((a, b) => b.name.localeCompare(a.name));
  }

  const handleTuition = () => {
    // Get the selected currency (convert to lowercase)
    const userCurrency = selectedCurrency.toLowerCase();

    // Get the currency USD exchange rate
    console.log("selectedCurrency", selectedCurrency);

    const selectedUserCurrency = currencies.find(
      (currency) => currency.short_code == userCurrency
    );
    const userCurrencyExchangeRate = selectedUserCurrency.usd_exchange_rate;
    let minTuitionUSD = minTuition;
    let maxTuitionUSD = maxTuition;
    if (userCurrencyExchangeRate) {
      // minTuition, maxTuition * exchange rate == USD value
      minTuitionUSD = Math.round(minTuition / userCurrencyExchangeRate);
      maxTuitionUSD = Math.round(maxTuition / userCurrencyExchangeRate);
    }

    // tuitionRange = minTuitionUSD, maxTuitionUSD
    const tuitionRange = `${minTuitionUSD},${maxTuitionUSD}`;

    // const tuitionRange = `${minTuition},${maxTuition}`;
    const anotherParam = { ...searchParam };
    anotherParam.tuition = tuitionRange;
    updateSearchParams("tuition", tuitionRange);
  };

  useEffect(() => {
    fetchData();

    setDisciplines(disciplinesList);
    setCountries(countriesList);
  }, [searchParams, disciplinesList, countriesList]);

  const customStyles = {
    overlay: {
      backgroundColor: "rgb(37 36 36 / 75%)",
      margin: '0',
      width: '100vw',
      height: '100vh',
      overflowY: 'scroll',
      zIndex: 9999999,
    },
    content: {
      top: '0',
      right: '0',
      left: 'auto',
      bottom: "100%",
      width: "100%",
      height: "100%",
      zIndex: 9999999,
      backgroundColor: "white",
      color: "black",
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
    },
};

  const duration = [
    "Less than 1 year",
    "1 - 2 years",
    "2 - 3 years",
    "3 - 4 years",
    "More than 4 years"
  ];
  const format = ["Full Time", "Part Time"];
  const formatDict = {
    "Full Time": "FULL",
    "Part Time": "PART"
  };
  const durationDict = {
    "Less than 1 year": "0,364",
    "1 - 2 years": "365,728",
    "2 - 3 years": "729,1095",
    "3 - 4 years": "730,1460",
    "More than 4 years": "1461,-1"
  };

  const revDurationDict = {
     "0,364": "Less than 1 year",
    "365,728": "1 - 2 years",
    "729,1095": "2 - 3 years",
     "730,1460": "3 - 4 years",
     "1461,-1": "More than 4 years"
  };

  const isCategorySelected = (category, value) => {
    const params = new URLSearchParams(searchParams);
    return params.get(category) === value;
  };

  const handleFormatChange = (event) => {
    const selectedFormat = event.target.value;

    setSearchParam((prevParam) => ({
      ...prevParam,
      format: [selectedFormat] // Only one format can be selected at a time
    }));

    updateSearchParams("course_format", selectedFormat);
  };
  const handlePageChange = (data) => {
    const selected = data.selected + 1;
    setCurrentPage(selected);
    updateSearchParams("page", selected);
  };

  const handleDurationChange = (event) => {
    const selectedDuration = event.target.value;
    updateSearchParams("duration", selectedDuration);
  };

  const updateSearchParams = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  // Example usage for different categories
  const handleCategoryClick = (category, value) => {
    updateSearchParams(category, value);
  };

  return (
    <div className="w-screen">
      <div className="lg:flex flex-row mt-24 justify-start w-screen max-w-full mb-10 mx-auto">
        <aside className="hidden lg:block px-8 shadow-2 py-4 lg:w-100 h-fit sticky left-0 top-24  bg-white max-w-full">
          <div className="text-orange text-center text-xl lg:text-3xl font-bold mb-4 flex items-center gap-x-6 justify-center">
            <div>Filters</div>{" "}
            <span>
              <GiSettingsKnobs />
            </span>
          </div>
          <div className=" h-fit ">
            <div className="">
              <div
                className="text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between"
                onClick={() => {
                  setShowInfo(!showInfo);
                }}
              >
                <div>Disciplines</div>{" "}
                <button className="">
                  {showInfo ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              { showInfo && (
              <div className="flex border-light_black border-opacity-5 border-2 shadow-inner drop-shadow-xl h-64 overflow-y-auto custom-scrollbar">
                <div className=" h-100 mb-0" />
                <div className={"block w-full text-light_black" }>
                  {disciplines.map((discipline) => (
                    <div
                      className={`flex w-full items-center gap-x-2 gap-y-2 p-2 text-sm cursor-pointer ${isCategorySelected("discipline", discipline.slug) ? 'text-light' : 'text-light_black'} hover:text-white hover:bg-light`}
                      key={discipline.id}
                      onClick={() =>
                        handleCategoryClick("discipline", discipline.slug)
                      }

                    >
                      <i
                        className={`fa fa-${discipline.icon}`}
                        aria-hidden="true"
                      />
                      <div className="text-sm hover:text-white"> {discipline.name} </div>
                    </div>
                  ))}
                </div>
              </div>
              )}
            </div>
            <div className="block">
              <div
                className="text-lg py-2 cursor-pointer flex gap-x-28 border-t border-light_black border-opacity-20 justify-between"
                onClick={() => {
                  handleCategoryClick("programme", "undergraduate");
                }}
                style={{
                  color: isCategorySelected("programme", "undergraduate")
                    ? "red"
                    : "inherit"
                }}
              >
                <div>Undergraduates</div> <button className=""> </button>
              </div>
            </div>

            <div className="block">
              <div
                className="text-lg  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                onClick={() => {
                  handleCategoryClick("programme", "postgraduate");
                }}
                style={{
                  color: isCategorySelected("programme", "postgraduate")
                    ? "red"
                    : "inherit"
                }}
              >
                <div>Graduates</div> <button className=""> </button>
              </div>
            </div>

            <div className="block">
              <div
                className="text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                onClick={() => {
                  handleCategoryClick("programme", "Short Courses");
                }}
                style={{
                  color: isCategorySelected("programme", "Short Courses")
                    ? "red"
                    : "inherit"
                }}
              >
                <div>Short Courses</div> <button className=""> </button>
              </div>
            </div>

            <div className="block">
              <div
                className="text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                onClick={() => {
                  handleCategoryClick("programme", "Executive Education");
                }}
                style={{
                  color: isCategorySelected("programme", "Executive Education")
                    ? "red"
                    : "inherit"
                }}
              >
                <div>Executive Education</div>
                <button className=""> </button>
              </div>
            </div>

            <div className="block">
              <div
                className="text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                onClick={() => {
                  handleCategoryClick("programme", "Certificate Courses");
                }}
                style={{
                  color: isCategorySelected("programme", "Certificate Courses")
                    ? "red"
                    : "inherit"
                }}
              >
                <div>Certificate Courses</div> <button className=""> </button>
              </div>
            </div>

            <div>
              <div
                className="text-lg  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                onClick={() => {
                  setDurationInfo(!showDuration);
                }}
              >
                <div>Duration</div>
                <button className="">
                  {showDuration ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={showDuration ? "block" : "hidden"}>
                {duration.map((duration, index) => (
                  <div key={index} className="flex gap-x-2">
                    <div className="flex gap-x-2">
                      <input
                        type="checkbox"
                        id=""
                        name=""
                        value={durationDict[duration]}
                        checked={isCategorySelected(
                          "duration",
                          durationDict[duration]
                        )}
                        onChange={handleDurationChange}
                      />
                    </div>
                    <label htmlFor=""> {duration}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div
                className="text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between"
                onClick={() => {
                  setTuitionInfo(!showTuition);
                }}
              >
                <div>Tuition</div>
                <button className="">
                  {showTuition ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div className={showTuition ? "block my-2" : "hidden"}>
                <div className="mb-2">
                  <select
                    className="currency-select"
                    id="currency"
                    name="currency"
                    value={selectedCurrency}
                    onChange={(e) => {
                      setSelectedCurrency(e.target.value);
                    }}
                  >
                    {currencies.map((currency) => (
                      <option
                        key={currency.short_code}
                        value={currency.short_code}
                      >
                        {currency.short_code.toUpperCase()} - {currency.name}
                      </option>
                    ))}
                    <option value="USD" selected>
                      USD - United States Dollar
                    </option>
                  </select>
                </div>

                <div className="flex gap-x-2 gap-y-4 flex-col ">
                  <RangeSlider
                    min={0}
                    max={100000}
                    values={[minTuition, maxTuition]}
                    setValues={(values) => {
                      setMinTuition(values[0]);
                      setMaxTuition(values[1]);
                    }}
                  />

                  <button
                    className="text-orange font-semibold  hover:border-2 hover:border-orange  w-28 mx-auto py-2 px-1 hover:text-orange"
                    onClick={handleTuition}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div
                className="text-lg py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between"
                onClick={() => {
                  setFormatInfo(!showFormat);
                }}
              >
                <div>Format</div>
                <button className="">
                  {showFormat ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              </div>
              <div
                className={
                  showFormat
                    ? "block border-b border-light_black border-opacity-20"
                    : "hidden"
                }
              >
                {format.map((format) => (
                  <div key={format} className="flex gap-x-2 text-lg ">
                    <div className="flex gap-x-2">
                      <input
                        type="checkbox"
                        id=""
                        name=""
                        value={formatDict[format]}
                        checked={searchParam.format.includes(
                          formatDict[format]
                        )}
                        onChange={handleFormatChange}
                      />
                    </div>
                    <label htmlFor="" className="text-base">
                      {" "}
                      {format}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="my-8 hidden">
              <button className=" text-orange border-orange border py-2 px-4 rounded-full hidden lg:block">
                Filter
              </button>
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between">
              <div>Countries</div>
            </div>
            <div className="w-full flex gap-x-2 flex-col">
              {selectedCountries.map((selectedCountry, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={selectedCountry.slug}
                    name={selectedCountry.slug}
                    checked
                    onChange={() => handleCountryDeselect(selectedCountry)}
                  />
                  <label
                    htmlFor={selectedCountry.code}
                    className="mx-3 text-lg text-light_black"
                  >
                    {selectedCountry.name}
                  </label>
                </div>
              ))}
              <input
                type="text"
                placeholder="Search countries..."
                value={searchCountry}
                className="w-full border border-light_black p-1 mb-2 cursor-pointer"
                onChange={handleSearchChange}
              />
              <div className="h-40 overflow-y-scroll">
                {filteredCountries.map((country, index) => (
                  <div
                    className="cursor-pointer hover:text-orange"
                    key={index}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
        {!showFilterBar && (
         <Modal
         closeTimeoutMS={500}
         isOpen={!showFilterBar}
         style={customStyles}
         contentLabel="WishLists"
         shouldCloseOnOverlayClick={true}
     >
      { showInfo === '' &&
            <aside className="lg:block px-8 shadow-xl py-4 lg:w-100 h-fit sticky left-0 bottom-full bg-light_grey bg-opacity-90 rounded-xl max-w-full mx-2 border-2 border-white ">
              <div className="text-orange text-center text-xl lg:text-3xl font-bold mb-4 flex items-center gap-x-6 justify-center">
                <div>Filters</div>{" "}
                <span>
                  <GiSettingsKnobs />
                </span>
              </div>
              <div className=" h-fit ">
                <div className="">
                  <div
                    className="text-base py-2 flex align-middle border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                    onClick={() => {
                      setShowInfo("discipline");
                      setSubMenu(true);
                    }}
                  >
                    <div>Disciplines</div>{" "}
                    <div className="text-light">
                      {/* {showInfo ? <FiChevronUp /> : <FiChevronDown />} */}
                      {params.get("discipline")
                        ? params
                            .get("discipline")
                            .replace(/-/g, " ")
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="block">
                  <div
                    className="text-base py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                    onClick={() => {
                      handleCategoryClick("programme", "undergraduate");
                    }}
                    style={{
                      color: isCategorySelected("programme", "undergraduate")
                        ? "red"
                        : "inherit"
                    }}
                  >
                    <div>Undergraduate</div> <button className="" />
                  </div>
                </div>
                <div className="block">
                  <div
                    className="text-lg  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                    onClick={() => {
                      handleCategoryClick("programme", "graduate");
                    }}
                    style={{
                      color: isCategorySelected("programme", "postgraduate")
                        ? "red"
                        : "inherit"
                    }}
                  >
                    <div>Graduate</div> <button className="" />
                  </div>
                </div>
                <div className="block">
                  <div
                    className="text-base  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                    onClick={() => {
                      handleCategoryClick("programme", "Short Courses");
                    }}
                    style={{
                      color: isCategorySelected("programme", "Short Courses")
                        ? "red"
                        : "inherit"
                    }}
                  >
                    <div>Short Courses</div> <button className="" />
                  </div>
                </div>
                <div className="block">
                  <div
                    className="text-base  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                    onClick={() => {
                      handleCategoryClick("programme", "Executive Education");
                    }}
                    style={{
                      color: isCategorySelected("programme", "Executive Education")
                        ? "red"
                        : "inherit"
                    }}
                  >
                    <div>Executive Education</div> <button className="" />
                  </div>
                </div>
                <div className="block cursor-pointer">
                  <div
                    className="text-base  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between cursor-pointer"
                    onClick={() => {
                      handleCategoryClick("programme", "Certificate Courses");
                    }}
                    style={{
                      color: isCategorySelected("programme", "Certificate Courses")
                        ? "red"
                        : "inherit"
                    }}
                  >
                    <div>Certificate Courses</div> <button className="" />
                  </div>
                </div>

                <div>
                  <div
                    className="text-base  py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between"
                    onClick={() => {
                      setShowInfo("duration");
                      setSubMenu("true")
                      
                    }}
                  >
                    <div>Duration</div>
                    <div className="text-light">
                    {params.get("duration")
                        ? revDurationDict[params.get("duration")]
                        : ""}
                    </div>
                  </div>
                 
                </div>
                <div>
                  <div
                    className="text-base py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between"
                    onClick={() => {
                      setTuitionInfo(!showTuition);
                    }}
                  >
                    <div>Tuition</div>
                    <button className="">
                      {showTuition ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </div>
                  <div className={showTuition ? "block my-2" : "hidden"}>
                  <div className="mb-2">
                  <select
                    className="currency-select"
                    id="currency"
                    name="currency"
                    value={selectedCurrency}
                    onChange={(e) => {
                      setSelectedCurrency(e.target.value);
                    }}
                  >
                    {currencies.map((currency) => (
                      <option
                        key={currency.short_code}
                        value={currency.short_code}
                      >
                        {currency.short_code.toUpperCase()} - {currency.name}
                      </option>
                    ))}
                    <option value="USD" selected>
                      USD - United States Dollar
                    </option>
                  </select>
                </div>

                    <div className="flex gap-x-2 gap-y-4 flex-col ">
                      <RangeSlider
                        min={0}
                        max={100000}
                        values={[minTuition, maxTuition]}
                        setValues={(values) => {
                          setMinTuition(values[0]);
                          setMaxTuition(values[1]);
                        }}
                      />

                      <button
                        className="text-orange font-semibold  hover:border-2 hover:border-orange  w-28 mx-auto py-2 px-1 hover:text-orange"
                        onClick={handleTuition}
                      >
                        APPLY
                      </button>
                    </div>
                  </div>
                </div>

                <div className="my-8 hidden">
                  <button className=" text-orange border-orange border py-2 px-4 rounded-full hidden lg:block">
                    Filter
                  </button>
                </div>

                <div>
            <div className="text-lg font-semibold py-2 flex gap-x-28 border-t border-light_black border-opacity-20 justify-between">
              <div>Countries</div>
            </div>
            <div className="w-full flex gap-x-2 flex-col">
              {selectedCountries.map((selectedCountry, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={selectedCountry.slug}
                    name={selectedCountry.slug}
                    checked
                    onChange={() => handleCountryDeselect(selectedCountry)}
                  />
                  <label
                    htmlFor={selectedCountry.code}
                    className="mx-3 text-lg text-light_black"
                  >
                    {selectedCountry.name}
                  </label>
                </div>
              ))}
              <input
                type="text"
                placeholder="Search countries..."
                value={searchCountry}
                className="w-full border border-light_black p-1 mb-2"
                onChange={handleSearchChange}
              />
              <div className="h-40 overflow-y-scroll">
                {filteredCountries.map((country, index) => (
                  <div
                    className="cursor-pointer hover:text-orange"
                    key={index}
                    onClick={() => handleCountrySelect(country)}
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
              </div>
              <div className="flex mt-4 justify-between">
                <button className="px-10 py-2 border-2 rounded-lg  "
                  onClick={() => {
                    setSearchParams(new URLSearchParams());
                    setSearchParam({
                      discipline: "",
                      programme: "",
                      duration: [],
                      tuition: "",
                      format: "",
                      countries: []
                    });
                    window.history.replaceState({}, document.title, window.location.pathname);
                  }}
                >
                  Reset
                </button>
                <button className="px-10 py-2 rounded-lg bg-light text-white  "
                  onClick={() => {setShowFilterBar(!showFilterBar);}}
                >
                  Done
                </button>
              </div>
            </aside>
        }
            {subMenu && (
              <aside className="lg:block py-2 px-4 shadow-xl  lg:w-100 h-fit sticky left-0 top-24 bg-light_grey bg-opacity-90 rounded-xl max-w-full mx-2 border-2 border-white ">
                {showInfo === "discipline" && (
                  <div className="h-fit">
                    <div className=" mt-2" />
                    <h2 className=" text-center text-2xl">Disciplines</h2>
                    <div className={showInfo ? " py-4" : "hidden"}>
                      {disciplines.map((discipline) => (
                        <div
                          key={discipline.id}
                          onClick={() =>
                            handleCategoryClick("discipline", discipline.slug)
                          }
                          className="my-2"
                          style={{
                            color: isCategorySelected("discipline", discipline.slug) ? "red" : "inherit"
                          }}
                        >
                          {discipline.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {showInfo === "duration" && (
                   <div className="py-4" >
                    <h2 className="text-2xl text-center my-2">
                      Duration
                    </h2>
                   {duration.map((duration, index) => (
                     <div key={index} className="flex gap-x-2">
                       <div className="flex gap-x-2">
                         <input
                           type="checkbox"
                           id=""
                           name=""
                           value={durationDict[duration]}
                           checked={isCategorySelected(
                           "duration",
                           durationDict[duration]
                        )}
                        onChange={handleDurationChange}
                         />
                       </div>
                       <label htmlFor=""> {duration}</label>
                     </div>
                   ))}
                 </div>
                )}

                <div className="flex justify-between">
                  {/* <button
                    className="px-10 py-2 border-2 rounded-lg"
                    onClick={() => {
                      setSearchParams(new URLSearchParams());
                      setSearchParam({
                        discipline: "",
                        programme: "",
                        duration: [],
                        tuition: "",
                        format: "",
                        countries: []
                      });
                      window.history.replaceState({}, document.title, window.location.pathname);
                    }}
                  >
                    Reset
                  </button> */}
                  <button className="px-10 py-2 rounded-lg bg-light text-white  "
                    onClick={() => {setSubMenu(!subMenu); setShowInfo(''); setShowFilterBar(false)}}
                  >
                    Done
                  </button>
                </div>
              </aside>
            )}
            </Modal>
        )}
        <div className=" flex w-full">
          <div className="mb-4 w-full px-4">
            <h1 className="text-3xl w-fit">
              {`${
                courseName
                  ? courseName
                      .replace("-", " ")
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")
                  : "Explore"
              }`}{" "}
              Courses
            </h1>
            <div className="w-full">
              <div className="flex gap-x-2 justify-between md:gap-x-4 items-center text-light_black w-full">
                <div className="flex justify-between gap-x-4 my-4 items-center w-full  lg:w-3/12">
                  <div>
                    <span>Order: </span>
                    <select
                      className="focus:outline-none p-2 rounded-md bg-white border  border-light_black border-opacity-30  w-20 md:w-32"
                      vvalue={sortOrder}
                      onChange={handleSortChange}
                    >
                      <option value="random">Random</option>
                      <option value="ascending">Ascending</option>
                      <option value="descending">Descending</option>
                    </select>
                  </div>
                </div>
                <div className="text-md text-light_black hidden md:flex gap-x-8 items-center w-10/12">
                  <hr className=" opacity-30 w-28  md:w-40 lg:w-full  " />
                  <div className="flex gap-x-2">
                    <span>{count}</span>
                    <span>results</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-start w-full max-w-full">
                <div className=" w-full max-w-full">
                  {sortedCourses.length > 0 ? (
                    <div className="flex flex-col w-full gap-y-4">
                      {sortedCourses.map((degree, index) => (
                        <FlatCourseCard key={index} prop={degree} />
                      ))}
                    </div>
                  ) : loading ? (
                    <div>
                      <div className="text-center text-light_black">
                        {" "}
                        No results. But we've got a lot more! Modify your
                        filters or make a
                        <a
                          href="http://hillpad.com/coursefinder?name=&country=Where?"
                          className=" ps-2 text-light"
                        >
                          fresh start.
                        </a>
                      </div>
                      <h2 className="text-light text-4xl text-center my-4 font-semibold ">
                        Other interesting programmes for you
                      </h2>
                      <Carousel />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center h-screen">
                      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-light" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          {!showFilter && (
            <div
              className="flex gap-x-2 bg-light text-white p-3 fixed z-20 bottom-0 w-full justify-center items-center lg:hidden"
              onClick={() => {
                setShowFilterBar(!showFilterBar);
              }}
            >
              <div>
                <FiFilter />
              </div>
              <div>Filter</div>
            </div>
          )}
        </div>
      </div>
      <ReactPaginate
        previousLabel={<FaChevronLeft />}
        nextLabel={<FaChevronRight />}
        breakLabel="..."
        breakClassName="break-me"
        pageCount={Math.ceil(count / 20)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="flex gap-x-6 mx-auto text-center items-center justify-center mb-2 text-2xl text-orange "
        subContainerClassName="pages pagination"
        activeClassName="text-black border-2 p-2"
      />
    </div>
  );
}

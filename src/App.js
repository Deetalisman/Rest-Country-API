import { useEffect, useState } from "react";
import data from "./data.json";
import { FaMoon } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState([]);
  const [filte, setFilte] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [isView, setIsView] = useState(false);
  const [error, setError] = useState("");
  const [CLICK, setCLICK] = useState([]);

  function handleDark() {
    setIsDark((isDark) => !isDark);
    console.log(isDark);
    document.body.classList.toggle("new");
    const view = document.querySelector(".view");
    view.classList.toggle("viewco");
  }

  function handleSelect(e, country) {
    setSelect(e.target.value);
    const filte = countries.filter((countr) =>
      countr.region.toLowerCase().includes(select.toLowerCase())
    );
    setFilte(filte);
    if (select === "All") {
      setCountries(filte);
    } else {
      setCountries(country);
    }
    console.log(select);
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    const input = countries.filter((count) =>
      count.name.toLowerCase().includes(search.toLowerCase())
    );
    console.log(input);
    setError(error);
    //console.log(countries);
    setInput(input);
    setCountries(input);
    console.log(search);
  }
  function hanleSubmit(e) {
    e.prevent.Default();
  }

  function handleClick(country) {
    //console.log(numericCode);
    console.log(country);
    //const CLICK = countries.filter((cou) => cou.numericCode === numericCode);
    setCLICK(country);
    //console.log(isView);
    //setCountries(CLICK);
    setIsView((isView) => !isView);
    console.log(isView);
    const subView = document.querySelector("#subview");
    subView.style.display = "block";
    const head = document.querySelector(".head");
    head.style.display = "none";
    const small = document.querySelector("small");
    small.style.display = "none";
  }

  function handleBack() {
    // setCLICK([]);
    //setCountries(countries);
    setIsView((isView) => !isView);
    const subView = document.querySelector("#subview");
    subView.style.display = "none";
    const head = document.querySelector(".head");
    head.style.display = "block";
    const small = document.querySelector("small");
    small.style.display = "block";
  }

  useEffect(() => {
    setCountries(data);
    console.log(isDark);
    console.log(isView);
  }, []);

  return (
    <>
      <Header handleDark={handleDark} isDark={isDark} />

      <Subview
        handleClick={handleClick}
        CLICK={CLICK}
        handleBack={handleBack}
        isDark={isDark}
        isView={isView}
      />

      <Subbody
        select={select}
        setSelect={setSelect}
        handleSelect={handleSelect}
        handleSearch={handleSearch}
        hanleSubmit={hanleSubmit}
        isDark={isDark}
      />
      <Bugg
        search={search}
        isDark={isDark}
        handleClick={handleClick}
        countries={search !== "" ? input : select !== "" ? filte : countries}
      />
    </>
  );
}

function Bugg({ countries, isDark, handleClick, setIsView }) {
  return (
    <small>
      <section className={!isDark && "sub-section"}>
        {countries.map((country) => {
          const { name, population, region, capital, numericCode, flags } =
            country;

          return (
            <article
              key={numericCode}
              className={!isDark && "sub-article"}
              onClick={() => handleClick(country)}
            >
              <img src={flags.png} alt="flag" />
              <div className="sub-main">
                <h2>{name}</h2>
                <p>
                  <span>Population;</span> {population}
                </p>
                <p>
                  <span>Region:</span> {region}
                </p>
                <p>
                  <span>Capital:</span> {capital}
                </p>
              </div>
            </article>
          );
        })}
      </section>
    </small>
  );
}

function Header({ handleDark, isDark }) {
  return (
    <header className={!isDark && "head-sub"}>
      <h2>Where in the world?</h2>
      <p onClick={handleDark} id="dark">
        <FaMoon id="famoon" />
        Dark Mood
      </p>
    </header>
  );
}
function Subbody({ select, handleSelect, handleSearch, hanleSubmit, isDark }) {
  return (
    <head className="head">
      <nav className={!isDark && "sub-nav"}>
        <form onSubmit={hanleSubmit} className={!isDark && "sub-form"}>
          <FaSearch id="fasearch" />
          <input
            type="text"
            id="sub-input"
            className={!isDark && "input"}
            placeholder="search for a country...."
            onChange={handleSearch}
          />
        </form>
        <select
          value={select}
          onChangeCapture={handleSelect}
          className={!isDark && "sub-select"}
        >
          <option hidden>Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="America">America</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </nav>
    </head>
  );
}

function Subview({ CLICK, handleBack, isView }) {
  return (
    <div id="subview">
      {isView && <View CLICK={CLICK} handleBack={handleBack} />}
    </div>
  );
}

function View({ CLICK, handleBack }) {
  const {
    name,
    region,
    subregion,
    population,
    nativeName,
    capital,
    topLevelDomain,
  } = CLICK;
  return (
    <div className="view">
      <button onClick={handleBack}>
        {" "}
        <FaArrowLeft id="arrow" />
        Back
      </button>
      <div className="one">
        <img src={CLICK.flags.png} alt="flag" />
        <div className="two">
          <h1>{name}</h1>
          <div className="three">
            <div>
              <p>
                Native Name: <span>{nativeName}</span>
              </p>
              <p>
                Population: <span>{population}</span>
              </p>
              <p>
                Region: <span>{region}</span>
              </p>
              <p>
                Sub Region: <span>{subregion}</span>{" "}
              </p>
              <p>
                Capital: <span>{capital}</span>
              </p>
            </div>
            <div className="sub-three">
              <p>
                Top Level Domain:<span> {topLevelDomain}</span>{" "}
              </p>
              <p>
                Currencies: <span>{CLICK.currencies[0].name}</span>{" "}
              </p>
              <p>
                Languages: <span>{CLICK.languages[0].name}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

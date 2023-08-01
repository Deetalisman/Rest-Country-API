import { useEffect, useState } from "react";
import data from "./data.json";
import { FaMoon } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [select, setSelect] = useState("");
  const [search, setSearch] = useState("");
  const [input, setInput] = useState([]);
  const [filte, setFilte] = useState([]);
  const [isDark, setIsDark] = useState(false);
  const [isView, setIsView] = useState(false);
  const [error, setError] = useState("No Country found");

  function handleDark() {
    setIsDark((isDark) => !isDark);
    console.log(isDark);
    document.body.classList.toggle("new");
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

  useEffect(() => {
    setCountries(data);
  });
  return (
    <>
      <Header handleDark={handleDark} isDark={isDark} />
      <View view={isView} countries={countries} />
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
        countries={search !== "" ? input : select !== "" ? filte : countries}
      />
    </>
  );
}

function Bugg({ countries, search, isDark }) {
  return (
    <section className={!isDark && "sub-section"}>
      {countries.map((country) => {
        const { name, population, region, capital, numericCode, flags } =
          country;

        return (
          <article key={numericCode} className={!isDark && "sub-article"}>
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
        <option value="" hidden>
          Filter by region
        </option>
        <option value="Africa">Africa</option>
        <option value="Asia">Asia</option>
        <option value="America">America</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </nav>
  );
}

function View({ isView, country, countries }) {
  return <div>{isView && <Subview />}</div>;
}

function Subview() {
  return (
    <div className="view">
      <button>Back</button>
      <div className="one">
        <div className="two">
          <h1>Name</h1>
          <div className="three">
            <>
              <p>Native Name:Belgie</p>
              <p>Population:3434564</p>
              <p>Region:Europe</p>
              <p>Sub Region:Western Europe</p>
              <p>Capital:Brussels</p>
            </>
            <>
              <p>Top Level Domain:.be</p>
              <p>Currencies:Euro</p>
              <p>Languages:Dutch,French,German</p>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

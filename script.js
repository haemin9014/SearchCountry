"use strict";

const searchBox = document.querySelector("#myText");
const searchBtn = document.querySelector(".btn-search");
const searchContainer = document.querySelector(".search-container");
const mainCountry = document.querySelector(".main-country");
const CountryBorders = document.querySelector(".country-borders");
const quit = document.querySelector("#btn-close");
const mainCountryAll = document.querySelectorAll(".main-country");
const bordersCountryAll = document.querySelectorAll(".country-borders");
const countryP = document.querySelector(".hide-country");
const borderP = document.querySelector(".hide-border");
let showMain;
let repeat = 0;
let hasBorder = false;
const printMain = function (data, check) {
  showMain = `
  <article class="country-${check}">
    <img class="search-img" src="${data.flag}" />
    <div class="country-print">
      <h3 class="country-name"> Country Name: ${data.name}</h3>
      <h4 class="country-region"> Region: ${data.region}</h4>
      <h4 class="country-capital"> Capital: ${data.capital}</h4>
      <h4 class="country-numericCode"> numericCode: ${data.numericCode}</h4>
      <p class="country-population"><span> Population: </span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country-lnaguage"><span> Language: </span>${
        data.languages[0].name
      }</p>
      <p class="country-currencies"><span> Currencies: </span>${
        data.currencies[0].name
      }</p>
    </div>
  </article>
 `;
  if (check === "mainC") {
    mainCountry.insertAdjacentHTML("beforeend", showMain);
  } else {
    borderP.style.opacity = 1;
    CountryBorders.insertAdjacentHTML("beforeend", showMain);
    CountryBorders.insertAdjacentHTML("beforeend", "  ");
  }

  countryP.style.opacity = 1;
  mainCountry.style.opacity = 1;
  CountryBorders.style.opacity = 1;
  quit.style.opacity = 1;
};

const printBorders = async function (data) {};

searchBox.addEventListener("click", function () {
  if (searchBox.value === "Search Country") {
    searchBox.value = "";
  }
});

searchBtn.addEventListener("click", function () {
  if (searchBox.value && searchBox.value !== "Search Country") {
    try {
      printMainCountry(searchBox.value);
      searchBox.value = "";
    } catch {
      alert("plase tpye in!");
    }
  } else {
    alert("please type in country name!");
  }
});

const printMainCountry = async function (country) {
  let countryData = await fetch(
    `https://restcountries.eu/rest/v2/name/${country}`
  );
  let [data] = await countryData.json();
  searchContainer.style.opacity = 0;
  searchBtn.style.opacity = 0;
  console.log(data);
  printMain(data, "mainC");
  printCountryBorders(data);
};

const printCountryBorders = async function (border) {
  repeat = border.borders.length;
  console.log(repeat);
  for (let list of border.borders) {
    console.log(list);
    const bordersData = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${list}`
    );
    const data2 = await bordersData.json();
    printMain(data2, `bordersC`);
  }
};

quit.addEventListener("click", function () {
  quit.style.opacity = 0;
  searchContainer.style.opacity = 1;
  searchBtn.style.opacity = 1;
  borderP.style.opacity = 0;
  countryP.style.opacity = 0;
  document.querySelector(".country-mainC").remove();
  for (let i = 0; i < repeat; i++) {
    document.querySelector(".country-bordersC").remove();
  }
  repeat = 0;
  searchBox.value = "Search Country";
});

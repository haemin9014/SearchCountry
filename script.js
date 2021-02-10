"use strict";

const searchBox = document.querySelector("#myText");
const searchBtn = document.querySelector(".btn-search");
const searchContainer = document.querySelector(".search-container");
const mainCountry = document.querySelector(".main-country");
const CountryBorders = document.querySelector(".country-borders");
const quit = document.querySelector("#btn-close");
const mainCountryAll = document.querySelectorAll(".main-country");
const bordersCountryAll = document.querySelectorAll(".country-borders");
let showMain;

const printMain = function (data) {
  if (mainCountry) {
    showMain = `
  <article class="country">
    <h1>Country you Searched</h1>
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
 `;
    console.log(`Our show main is : ${showMain}`);
    mainCountry.insertAdjacentHTML("beforeend", showMain);
    mainCountry.style.opacity = 1;
    CountryBorders.style.opacity = 1;
    quit.style.opacity = 1;
  } else {
    console.log("maincountry doesn't exist");
  }
};

const printBorders = async function (data) {};

searchBox.addEventListener("click", function () {
  if (searchBox.value === "Search Country") {
    searchBox.value = "";
  }
});

searchBtn.addEventListener("click", function () {
  if (searchBox.value && searchBox.value !== "Search Country") {
    console.log(searchBox.value);
    printMainCountry(searchBox.value);
    searchContainer.style.opacity = 0;
    searchBtn.style.opacity = 0;
    searchBox.value = "";
  } else {
    alert("please type in country name!");
  }
});

const printMainCountry = async function (country) {
  let countryData = await fetch(
    `https://restcountries.eu/rest/v2/name/${country}`
  );
  let [data] = await countryData.json();
  printMain(data);
  // printCountryBorders(data);
};

const printCountryBorders = async function (border) {
  for (let list of border[0].borders) {
    console.log(list);
    const bordersData = await fetch(
      `https://restcountries.eu/rest/v2/alpha/${list}`
    );
    const data2 = await bordersData.json();
  }
};

quit.addEventListener("click", function () {
  quit.style.opacity = 0;
  searchContainer.style.opacity = 1;
  searchBtn.style.opacity = 1;
  document.querySelector(".country").remove();
  searchBox.value = "Search Country";
});

const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-FTB-CT-WEB-PT"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

//===== State =====
let upcoming = [];
let selectedUpcoming;

// Updates State with all upcoming parties from the API

async function getUpcoming() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    upcoming = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

// Updates state with a single upcoming party from the API

async function getUpcomings(id) {
  try {
    const response = await fetch(API + "/" + id);
    const result = await response.json();
    selectedUpcoming = result.data;
    render();
  } catch (e) {
    console.error(e);
  }
}

//===== Components =====

// Upcoming party name that shows more details about the party when clicked

function UpcomingListItem(upcomings) {
  const $li = document.createElement("li");
  $li.innerHTML = `
	<a href ="#selected">${upcomings.name}</a>`;
  $li.addEventListener("click", () => getUpcomings(upcomings.id));
  return $li;
}

// A list of names of all the parties
function PartiesList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("upcoming");

  const $upcoming = upcoming.map(UpcomingListItem);
  $ul.replaceChildren(...$upcoming);
  return $ul;
}

// Detailed information about the selected party
function PartyDetails() {
  if (!selectedUpcoming) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to learn more.";
    return $p;
  }

  const $upcomings = document.createElement("section");
  $upcomings.classList.add("upcomings");
  $upcomings.innerHTML = `
	<h3>${selectedUpcoming.name} #${selectedUpcoming.id}</h3>
<p>${selectedUpcoming.description}  </p>
	`;
  return $upcomings;
}

//===== Render =====
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartiesList></PartiesList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
  `;
  $app.querySelector("PartiesList").replaceWith(PartiesList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
  await getUpcoming();
  render();
}

init();

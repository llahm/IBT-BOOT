const form = document.querySelector("#search-form");
const input = document.querySelector("#country-input");
const facts = document.querySelector("#facts");

function renderFact(container, label, value) {
    const row = document.createElement("div");
    const labelEl = document.createElement("span");
    const valueEl = document.createElement("span");

    row.classList.add("fact");
    labelEl.classList.add("fact-label");

    labelEl.textContent = `${label}:`;
    valueEl.textContent = value;

    row.append(labelEl, valueEl);
    container.append(row);
}

function renderCountry(country) {
    facts.textContent = "";

    const card = document.createElement("div");
    const name = document.createElement("h2");
    const flag = document.createElement("img");

    card.classList.add("country-card");

    name.classList.add("country-name");
    name.textContent = country.name.common;

    flag.classList.add("flag");
    flag.src = country.flags.svg;
    flag.alt = `Flag of ${country.name.common}`;

    const capital = country.capital?.[0] || "Not available";

    const currencies = country.currencies
        ? Object.values(country.currencies)
            .map((currency) => currency.name)
            .join(", ")
        : "Not available";

    card.append(name, flag);

    renderFact(card, "Capital", capital);
    renderFact(card, "Population", country.population.toLocaleString());
    renderFact(card, "Region", country.region || "Not available");
    renderFact(card, "Currencies", currencies);

    facts.append(card);
}

async function showCountry(countryName) {
    facts.textContent = "Loading...";
    facts.className = "loading";

    try {
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`
        );

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Country not found");
            }

            throw new Error("Something went wrong while fetching the country");
        }

        const data = await res.json();
        const country = data.name;

        facts.className = "";
        renderCountry(country);
    } catch (error) {
        facts.textContent = error.message;
        facts.className = "error";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const countryName = input.value.trim();

    if (!countryName) {
        facts.textContent = "Please enter a country name.";
        facts.className = "error";
        return;
    }

    showCountry(countryName);
});

showCountry("Ethiopia");
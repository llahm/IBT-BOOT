const rateBtn = document.querySelector("#rate-btn");
const rateOutput = document.querySelector("#rate-output");

// Exchange rate exercise

async function getUsdToEtbRate() {
    const res = await fetch(
        "https://open.er-api.com/v6/latest/USD"
    );

    if (!res.ok) {
        throw new Error("Could not fetch the exchange rate");
    }

    const data = await res.json();
    return data.rates.ETB;
}

rateBtn.addEventListener("click", async () => {
    rateOutput.textContent = "Loading...";

    try {
        const rate = await getUsdToEtbRate();
        rateOutput.textContent = `1 USD = ${rate} ETB`;
    } catch (error) {
        rateOutput.textContent = error.message;
    }
});

// Await exercise

const awaitBtn = document.querySelector("#await-btn");
const awaitOutput = document.querySelector("#await-output");

async function fetchExchangeRate() {
    try {
        const res = await fetch(
            "https://open.er-api.com/v6/latest/USD"
        );

        if (!res.ok) {
            throw new Error("Exchange rate could not be fetched");
        }

        const data = await res.json();
        const rate = data.rates.ETB;

        awaitOutput.textContent =
            `1 USD = ${rate} ETB`;
    } catch (error) {
        awaitOutput.textContent = error.message;
    }
}

awaitBtn.addEventListener("click", fetchExchangeRate);

// Error handling exercise

const wrongUrlBtn = document.querySelector("#wrong-url-btn");
const notFoundBtn = document.querySelector("#not-found-btn");
const errorOutput = document.querySelector("#error-output");

wrongUrlBtn.addEventListener("click", async () => {
    errorOutput.textContent = "Loading...";

    try {
        await fetch("https://this-domain-does-not-exist-example.invalid/data");
        errorOutput.textContent = "Request unexpectedly succeeded";
    } catch (error) {
        errorOutput.textContent = `Catch ran: ${error.message}`;
    }
});

notFoundBtn.addEventListener("click", async () => {
    errorOutput.textContent = "Loading...";

    try {
        const res = await fetch(
            "https://restcountries.com/v3.1/name/thiscountrydoesnotexistxyz"
        );

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        errorOutput.textContent = JSON.stringify(data);
    } catch (error) {
        errorOutput.textContent =
            `Catch ran because we checked res.ok: ${error.message}`;
    }
});

// Promise.all exercise

const promiseBtn = document.querySelector("#promise-btn");
const promiseOutput = document.querySelector("#promise-output");

promiseBtn.addEventListener("click", async () => {
    promiseOutput.textContent = "Loading...\n";

    const urls = [
        "https://open.er-api.com/v6/latest/USD",
        "https://open.er-api.com/v6/latest/JPY",
        "https://open.er-api.com/v6/latest/GBP",
        "https://open.er-api.com/v6/latest/EUR"
    ];

    try {
        // 1. Fetch all URLs in parallel (passing an Array to Promise.all)
        const responses = await Promise.all(urls.map(url => fetch(url)));

        // 2. Check if all responses are OK and parse JSON in parallel
        const dataList = await Promise.all(
            responses.map(res => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch ${res.url}`);
                }
                return res.json();
            })
        );

        // 3. Clear loading text before displaying results
        promiseOutput.textContent = "";

        // 4. Render rates
        dataList.forEach((data) => {
            const currency = data.base_code;
            const rate = data.rates.ETB;
            const p = document.createElement("p");
            p.textContent = `1 ${currency} = ${rate} ETB`;
            promiseOutput.appendChild(p);
        });
    } catch (error) {
        promiseOutput.textContent = error.message;
    }
});

// State exercise


const stateBtn = document.querySelector("#state-btn");
const stateOutput = document.querySelector("#state-output");

stateBtn.addEventListener("click", async () => {
    stateOutput.className = "loading";
    stateOutput.textContent = "Loading...";

    try {
        const res = await fetch(
            "https://open.er-api.com/v6/latest/USD"
        );

        if (!res.ok) {
            throw new Error("Could not fetch data");
        }
        else {
            
            const data = await res.json();
            const p = document.createElement("p");
            p.textContent = `1 USD = ${data.rates.ETB} ETB`;
            stateOutput.textContent = "";
            stateOutput.appendChild(p);
            const successMessage = document.createElement("p");
            successMessage.textContent = `Success: ${data.base_code} was fetched successfully.`;
            stateOutput.appendChild(successMessage);
            stateOutput.className = "success";
        }
    } catch (error) {
        stateOutput.textContent = `Error: ${error.message}`;
        stateOutput.className = "error";
    }
});
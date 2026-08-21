# Country Facts Page

## Overview

This project is a single-page Country Facts application built with HTML, CSS, and vanilla JavaScript. It is designed to fetch live country data and display facts about a selected country, including its capital, population, region, currencies, and flag.

The project was developed as part of a JavaScript assignment focused on working with asynchronous JavaScript and public APIs.

## Concepts Practiced

This project demonstrates:

- `fetch()`
- `async/await`
- `try/catch`
- HTTP response checking with `res.ok`
- Handling specific HTTP errors using `res.status`
- Loading states
- Success states
- Error states
- JSON data handling
- Dynamic DOM manipulation
- `createElement()`
- `append()`
- Formatting numbers with `toLocaleString()`

## How the Application Works

The main application logic is handled by the `showCountry()` asynchronous function.

When a country is requested, the application first displays a loading message:

```js
facts.textContent = "Loading...";
facts.className = "loading";
```

It then sends a request to the REST Countries API:

```js
const res = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
);
```

The application checks whether the HTTP response was successful using `res.ok`.

```js
if (!res.ok) {
    if (res.status === 404) {
        throw new Error("Country not found");
    }

    throw new Error("Something went wrong while fetching the country");
}
```

This allows the application to distinguish between a missing country and other HTTP errors.

If the response is successful, the response is converted to JSON:

```js
const data = await res.json();
const country = data.name;
```

The country data is then passed to the rendering function:

```js
facts.className = "";
renderCountry(country);
```

If an error occurs during the request, the `catch` block displays the error message on the page:

```js
catch (error) {
    facts.textContent = error.message;
    facts.className = "error";
}
```

## API Used

The project uses the REST Countries API endpoint specified in the assignment:

```text
https://restcountries.com/v3.1/name/{country}
```

For example:

```text
https://restcountries.com/v3.1/name/Ethiopia
```

The application sends the country name entered by the user to this endpoint.

## Current API Access Issue

At the time of testing, requests to the specified REST Countries API endpoint are blocked when made directly from the browser because of the API's current CORS configuration.

The browser displays an error similar to:

```text
Access to fetch at 'https://restcountries.com/v3.1/name/Ethiopia'
from origin 'http://127.0.0.1:5500' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

CORS, or Cross-Origin Resource Sharing, is a browser security mechanism that controls whether a website is allowed to access resources from another origin.

Because the API server does not provide the required permission for the browser request, the browser blocks access to the response.

This means the application cannot currently retrieve and render live data from the assignment's specified endpoint in the browser environment.

## About the Implementation

The asynchronous request logic follows the expected structure for handling an API request:

```text
Loading State
      ↓
fetch()
      ↓
await Response
      ↓
Check res.ok
      ↓
Check for 404
      ↓
Parse JSON
      ↓
Render Country Data
```

The implementation also correctly uses `try/catch` to handle errors that occur during the asynchronous operation.

The application checks `res.ok` instead of assuming that every resolved `fetch()` request is successful. This is important because `fetch()` does not automatically reject its promise for HTTP errors such as `404 Not Found`.

For example, a request that receives a 404 response can still cause `fetch()` to resolve successfully. The `res.ok` check detects that unsuccessful HTTP response and throws an error manually.

## Expected Behavior If API Access Is Available

If the specified API endpoint allowed browser requests through its CORS configuration, the application would follow this process:

1. The user enters a country name.
2. The form submits without reloading the page.
3. The application displays `Loading...`.
4. `showCountry()` sends a request to the API.
5. The application checks `res.ok`.
6. If the country does not exist and the API returns `404`, the user sees `Country not found`.
7. Other HTTP errors display a general friendly error message.
8. A successful response is converted to JSON.
9. The country data is passed to `renderCountry()`.
10. The country facts are dynamically displayed in the page.

## Features

- Search for a country by name
- Default country set to Ethiopia on page load
- Loading indicator while a request is in progress
- Network error handling
- HTTP error handling
- Specific `404` handling
- Friendly error messages
- `res.ok` response checking
- Capital display
- Population display with comma formatting
- Region display
- Currency display
- Flag display
- Dynamic DOM rendering

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API
- Async/Await
- REST Countries API

## How to Run

1. Clone or download this repository.
2. Open the project folder.
3. Run the application using a local development server.
4. Open `index.html` in a modern web browser.

The application will attempt to load Ethiopia's facts when the page first opens.

> **Note:** The live API request may currently be blocked by the browser because the REST Countries endpoint specified in the assignment does not provide the required CORS permission for this browser request.

## Project Structure

```text
Country-Facts-Page/
├── index.html
├── styles.css
├── app.js
└── README.md
```

## Conclusion

This project implements the required asynchronous JavaScript workflow for the assignment, including `fetch()`, `async/await`, `try/catch`, `res.ok`, HTTP status handling, loading states, error states, and dynamic DOM rendering.

The current inability to retrieve live data is caused by access restrictions on the specified API endpoint rather than by the intended asynchronous workflow. The code demonstrates the structure required to fetch, validate, process, and render API data when the requested API permits browser access.
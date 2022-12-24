// @ts-check

const DAYS_OF_WEEK_MAP = {
    0: "SUN",
    1: "MON",
    2: "TUES",
    3: "WED",
    4: "THUR",
    5: "FRI",
    6: "SAT",
};

const CONDITIONS = {
    CLOUDY: "cloudy",
    SUNNY: "sunny",
    STORMY: "stormy",
    SNOWY: "snowy",
    PARTLY_CLOUDY: "partly-cloudy",
    RAINY: "rainy",
};

const WEATHER_API_MAP = {
    Sunny: CONDITIONS.SUNNY,
    "Partly cloudy": CONDITIONS.PARTLY_CLOUDY,
    Cloudy: CONDITIONS.CLOUDY,
    Overcast: CONDITIONS.CLOUDY,
    Mist: CONDITIONS.CLOUDY,
    "Patchy rain possible": CONDITIONS.RAINY,
    "Patchy snow possible": CONDITIONS.SNOWY,
    "Patchy sleet possible": CONDITIONS.CLOUDY,
    "Patchy freezing drizzle possible": CONDITIONS.CLOUDY,
    "Thundery outbreaks possible": CONDITIONS.CLOUDY,
    "Blowing snow": CONDITIONS.SNOWY,
    Blizzard: CONDITIONS.SNOWY,
    Fog: CONDITIONS.CLOUDY,
    "Freezing fog": CONDITIONS.SNOWY,
    "Patchy light drizzle": CONDITIONS.RAINY,
    "Light drizzle": CONDITIONS.RAINY,
    "Freezing drizzle": CONDITIONS.RAINY,
    "Heavy freezing drizzle": CONDITIONS.RAINY,
    "Patchy light rain": CONDITIONS.RAINY,
    "Light rain": CONDITIONS.RAINY,
    "Moderate rain at times": CONDITIONS.RAINY,
    "Moderate rain": CONDITIONS.RAINY,
    "Heavy rain at times": CONDITIONS.RAINY,
    "Heavy rain": CONDITIONS.RAINY,
    "Light freezing rain": CONDITIONS.RAINY,
    "Moderate or heavy freezing rain": CONDITIONS.RAINY,
    "Light sleet": CONDITIONS.RAINY,
    "Moderate or heavy sleet": CONDITIONS.RAINY,
    "Patchy light snow": CONDITIONS.SNOWY,
    "Light snow": CONDITIONS.SNOWY,
    "Patchy moderate snow": CONDITIONS.SNOWY,
    "Moderate snow": CONDITIONS.SNOWY,
    "Patchy heavy snow": CONDITIONS.SNOWY,
    "Heavy snow": CONDITIONS.SNOWY,
    "Ice pellets": CONDITIONS.SNOWY,
    "Light rain shower": CONDITIONS.SNOWY,
    "Moderate or heavy rain shower": CONDITIONS.SNOWY,
    "Torrential rain shower": CONDITIONS.SNOWY,
    "Light sleet showers": CONDITIONS.SNOWY,
    "Moderate or heavy sleet showers": CONDITIONS.SNOWY,
    "Light snow showers": CONDITIONS.SNOWY,
    "Moderate or heavy snow showers": CONDITIONS.SNOWY,
    "Light showers of ice pellets": CONDITIONS.SNOWY,
    "Moderate or heavy showers of ice pellets": CONDITIONS.SNOWY,
    "Patchy light rain with thunder": CONDITIONS.STORMY,
    "Moderate or heavy rain with thunder": CONDITIONS.STORMY,
    "Patchy light snow with thunder": CONDITIONS.STORMY,
    "Moderate or heavy snow with thunder": CONDITIONS.STORMY,
};

const iconNameToSizeMap = {
    [CONDITIONS.CLOUDY]: { width: 264, height: 166 },
    [CONDITIONS.SUNNY]: { width: 208, height: 213 },
    [CONDITIONS.STORMY]: { width: 246, height: 187 },
    [CONDITIONS.SNOWY]: { width: 230, height: 196 },
    [CONDITIONS.PARTLY_CLOUDY]: { width: 230, height: 209 },
    [CONDITIONS.RAINY]: { width: 160, height: 222 },
};

// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

const wrapper = /** @type {HTMLDivElement} */ (
    document.querySelector(".wrapper")
);
const KEY = "ce910d1747284dc3b12130328222412";

if ("content" in document.createElement("template")) {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${KEY}&q=${latitude},${longitude}&days=7&aqi=yes`
        );
        const data = await response.json();

        console.log(data);

        data.forecast.forecastday.forEach((day) => {
            wrapper.appendChild(createItem(day));
        });
    });
}

function createItem(data) {
    // clone template
    const template = /** @type {HTMLTemplateElement} */ (
        document.querySelector("#template-day")
    );
    const clone = /** @type {HTMLDivElement} */ (
        template.content.cloneNode(true)
    );

    // prepare data
    const date = new Date(data.date);
    const condition = WEATHER_API_MAP[data.day.condition.text];

    // day of week
    const dayOfWeek = /** @type {HTMLDivElement} */ (
        clone.querySelector(".day-of-week")
    );
    dayOfWeek.textContent = DAYS_OF_WEEK_MAP[date.getDay()];

    // date
    const dateElement = /** @type {HTMLDivElement} */ (
        clone.querySelector(".date")
    );
    dateElement.textContent = date.getDate().toString();

    // add condition class name
    clone.querySelector(".bar")?.classList.add(condition);

    // condition main icon
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.role = "img";
    svg.setAttribute("width", iconNameToSizeMap[condition].width.toString());
    svg.setAttribute("height", iconNameToSizeMap[condition].height.toString());
    svg.setAttribute(
        "viewDox",
        `0 0 ${iconNameToSizeMap[condition].width} ${iconNameToSizeMap[condition].height}`
    );
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        "#" + condition
    );
    svg.appendChild(use);
    clone.querySelector(".weather")?.appendChild(svg);

    // degrees
    const degrees = /** @type {HTMLSpanElement} */ (
        clone.querySelector("#degrees")
    );
    degrees.textContent = Math.floor(data.day.avgtemp_c).toString();

    // precipitation
    const svgPrecipitation = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    svgPrecipitation.role = "img";
    svgPrecipitation.classList.add("icon");
    const usePrecipitation = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "use"
    );
    usePrecipitation.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        "#precipitation"
    );
    svgPrecipitation.appendChild(usePrecipitation);
    clone.querySelector(".precipitation")?.appendChild(svgPrecipitation);
    clone
        .querySelector(".precipitation")
        ?.appendChild(document.createTextNode(` ${data.day.avghumidity}% `));

    // low
    const svgLow = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
    );
    svgLow.role = "img";
    svgLow.classList.add("icon");
    const useLow = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "use"
    );
    useLow.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", "#low");
    svgLow.appendChild(useLow);
    clone.querySelector(".low")?.appendChild(svgLow);
    clone
        .querySelector(".low")
        ?.appendChild(
            document.createTextNode(` ${Math.floor(data.day.mintemp_c)}° `)
        );

    return clone;
}

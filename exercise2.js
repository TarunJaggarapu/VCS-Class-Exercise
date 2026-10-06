let address_box = document.getElementById("address");
let address_sources = document.getElementById("addressSources");

let submit_btn = document.getElementById("submit_address");
let clear_btn = document.getElementById("clear_address");

let location_results = document.getElementById("location_results");

let matched_address = document.getElementById("matched_address");
let latitude = document.getElementById("latitude");
let longitude = document.getElementById("longitude");

let map_content = document.getElementById("map_content");

let url = "https://geocoding.geo.census.gov/geocoder/benchmarks?format=json";

fetch(url)
    .then(stream => stream.json())
    .then(json => {
        json.benchmarks.forEach((benchmark) => {
            let option = document.createElement("option");

            option.value = benchmark.id;
            option.textContent = benchmark.benchmarkName;

            address_sources.appendChild(option);
        });
    });

submit_btn.addEventListener("click", () => {

    let address_value = address_box.value;
    let benchmark_value = address_sources.selectedOptions[0].value;

    let geocode_url =
        "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress" +
        "?address=" + encodeURIComponent(address_value) +
        "&benchmark=" + benchmark_value +
        "&format=json";

    fetch(geocode_url)
        .then(stream => stream.json())
        .then(json => {

            console.log(json);

            let matches = json.result.addressMatches;

            if (matches.length > 0) {

                let result = matches[0];

                let matched_value = result.matchedAddress;
                let latitude_value = result.coordinates.y;
                let longitude_value = result.coordinates.x;

                location_results.hidden = false;

                matched_address.textContent = matched_value;
                latitude.textContent = latitude_value;
                longitude.textContent = longitude_value;

                let map = document.createElement("iframe");

                map.width = "450";
                map.height = "300";
                map.style.border = "0";

                map.src =
                    "https://www.google.com/maps/embed/v1/place" +
                    "?key=AIzaSyCUrXltBNrIPML-9uX-OeHpo6ZPVHs8Zf4" +
                    "&q=" + encodeURIComponent(matched_value) +
                    "&center=" + latitude_value + "," + longitude_value;

                map_content.innerHTML = "";
                map_content.appendChild(map);
            }
            else {
                alert("No matching address was found.");
            }

        });
});

clear_btn.addEventListener("click", () => {

    address_box.value = "";

    location_results.hidden = true;

    matched_address.textContent = "";
    latitude.textContent = "";
    longitude.textContent = "";

    map_content.innerHTML = "";
});
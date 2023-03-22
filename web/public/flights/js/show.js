window.addEventListener("load", async () => {
    let table = document.getElementById("MainTable").lastElementChild;
    const search = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(search.entries());
    const id = params.id;

    const getFlightsData = async (id) => {
        let response = await fetch("/api/flights?id=" + id);
        let data = await response.json();
        return data;
    };
    const generateInput = (value) => {
        return "<input type='number' placeholder='" + value + "'></input>";
    };

    let flight = await getFlightsData(id);
    flight = flight.data[0];
    console.log(flight);
    let row = table.insertRow();
    row.insertCell().innerHTML = flight.flight_id;
    row.insertCell().innerHTML = flight.flight_no;
    row.insertCell().innerHTML = generateInput(flight.departure_airport);
    row.insertCell().innerHTML = generateInput(flight.arrival_airport);
    row.insertCell().innerHTML = generateInput(flight.status);
    row.insertCell().innerHTML = generateInput(flight.aircraft_code);
    row.insertCell().innerHTML = generateInput(flight.scheduled_departure);
    row.insertCell().innerHTML = generateInput(flight.scheduled_arrival);
});
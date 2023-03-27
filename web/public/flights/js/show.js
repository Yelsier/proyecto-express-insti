window.addEventListener("load", async () => {
    let editButton = document.getElementById("edit");
    let deleteButton = document.getElementById("delete");
    let back = document.getElementById("back");
    let table = document.getElementById("MainTable").lastElementChild;
    const search = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(search.entries());
    const id = params.id;


    const getDate = (date) => {
        let dateDeparture = new Date(date);
        let day = dateDeparture.getDate().toString().padStart(2, "0");
        let month = (dateDeparture.getMonth() + 1).toString().padStart(2, "0");
        let year = dateDeparture.getFullYear();
        return day + "/" + month + "/" + year;
    };

    const getFlightsData = async (id) => {
        let response = await fetch("/api/flights?id=" + id);
        let data = await response.json();
        return data;
    };

    const generateInput = (value, idValue, type) => {
        return "<input type='" + type + "' placeholder='" + value + "' value='" + value + "' id='" + idValue + "'></input>";
    };

    let flight = await getFlightsData(id);
    flight = flight.data[0];
    console.log(flight);
    let dateDeparture = new Date(flight.scheduled_departure);
    let dateArrival = new Date(flight.scheduled_arrival);
    let row = table.insertRow();
    row.insertCell().innerHTML = flight.flight_id;
    row.insertCell().innerHTML = generateInput(flight.flight_no, "flight_no", "text");
    row.insertCell().innerHTML = generateInput(flight.departure_airport, "departure_airport", "text");
    row.insertCell().innerHTML = generateInput(flight.arrival_airport, "arrival_airport", "text");
    row.insertCell().innerHTML = generateInput(flight.status, "status", "text");
    row.insertCell().innerHTML = generateInput(flight.aircraft_code, "aircraft_code", "text");
    row.insertCell().innerHTML = getDate(flight.scheduled_departure);
    row.insertCell().innerHTML = getDate(flight.scheduled_arrival);

    back.addEventListener("click", () => {
        window.location.href = "/flights/pages/index.html";
    });

    deleteButton.addEventListener("click", () => {
        console.log("Edit" + id);
    });

    editButton.addEventListener("click", () => {
        console.log("Edit" + id);
        fetch("/api/flights/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                flight_no: "1",
                departure_airport: "123",
                arrival_airport: "123",
                status: "123",
                aircraft_code: "123",
                scheduled_departure: "123",
                scheduled_arrival: "123",
            }),
        }).then((response) => response.json()).catch((error) => console.log(error));
    });
});


                // flight_no: flight.flight_no,
                // departure_airport: flight.departure_airport,
                // arrival_airport: flight.arrival_airport,
                // status: flight.status,
                // aircraft_code: flight.aircraft_code,
                // scheduled_departure: flight.scheduled_departure,
                // scheduled_arrival: flight.scheduled_arrival,
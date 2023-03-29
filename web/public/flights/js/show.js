window.addEventListener("load", async () => {
    let editButton = document.getElementById("edit");
    let deleteButton = document.getElementById("delete");
    let back = document.getElementById("back");
    let table = document.getElementById("MainTable").lastElementChild;
    const search = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(search.entries());
    const id = params.id;


    const generateOptionsAirport = (airports, airport) => {
        let htmlOptions = "";
        airports.forEach(element => {
            if (element.departure_airport == airport) {
                let value = "<option selected value='" + element.departure_airport + "'>" + element.departure_airport + "</option>";
                htmlOptions += value;
            } else {
                let value = "<option value='" + element.departure_airport + "'>" + element.departure_airport + "</option>";
                htmlOptions += value;
            }
        });
        return htmlOptions;
    }

    const generateOptionsStatus = (status, statusFlight) => {
        let htmlOptions = "";
        status.forEach(element => {
            if (element.status == statusFlight) {
                let value = "<option selected value='" + element.status + "'>" + element.status + "</option>";
                htmlOptions += value;
            } else {
                let value = "<option value='" + element.status + "'>" + element.status + "</option>";
                htmlOptions += value;
            }
        });
        return htmlOptions;
    }

    const generateOptionsAircrafts = (aircrafts, aircraft) => {
        let htmlOptions = "";
        aircrafts.forEach(element => {
            if (element.aircraft_code == aircraft) {
                let value = "<option selected value='" + element.aircraft_code + "'>" + element.aircraft_code + "</option>";
                htmlOptions += value;
            } else {
                let value = "<option value='" + element.aircraft_code + "'>" + element.aircraft_code + "</option>";
                htmlOptions += value;
            }
        });
        return htmlOptions;
    }


    const getAircrafts = async () => {
        let response = await fetch("/api/flights/aircrafts");
        let data = await response.json();
        return data;
    }

    const getStatus = async () => {
        let response = await fetch("/api/flights/status");
        let data = await response.json();
        return data;
    }

    const getAirports = async () => {
        let response = await fetch("/api/flights/airports");
        let data = await response.json();
        return data;
    }
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
    let dateDeparture = new Date(flight.scheduled_departure);
    let dateArrival = new Date(flight.scheduled_arrival);
    let airports = await getAirports();
    let status = await getStatus();
    let aircrafts = await getAircrafts();

    let row = table.insertRow();
    row.insertCell().innerHTML = flight.flight_id;
    row.insertCell().innerHTML = generateInput(flight.flight_no, "flight_no", "text");
    row.insertCell().innerHTML = '<select id="departure_airport">' + generateOptionsAirport(airports.data, flight.departure_airport) + '</select>';
    row.insertCell().innerHTML = '<select id="arrival_airport">' + generateOptionsAirport(airports.data, flight.arrival_airport) + '</select>';
    row.insertCell().innerHTML = '<select id="status">' + generateOptionsStatus(status.data, flight.status) + '</select>';
    row.insertCell().innerHTML = '<select id="aircraft_code">' + generateOptionsAircrafts(aircrafts.data, flight.aircraft_code) + '</select>';
    row.insertCell().innerHTML = getDate(flight.scheduled_departure);
    row.insertCell().innerHTML = getDate(flight.scheduled_arrival);

    back.addEventListener("click", () => {
        window.location.href = "/flights/pages/index.html";
    });

    deleteButton.addEventListener("click", () => {
        fetch("/api/flights/" + id, {
            method: "DELETE",
        }).then((response) => {
            if (response.ok) {
                alert("Flight deleted successfully, seras redirigido.")
                window.location.href = "/flights/pages/index.html";
            } else {
                alert("An error has occurred")
            }

        }).catch((error) => console.log(error));

    });

    editButton.addEventListener("click", () => {
        fetch("/api/flights/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                flight_no: document.getElementById("flight_no").value,
                departure_airport: document.getElementById("departure_airport").value,
                arrival_airport: document.getElementById("arrival_airport").value,
                status: document.getElementById("status").value,
                aircraft_code: document.getElementById("aircraft_code").value
            }),
        }).then((response) => {
            if (response.ok) {
                alert("Flight updated successfully")
            } else {
                alert("An error has occurred")
            }

        }).catch((error) => console.log(error));
    });

});
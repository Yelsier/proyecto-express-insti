window.addEventListener("load", async () => {
    let date = new Date();
    let create = document.getElementById("create");
    let selectDepartureAirports = document.getElementById("departureAirport");
    let selectArrivalAirports = document.getElementById("arrivalAirport");
    let selectStatus = document.getElementById("status");
    let selectAircrafts = document.getElementById("aircraftCode");
    let actualDeparture = document.getElementById("actualDeparture");
    let actualArrival = document.getElementById("actualArrival");
    let scheduledDeparture = document.getElementById("scheduledDeparture");
    let scheduledArrival = document.getElementById("scheduledArrival");
    let back = document.getElementById("back");


    const formateDate = (date, sumaDays) => {
        let day = date.getDate() + Number(sumaDays);
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");
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


    const generateOptionsAirport = (airports) => {
        let htmlOptions = "";
        airports.forEach(element => {
            let value = "<option value='" + element.departure_airport + "'>" + element.departure_airport + "</option>";
            htmlOptions += value;
        });
        return htmlOptions;
    }

    const generateOptionsStatus = (status) => {
        let htmlOptions = "";
        status.forEach(element => {
            let value = "<option value='" + element.status + "'>" + element.status + "</option>";
            htmlOptions += value;
        });
        return htmlOptions;
    }

    const generateOptionsAircrafts = (aircrafts) => {
        let htmlOptions = "";
        aircrafts.forEach(element => {
            let value = "<option value='" + element.aircraft_code + "'>" + element.aircraft_code + "</option>";
            htmlOptions += value;
        });
        return htmlOptions;
    }

    const checkDates = (scheduled_departure, scheduled_arrival, actual_departure, actual_arrival) => {
        console.log(scheduled_departure);
        console.log(scheduled_arrival);
        console.log(actual_departure);
        console.log(actual_arrival);
        if (scheduled_departure >= scheduled_arrival) {
            return false;
        }

        if (actual_departure != "" && actual_arrival != "") {
            if (actual_departure >= actual_arrival) {
                return false;
            }

            if (actual_departure >= scheduled_departure) {
                return false;
            }

        }

        return true;
    }

    let airports = await getAirports();
    let status = await getStatus();
    let aircrafts = await getAircrafts();


    actualArrival.value = null;
    actualDeparture.value = null;
    scheduledDeparture.value = formateDate(date, 0);
    scheduledArrival.value = formateDate(date, 1);
    selectDepartureAirports.innerHTML = generateOptionsAirport(airports.data);
    selectArrivalAirports.innerHTML = generateOptionsAirport(airports.data);
    selectStatus.innerHTML = generateOptionsStatus(status.data);
    selectAircrafts.innerHTML = generateOptionsAircrafts(aircrafts.data);

    back.addEventListener("click", () => {
        window.location.href = "/flights/pages/index.html";
    });

    create.addEventListener("click", async () => {
        console.log("creando...");
        if (checkDates(scheduledDeparture.value, scheduledArrival.value, actualDeparture.value, actualArrival.value)) {
            fetch("/api/flights", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "flight_number": document.getElementById("flightNumber").value,
                    "scheduled_departure": scheduledDeparture.value,
                    "scheduled_arrival": scheduledArrival.value,
                    "departure_airport": document.getElementById("departureAirport").value,
                    "arrival_airport": document.getElementById("arrivalAirport").value,
                    "status": document.getElementById("status").value,
                    "aircraft_code": document.getElementById("aircraftCode").value,
                    "actual_departure": actualDeparture.value != "" ? actualDeparture.value : null,
                    "actual_arrival": actualArrival.value != "" ? actualArrival.value : null
                })
            }).then(response => {
                if (response.status == 200) {
                    alert("Flight has been created successfully");
                    window.location.href = "/flights/pages/index.html";
                } else {
                    alert("An error has been ocurred.");
                }
            });
        } else {
            alert("Las fechas no son correctas, las fechas de salida deben ser menores que las de llegada");
        }

    });

});
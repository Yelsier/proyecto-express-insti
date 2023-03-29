window.addEventListener("load", async () => {
    let createButton = document.getElementById("create");
    let table = document.getElementById("MainTable").lastElementChild;
    let prev = document.getElementById("prev");
    let next = document.getElementById("next");
    let inputPage = document.getElementById("actualpage");
    let totalFlights;
    let actualPage = 1;
    inputPage.value = actualPage;
    let flights = [];
    let minPage;
    let MaxPage;


    const cleanTableData = () => {
        let childs = Array.from(table.children);
        childs.forEach((child) => child.remove());
    }

    const getFlightsData = async () => {
        let response = await fetch("/api/flights?page=" + (actualPage - 1));
        let data = await response.json();
        return data;
    };

    const newRoW = (flight) => {
        let row = table.insertRow();
        row.insertCell().innerHTML = flight.flight_id;
        row.insertCell().innerHTML = flight.flight_no;
        row.insertCell().innerHTML = flight.departure_airport;
        row.insertCell().innerHTML = flight.arrival_airport;
        row.insertCell().innerHTML = flight.status;
        row.insertCell().innerHTML = flight.aircraft_code;
        row.addEventListener("click", () => {
            window.location.href = "/flights/pages/show.html?id=" + flight.flight_id;
            console.log(flight.flight_id);
        });
    }

    const fillTable = async () => {
        cleanTableData();
        let flights = (await getFlightsData()).data;
        flights.forEach((flight) => newRoW(flight));
    };

    const newPage = (value, maxValue, minValue) => {
        console.log(value);
        if (value < minValue) {
            actualPage = Number(maxValue);
        } else if (value > maxValue) {
            actualPage = Number(minValue);
        } else {
            actualPage = Number(value);
        }
        inputPage.value = actualPage;
        fillTable();
    }



    let data = await getFlightsData();
    totalFlights = data.totalResults;
    flights = data.data;
    minPage = 1;
    MaxPage = Math.ceil(totalFlights / 10);


    prev.addEventListener("click", () => newPage(Number(actualPage - 1), MaxPage, minPage));

    next.addEventListener("click", () => newPage(Number(actualPage + 1), MaxPage, minPage));

    inputPage.addEventListener("focusout", () => newPage(inputPage.value, MaxPage, minPage));

    inputPage.addEventListener("keyup", (e) => {
        if (e.key == "Enter") {
            newPage(inputPage.value, MaxPage, minPage);
        }
    });

    fillTable();

    createButton.addEventListener("click", () => {
        window.location.href = "/flights/pages/create.html";
    });

});



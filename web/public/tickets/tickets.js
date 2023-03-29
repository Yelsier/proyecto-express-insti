const GET = async (url, body) => {
    const res = await fetch(url + "?" + new URLSearchParams(body).toString(), {
        method: "GET"
    })
    return await res.json()
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const singleTicket = (id) => {
    window.location.replace("/tickets/ticket?id=" + id)
}

const getTickets = async (page) => {
    return await GET("/api/tickets", { page })
}

const loadTickets = (tickets) => {
    const el = document.getElementById("ticketsBody")
    let content = ""

    tickets.forEach(ticket => {
        content += `<tr onclick="singleTicket('${ticket.ticket_no}')">
            <td>${ticket.ticket_no}</td>
            <td>${ticket.book_ref}</td>
            <td>${ticket.passenger_id}</td>
            <td>${ticket.passenger_name}</td>
            <td style="display:grid;grid-template-columns: 50px 200px; text-align: left; justify-content: center">${Object.keys(ticket.contact_data).map(key => { return ("<span>" + key + ':</span><span class="text-nowrap text-truncate">' + ticket.contact_data[key] + "</span>") }).join("")}</td>  
        </tr>`
    });

    el.innerHTML = content
}

let maxPages = 0
let currentPage = 1

const updateInputPage = () => {
    document.getElementById("currentPageInput").value = currentPage
}

const pageUp = async () => {
    if (currentPage + 1 > maxPages) return
    loadTickets((await getTickets(++currentPage)).tickets)
    updateInputPage()
}

const pageDown = async () => {
    if (currentPage - 1 < 1) return
    loadTickets((await getTickets(--currentPage)).tickets)
    updateInputPage()
}

const changePage = async (input) => {
    currentPage = clamp(input.value, 1, maxPages)
    loadTickets((await getTickets(currentPage)).tickets)
    updateInputPage()
}

const hideForm = () => {
    document.getElementById("form").style.display = "none"
}

const showForm = () => {
    document.getElementById("form").style.display = "flex"
}

const handleError = (error) => {
    if (error == "book_ref") {
        document.getElementById("book_ref").style.border = "1px solid red"
    }
}

const createTicket = () => {
    let data = {}
    let contact_data = {}
    document.querySelectorAll('#form input:not([type="button"])').forEach(el => {
        if (el.id == "phone" || el.id == "email") {
            if (el.value != "") {
                contact_data[el.id] = el.value
            }
        } else {
            data[el.id] = el.value
        }
    })

    data = { ...data, contact_data }

    fetch("/api/tickets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => res.json().then(data => {
        if ("error" in data) {
            handleError(data.error)
        } else {
            hideForm()
            load()
        }
    }))
}

const load = async () => {
    const data = await getTickets(1)
    maxPages = data.pages
    loadTickets(data.tickets)
    updateInputPage()
    document.getElementById("ticket_no").value = (Number((await GET("/api/tickets/nextID", {})).max) + 1).toString().padStart(13, '0');
}

window.addEventListener('load', async function () {
    load()
});
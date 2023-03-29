const GET = async (url, body) => {
    const res = await fetch(url + "?" + new URLSearchParams(body).toString(), {
        method: "GET"
    })
    return await res.json()
}

const loadTicket = (ticket) => {
    console.log(ticket);
    for (const item of Object.keys(ticket)) {
        if (item == "book_date") {
            document.getElementById(item).innerHTML = new Date(ticket[item]).toLocaleDateString() + " " + new Date(ticket[item]).toLocaleTimeString()
        } else if (typeof item == "string" && document.getElementById(item)) {
            document.getElementById(item).innerHTML = ticket[item]
        }
    }

    document.getElementById("contact_phone").innerHTML = ticket.contact_data.phone ? ticket.contact_data.phone : ""
    document.getElementById("contact_email").innerHTML = ticket.contact_data.email ? ticket.contact_data.email : ""
}

const toggleEdit = (el) => {
    if (el.innerHTML == "Editar") {
        enableEdit(el)
    } else {
        disableEdit(el)
    }
}

let changes = {}

const enableEdit = (el) => {
    el.innerHTML = "Cancelar"
    document.getElementById("saveButton").style.display = "block"

    document.querySelectorAll(".editable").forEach(element => {
        element.style.display = "block"
        const text = document.getElementById(element.getAttribute("data-id"))
        element.value = text.innerHTML
        text.style.display = "none"

        changes[element.getAttribute("data-id")] = text.innerHTML
    });
}

const disableEdit = (el) => {
    el.innerHTML = "Editar"
    document.getElementById("saveButton").style.display = "none"

    document.querySelectorAll(".editable").forEach(element => {
        element.style.display = "none"
        const text = document.getElementById(element.getAttribute("data-id"))
        text.style.display = "block"
    });

    changes = {}
}

const handleChange = (el) => {
    changes[el.getAttribute("data-id")] = el.value
}

const handleError = (campo) => {
    console.log(campo);
    const badInput = document.querySelector(`input[data-id="${campo}"]`)
    badInput.style.border = "3px solid red"
}

const update = async () => {
    console.log(changes);
    const res = await (await fetch("/api/tickets/" + currentId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(changes)
    })).json()


    if ("error" in res) {
        handleError(res.error)
    } else {
        disableEdit(document.getElementById("toogleEdit"))
        loadTicket(await GET("/api/tickets/" + currentId))
    }
}

const deleteTicket = async () => {
    const res = await fetch("/api/tickets/" + currentId, {
        method: "DELETE"
    })

    window.location = "/tickets"
}

let currentId = ""

window.addEventListener('load', async function () {
    const search = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(search.entries())
    document.querySelectorAll(".editable").forEach(element => {
        element.addEventListener("keypress", function () {
            element.style.border = ""
        })
    })
    currentId = params.id
    loadTicket(await GET("/api/tickets/" + currentId))
});
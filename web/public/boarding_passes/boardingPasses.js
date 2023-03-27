let tabla = document.getElementById("tableMain")
eventoAbotonesDeCierre()
document.getElementById("createBTN").addEventListener("click",mostrarModalCreate)

//fetch
fetch("/api/boarding_passes")
    .then(response => response.json())
    .then( data =>{
        console.log(data);
        let tableData="";
        data.map((values)=>{
           
            tableData+=`<tr id="tableRow">
            <td>${values.ticket_no}</td>
            <td>${values.flight_id}</td>
            <td>${values.boarding_no}</td>  
            <td>${values.seat_no}</td>
            <td><i  onclick="mostrarModalEditar('${values.ticket_no}', '${values.flight_id} ')"class="iconos fa fa-pencil-square-o" ></i>
            <i onclick="mostrarModalDelete('${values.ticket_no}', '${values.flight_id} ')"class="iconos fa fa-trash" aria-hidden="true"></i></td>
            <input type="text" value=${values.ticket_no} style="display:none">
            </tr>`;
            console.log(values)
        });

    document.getElementById("bodyTable").innerHTML=tableData;
 })
    .catch(error => console.log(error))
    function editarFetch(ticket,flight,seat,boarding){
  
        console.log(boarding)
        console.log(seat)
        fetch("/api/boarding_passes"+`/${ticket}`+`/${flight}`, {
            method: 'PUT',
            body: JSON.stringify({
               
                "boarding_no": boarding,
                "seat_no": seat
            }),
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          })
          .then((response) => response.text())
          .then((json) => console.log(json))
          .catch((err)=>console.log(err));
          alert("ok")
    }
    function eliminarFetch(ticket,flight){
    
        fetch("/api/boarding_passes"+`/${ticket}`+`/${flight}`,{
            method: 'DELETE',
        });
    
   
}
//   funcionalidad visual de modales
    function mostrarModalEditar(ticket,flight){
        placeHolderInputEditar(ticket,flight)
        document.getElementById("enviarBTNeditar").addEventListener("click",()=>editarFetch(ticket,flight,document.getElementById("inputNameE").value,document.getElementById("inputSeatE").value))

        document.getElementById("modalCRUDeditar").style.display="block"
       
        document.getElementById("infoModaltxtID").innerText="Ticket-id: " + ticket + " flight-id: "+ flight;
    }
    function esconderModalEditar(){
        document.getElementById("modalCRUDeliminar").style.display="none"

    }
    function esconderModalEliminaar(){
        document.getElementById("modalCRUDeditar").style.display="none"

    }
    function esconderModalCrear(){
        document.getElementById("modalCRUDcrear").style.display="none"

    }
    function mostrarModalDelete(ticket,flight){
        document.getElementById("enviarBTNeliminar").addEventListener("click",()=>eliminarFetch(ticket,flight))
        document.getElementById("modalCRUDeliminar").style.display="block"
       
        document.getElementById("infoModaltxtID").innerText="Ticket-id: " + ticket + " flight-id: "+ flight;
    }
    function mostrarModalCreate(){
       
        document.getElementById("modalCRUDcrear").style.display="block"
       
        
    }
   
    function eventoAbotonesDeCierre(){
       
        const btnsE = document.querySelectorAll('.cerrarModalBTNe');

        btnsE.forEach(btn => {
        btn.addEventListener('click', esconderModalEditar);
        });

        const btnsU = document.querySelectorAll('.cerrarModalBTNu');

        btnsU.forEach(btn => {
        btn.addEventListener('click', esconderModalEliminaar);
        });

        const btnsC = document.querySelectorAll('.cerrarModalBTNc');

        btnsC.forEach(btn => {
        btn.addEventListener('click', esconderModalCrear);
        });
    }

     function placeHolderInputEditar(ticket,flight){
        fetch("/api/boarding_passes"+`/${ticket}`+`/${flight}`)
        .then(response => response.json())
        .then( data =>{
           document.getElementById("inputNameE").placeholder= data[0].boarding_no
           document.getElementById("inputSeatE").placeholder= data[0].seat_no
        //    console.log(data.boarding_no)
        //    console.log(data.seat_no)
        //    console.log(data)

          })
        .catch(error => console.log(error))
    
}

const eventsElem = document.querySelector('#events');

function getUrlId() {
   let url = window.location.search.substring(1);
   let sliceID = url.split('=');
   let id = sliceID[1];
   return id;
}

function getTicketUrl() {
   let url = window.location.search.substring(1);
   let sliceID = url.split('=');
   let id = sliceID[2];
   return id;
   console.log(id);
}

function displayEvent(menu) {
   eventsElem.innerHTML += `
   <div class="ticket-container">
   <p class="spantitel">What</p> 
   <h2 class="titel" >${menu.title} </h2> 
   <p class="where">where</p>
   <p class="desc">${menu.desc}</p>
   <p class="date">${menu.date} ${menu.time}</p>
   <img class="img" src="image/A2ED7barcode.png" alt="">
   </div>
   `;
}

async function getEvent() {
   const response = await fetch('http://localhost:8000/api/event/ticket');
   const data = await response.json();
   const id = parseInt(getUrlId());
   displayEvent(data.menu[id]);
}

async function displayTicket(orders) {
   console.log(orders);
   const id = getTicketUrl();
   eventsElem.innerHTML += `
   <p id="events" class="ticketnumber" data-id=${id}>Biljettnummer: ${id}</p>
   `;
}

async function getTicketId() {
   const response = await fetch('http://localhost:8000/api/ticket');
   const data = await response.json();
   const id = parseInt(getUrlId());
   displayTicket(data.orders[id]);
   console.log(data.orders);
}
getTicketUrl();
getEvent();
getTicketId();
getUrlId();

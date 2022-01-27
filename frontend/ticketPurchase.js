const eventsElem = document.querySelector('#events');

// let params = new URL(document.location).searchParams;
// let id = params.get('page');

function getUrlId() {
   let url = window.location.search.substring(1);
   let sliceID = url.split('=');
   let id = sliceID[1];
   return id;
}

function displayEvent(eventItems, i) {
   const id = getUrlId();

   eventsElem.innerHTML += `
   <div class="ticket-container">
   <h2 class="maintitel">You are about to score <br>some tickets to</h2>
       <h2 data-id=${id}  class="titel">${eventItems.title}</h2>
       <h2 class="time"> <span>${eventItems.date}   . </span> ${eventItems.time}  </h2>
       <h4 class="desc">@ ${eventItems.desc}</h4>
       <h1 class="price">${eventItems.price} sek</h1 class="price">
       <button class="orderButton" id="${id}">Beställ</button>
       </div>
       `;
   const orderButton = document.querySelector('.orderButton');

   orderButton.addEventListener('click', (e) => {
      const targetId = e.target.id;
      console.log(targetId);
      buyTicket(targetId);
   });
}

async function getEvent() {
   const response = await fetch('http://localhost:8000/api/event/ticket');
   const data = await response.json();
   const id = parseInt(getUrlId());

   displayEvent(data.menu[id]);
}

async function buyTicket(id) {
   const response = await fetch('http://localhost:8000/api/ticket/order', {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   const data = await response.json();
   location.href = `http://localhost:8000/ticketstuff.html?id=${id}&ticket=${data.ticketNumber}`;
   console.log(data.ticketNumber);
}

getEvent();

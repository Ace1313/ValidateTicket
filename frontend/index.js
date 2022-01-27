const eventsElem = document.querySelector('#events');
const buttonElem = document.querySelector('button');
const orderElem = document.querySelector('#order');
const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');

function displayEvent(eventItems) {
   eventItems.forEach((item, i) => {
      console.log(eventItems);
      eventsElem.innerHTML += `
      <div class="ticket-container${i + 1}">
      <h2 class="titel" data-id="${[i]}">${item.title}</h2>
      <p class="desc">${item.desc}</p>
      <p class="time">${item.time} <span>${item.price} sek</span></p>
      
      </div>
      <div class="date${i + 1}"><p>${item.date}</p></div>
      `;

      console.log(i);
   });
   document.querySelectorAll('.titel').forEach((item) => {
      console.log(item);
      item.addEventListener('click', (e) => {
         let html = '';
         const targetId = e.target.dataset.id;
         console.log(targetId);
         location.href = `http://localhost:8000/ticketPurchase.html?id=${targetId}`;
         eventsElem.innerHTML = html;
      });
   });
}

async function getEvent() {
   const response = await fetch('http://localhost:8000/api/event/ticket');
   const data = await response.json();
   displayEvent(data.menu);
   console.log(data.menu);
}

getEvent();

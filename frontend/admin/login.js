const verifyButton = document.querySelector('.button');
const ticketInput = document.querySelector('#ticket');
const messageText = document.querySelector('#message');
const textMessage = document.querySelector('#success');

async function saveToken(token) {
   return new Promise((resolve, reject) => {
      sessionStorage.getItem('auth', token);

      resolve('Done');
   });
}

async function isLoggedIn() {
   const token = sessionStorage.getItem('auth');
   const response = await fetch('http://localhost:8000/admin/api/auth/loggedin', {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   const data = await response.json();
   console.log(data);
   if (!data.success) {
      location.href = 'http://localhost:8000/admin/index.html';
   }
}

verifyButton.addEventListener('click', async () => {
   const token = sessionStorage.getItem('auth');
   const response = await fetch('http://localhost:8000/api/validate', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ticketNumber: ticketInput.value }),
   });
   console.log(response);
   const data = await response.json();
   console.log(data);
   if (data.success) {
      textMessage.innerHTML = data.message;
      messageText.innerHTML = '';
   } else if (!data.success) {
      messageText.innerHTML = data.message;
      textMessage.innerHTML = '';
   }
});

isLoggedIn();

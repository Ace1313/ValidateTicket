const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#pass');
const loginButton = document.querySelector('#login');

function saveToken(token) {
   return new Promise((resolve, rejecet) => {
      sessionStorage.setItem('auth', token);

      resolve('Done');
   });
}

function getToken() {
   return sessionStorage.getItem('auth');
}

async function login(user, pass) {
   const obj = {
      username: user,
      password: pass,
   };

   const response = await fetch('http://localhost:8000/admin/api/auth/admin', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
         'Content-Type': 'application/json',
      },
   });
   const data = await response.json();
   return await data;
}

async function isLoggedIn() {
   const token = getToken();
   const response = await fetch('http://localhost:8000/admin/api/auth/loggedin', {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
   const data = await response.json();
   console.log(data);
   if (data.success) {
      location.href = 'http://localhost:8000/admin/login.html';
   }
}

loginButton.addEventListener('click', async () => {
   const username = usernameInput.value;
   const password = passwordInput.value;

   const loggedIn = await login(username, password);

   if (loggedIn.success) {
      await saveToken(loggedIn.token);
      location.href = 'http://localhost:8000/admin/login.html';
   }
});

isLoggedIn();

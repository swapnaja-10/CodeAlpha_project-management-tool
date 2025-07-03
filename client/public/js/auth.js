// ✅ FILE: public/js/auth.js
const BASE_URL = 'http://localhost:5000/api/auth';

// REGISTER
async function handleRegister(e) {
  e.preventDefault();
  const username = document.querySelector('#reg-username').value;
  const email = document.querySelector('#reg-email').value;
  const password = document.querySelector('#reg-password').value;

  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('✅ Registered successfully!');
    window.location.href = 'login.html';
  } else {
    alert('❌ ' + (data.message || 'Registration failed'));
  }
}

// LOGIN
async function handleLogin(e) {
  e.preventDefault();

  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert('✅ Logged in successfully!');
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('userEmail', data.user.email); // ✅ हे IMPORTANT
    localStorage.setItem('userId', data.user.id);
    window.location.href = 'dashboard.html';
  } else {
    alert('❌ ' + (data.message || 'Login failed'));
  }
}

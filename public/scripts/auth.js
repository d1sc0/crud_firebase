const loggedin = document.querySelector('.logged-in')
const loggedout = document.querySelector('.logged-out')
const logoutBtn = document.querySelector('.btn-logout')
const status = document.querySelector('.status')
var user = auth.currentUser

auth.onAuthStateChanged(_user => {
 if(_user) {
  loggedin.classList.remove('is-hidden')
  loggedout.classList.add('is-hidden')
  status.textContent = _user.email
  }
  else {
  loggedin.classList.add('is-hidden')
  loggedout.classList.remove('is-hidden')
 };
})

// Log the user out
logoutBtn.addEventListener('click', (e) => {
 e.preventDefault()
 auth.signOut().then(() => {
  location.reload()
  console.log('signed out')
}).catch((error) => {
  console.log(error)
});})
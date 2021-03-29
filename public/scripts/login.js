const login = document.querySelector('.login-btn')
const notification= document.querySelector('.notification')
const notificationClose = document.querySelector('.delete')
var user = auth.currentUser

auth.onAuthStateChanged(_user => {
user = _user
})

// Log the user in
login.addEventListener('click', (e) => {
 e.preventDefault()
 let email = document.querySelector('.email').value
 let password = document.querySelector('.password').value
 auth.signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user)
    location.href = 'dashboard.html';
    // ...
  })
  .catch((error) => {
    notification.classList.remove('is-hidden')
    notification.firstChild.textContent = error.message
    console.log(error.message)
  });
})

// Delete Notification
notificationClose.addEventListener('click', (e) => {
 e.preventDefault()
 notification.classList.add('is-hidden')
})

const sendForm= document.querySelector('#confirm-send')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
var user = auth.currentUser
var cards = ""

auth.onAuthStateChanged(_user => {
user = _user
})

console.log(id);

db.collection('photos').doc(id).get().then((card)=>{
  renderCard(card)
 })

function renderCard(card) {
//replace title
  var deleteTitle = document.querySelector('.del-title')
  deleteTitle.textContent = card.data().imageTitle
//replace image link
 var figure = document.querySelector('.image')
 var imgNode = document.createElement('img')
 figure.appendChild(imgNode)
 figure.childNodes[1].setAttribute('src', card.data().imageUrl)
 //replace alt
 figure.childNodes[1].setAttribute('alt', card.data().imageTitle) 

if (!user) {
  var controls = document.querySelector('.controls')
  controls.innerHTML = `<a href="login.html" class="button is-danger login-btn">You must be signed into send!</a>`
}
     
}

sendForm.addEventListener('submit', (e)=> {
e.preventDefault()

let bodyData = {title: "Hello", recipient: "447804521377", link: "https://google.com"};
console.log(JSON.stringify(bodyData))
fetch("https://us-central1-crud-firebase-c1897.cloudfunctions.net/sendSMS", {
  method: "POST", 
  mode: 'no-cors',
  body: JSON.stringify(bodyData)
}).then(res => {
  console.log("Request complete! response:", res);
});
})
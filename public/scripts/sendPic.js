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

fetch('https://us-central1-crud-firebase-c1897.cloudfunctions.net/sendSMS', {
  method: 'POST', 
  mode: 'no-cors',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
        sms: {
            title: "lovely hands",
            recipient: "447804521377",
            link: "https://firebasestorage.googleapis.com/v0/b/crud-firebase-c1897.appspot.com/o/photos%2FivBfPa5j9edtsFMCvxxLSLBGABK2%2Fhands.jpg?alt=media&token=5c8db61c-0d21-4243-9f41-71e5b6e671cd"
        }
    })
}).then(res => {
  console.log("response:", res);
});
})
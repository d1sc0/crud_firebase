const sendForm = document.querySelector('#confirm-send')
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
var user = auth.currentUser
var imageTitle, imageUrl, cards

auth.onAuthStateChanged(_user => {
user = _user
})

console.log(id);

db.collection('photos').doc(id).get().then((card)=>{
  imageTitle = card.data().imageTitle
  imageUrl = card.data().imageUrl
  renderCard(imageTitle, imageUrl)
 })

function renderCard(imageTitle, imageUrl) {
//replace title
  var deleteTitle = document.querySelector('.del-title')
  deleteTitle.textContent = imageTitle
//replace image link
 var figure = document.querySelector('.image')
 var imgNode = document.createElement('img')
 figure.appendChild(imgNode)
 figure.childNodes[1].setAttribute('src', imageUrl)
 //replace alt
 figure.childNodes[1].setAttribute('alt', imageTitle) 

if (!user) {
  var controls = document.querySelector('.controls')
  controls.innerHTML = `<a href="login.html" class="button is-danger login-btn">You must be signed into send!</a>`
}

}

sendForm.addEventListener('submit', (e)=> {
e.preventDefault()
let recipient = document.querySelector('.phoneNo').value
postSMS(recipient)
  
})

// Post to the firebase cloud function
  async function postSMS(recipient) {
    try {
      const response = await fetch('https://us-central1-crud-firebase-c1897.cloudfunctions.net/sendSMS', {
        method: 'POST', 
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
              sms: {
                  title: imageTitle,
                  recipient: recipient,
                  link: imageUrl
              }})
      })
        const res = await response;
        console.log(res)
    } catch (error) {
      console.log('whooops!', error);
    }
  }
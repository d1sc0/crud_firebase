const deleteForm = document.querySelector('#confirm-delete')
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
  controls.innerHTML = `<a href="login.html" class="button is-danger login-btn">You must be signed into delete!</a>`
}
     
}

deleteForm.addEventListener('submit', (e)=> {
e.preventDefault()
    // get doc details
    db.collection('photos').doc(id).get().then((doc)=>{
      // Create a reference to the file in storage to delete
      imageRef = doc.data().imageRef
      var storageRef = storage.ref();
      var deleteRef = storageRef.child(imageRef);
      console.log(imageRef)
      console.log(deleteRef)
      // Delete the file
      deleteRef.delete().then(() => {
          //delete the DB doc
          db.collection('photos').doc(id).delete().then(() =>{
            location.href = 'dashboard.html';
          }) 
          
          }).catch((error) => {
            // Uh-oh, an error occurred!
          });
    })
})
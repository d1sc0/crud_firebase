const cardContainer = document.querySelector('.cards')
var user = auth.currentUser
var cards = ""

auth.onAuthStateChanged(_user => {
user = _user
})

db.collection('photos').get().then((snapshot)=>{
 snapshot.docs.forEach(card => {
  renderCard(card)
 })
}) 

function renderCard(card) {
 cardTop = `
      <!--Card-->
        <div class="column is-3">
          <div class="card">
            <div class="card-image">
              <figure class="image is-4by3">
                <img src="${card.data().imageUrl}" alt="${card.data().imageTitle}" />
              </figure>
            </div>
            <div class="card-content">
              <div class="content">
                <h4>${card.data().imageTitle}</h4>` 
 cardBottom = `</div>
            </div>
          </div>
        </div>
        <!--End Card-->`

if (user) {
  cardControls = `<a href="send.html?id=${card.id}" class="button is-primary">Send</a>
  <a href="delete.html?id=${card.id}" class="button is-secondary">Delete</a>`
}
else {
  cardControls = `<a href="login.html" class="button is-primary">Sign in to send</a>`
}

newCard = cardTop + cardControls + cardBottom
cards = cards + newCard         
cardContainer.innerHTML = cards        
}





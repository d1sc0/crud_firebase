const submit = document.querySelector('.submit-btn')
const form = document.querySelector('#add-pic-form')
const notification = document.querySelector('.notification')
const notificationMsg = document.querySelector('.error')
const notificationClose = document.querySelector('.delete')
var user = auth.currentUser
var uploadFile = document.querySelector('.file-input')
var imageUrl
var imageRef

auth.onAuthStateChanged(_user => {
user = _user
})

// image upload
uploadFile.addEventListener('change', (e)=> {

  if(!user) {
  notification.classList.remove('is-hidden')
  let message = `Sorry! You must be <a href="login.html">logged in</a> to submit pictures`
  notificationMsg.innerHTML = message
  return
  }

  // get file
  let imageFile = e.target.files[0]
  //create upload ref
  var storageRef = storage.ref(`photos/${user.uid}/${imageFile.name}`)
  //upload file
  var task = storageRef.put(imageFile)
  //update progress bar
  task.on('state_changed',
      function progress(snapshot){
        var progress = document.querySelector('.progress')
        var progressBar = document.querySelector('.progress-bar')
        progressBar.classList.remove('is-hidden')
        percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        progress.setAttribute('value', percentage)
      },
      function error (err){
        console.log(err)
      },
      function complete(){
        var uploadBtn = document.querySelector('.file')
        var progressBar = document.querySelector('.progress-bar')
        var progress = document.querySelector('.progress')
        task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        imageUrl = downloadURL
        imageRef = storageRef.fullPath
        uploadBtn.classList.add('is-hidden')
        progress.classList.add('is-hidden')
        progressBar.innerHTML = `<strong> ${imageFile.name}</strong> has been uploaded read for submission!`
    });
      }
  )
})

// Add the data
form.addEventListener('submit', (e) => {
 e.preventDefault()

if(user) {
    let imageTitle = document.querySelector('.imageTitle').value
    if(!imageUrl) {
      // double check we have an image
      return
    }

    db.collection('photos').add({
      imageTitle: imageTitle,
      imageUrl: imageUrl,
      imageRef: imageRef,
    }).then((docRef) => {
        location.href = 'dashboard.html';
    })
    .catch((error) => {
        notification.classList.remove('is-hidden')
        notification.firstChild.textContent = error.message
        console.log(error.message)
    });
    }
else {
  notification.classList.remove('is-hidden')
  let message = `Sorry! You must be <a href="login.html">logged in</a> to submit`
  notificationMsg.innerHTML = message
     }

})

// Delete Notification
notificationClose.addEventListener('click', (e) => {
e.preventDefault()
notification.classList.add('is-hidden')
})

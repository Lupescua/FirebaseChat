
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7Ru6H_IaPgJHPp_TecYgxAtcxuTh_Fuc",
    authDomain: "contackform.firebaseapp.com",
    databaseURL: "https://contackform.firebaseio.com",
    projectId: "contackform",
    storageBucket: "contackform.appspot.com",
    messagingSenderId: "1093334925075"
  };
  firebase.initializeApp(config);

  // references to the messages
  let messagesRef = firebase.database().ref('messages')
  const name = 'Adrian'
  var messageIds = []

  document.getElementById('messageForm').addEventListener('submit',submitForm)

  function submitForm(event){
      event.preventDefault()
      let message = document.getElementById('messageText').value

      let messageData = {
        name: name,
        message: message
      }
      
      newMessageRef = messagesRef.push(messageData).then(function(value) {
        messageIds.push(value.key)
      });
  }

  messagesRef.on('child_added', gotData,errData)
  messagesRef.on('child_removed', nodeDelete,errData)

  let messagesNode = document.getElementById('messages')

  function gotData(data){
    //get a reference to the ul
    let ulNode = document.getElementById('messagesList')
    //get the data and it's key
    let value =data.val()
    let key=data.key
    // console.log(key)
    //create li item
    let liNode = document.createElement('li')
    // set it's attribute to key 
    liNode.setAttribute('id', key)

    liNode.addEventListener('click', nodeDelete)

    liNode.innerHTML = value['message']+ ' (' + value['name'] + ')'
    // and append it to ul
    ulNode.appendChild(liNode)
  }

  function errData(err){
      console.log('Error: '+ err)
  }

  function nodeDelete(event){
    // event.stopPropagation()
    
    let key = event.target.getAttribute('id')
    // alert(event.target.getAttribute('db_key'))
    
    confirmText ="You want to delete " + event.currentTarget.innerHTML+ "?"
    const deleteMessage = confirm(confirmText)
    if (deleteMessage){
        const nodeToBeDeleted = event.currentTarget
        let ulNode = document.getElementById('messagesList')
        ulNode.removeChild(nodeToBeDeleted)
        messagesRef.child(key).remove()
    }
  }
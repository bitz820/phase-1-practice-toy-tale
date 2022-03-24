let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const submitBtn = document.querySelector('.add-toy-form');
  
  // create Toy Card
  function createToy(data) {
    const toyBox = document.querySelector("#toy-collection")
    const toyCard = document.createElement('div')
    toyCard.className = "card"
    const name = document.createElement('h2')
    name.innerText = data.name
    const img = document.createElement('img')
    img.src = data.image
    img.className = 'toy-avatar'
    const likes = document.createElement('p')
    const numberOfLikes = data.likes
    likes.innerText = `Number of likes: ${numberOfLikes}`
    const likeBtn = document.createElement("button")
    likeBtn.addEventListener("click", updateLikes)
    likeBtn.className = "like-btn"
    likeBtn.id = data.id
    likeBtn.textContent = "Click to Like Me!"
    toyBox.append(toyCard)
    toyCard.append(name, img, likes, likeBtn)
  }

  //Get the database
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => data.forEach(createToy))


  // Submit new Toy
  function submitNewToy(e) {
    e.preventDefault()


    // Create an object to POST
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: e.target[0].value,
        image: e.target[1].value,
        likes: 0
      })
    }

    // Create a POST Request
    fetch('http://localhost:3000/toys', configObj)
      .then(resp => resp.json())
      .then((data) => {
        console.log(data);
        createToy(data)
      }
    )
    //Reset Input elements to empty 
    e.target[0].value = ""
    e.target[1].value = ""
  }

  submitBtn.addEventListener('submit', submitNewToy);

  // Create Function to Update Likes
  function updateLikes (data){
    // const updatedLikes = data.likes.value++
    const likeString = data.target.previousElementSibling.innerText.split(" ")
    let isolatedLikes = likeString.slice(-1)
    let newNumberOfLikes = parseInt(isolatedLikes)+1

    console.log(newNumberOfLikes)
    
    console.log(data.target)
    
    const patchObj = {
      method: "PATCH",
      header: {
        "Content Type" : "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": newNumberOfLikes
      })
    }

    console.log(patchObj)
    // Patch Request
    fetch(`http://localhost:3000/toys/${data.target.id}`, patchObj)
    .then(resp => resp.json())
    .then(data => console.log(data))

    
  }



  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

});

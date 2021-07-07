document.addEventListener('DOMContentLoaded', () => {
 fetchDogs(),
 fetchBreeds(),
 addBreedListener()
})

function fetchDogs() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(response => response.json())
    .then(json => renderDogs(json.message)) //we originally had the forEach attached to json.message. not renderDogs
}

function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(json => renderBreeds(Object.keys(json.message))) //we originally had the forEach attached to json.message and object.keys. not renderBreeds
}
//below function from Andy for filtering list before operating on it. but it cannot see dropdown.value (won't console log)

function fetchBreedsFilter(word) {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(json => {
        let filteredArray = Object.keys(json.message)
        if (word){
            filteredArray = filteredArray.filter(breed => breed[0] === word)
        }
        renderBreeds(filteredArray)
    })
}

function renderDogs(dogs){
    dogs.forEach(dogsFunction)
}

function renderBreeds(dogs){
    //clear out the UL content and just render breeds because it goes to the bottom
    let ul = document.querySelector("#dog-breeds")
    ul.innerHTML = ''
    dogs.forEach(breedsFunction)
}

function dogsFunction(data) {
    let div = document.querySelector("#dog-image-container")
    let img = document.createElement("img")
    img.src = data
    div.append(img)
}

//challenge 2 and 3 addressed here
function breedsFunction(breeds) {
    let ul = document.querySelector("#dog-breeds")
    let li = document.createElement("li")
    li.textContent = breeds
    ul.append(li)
    li.addEventListener("click", () => 
        li.style.color = "green"
    )    
}

function addBreedListener(){
    let dropdown = document.querySelector("#breed-dropdown")
    dropdown.addEventListener("change", (e) => {
        fetchBreedsFilter(e.target.value)
    })
}


// const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
// const breedUrl = 'https://dog.ceo/api/breeds/list/all'

// document.addEventListener('DOMContentLoaded', () => {
//     fetchDogImages()
//     fetchBreeds()
//     const dropdown = document.getElementById('breed-dropdown')
//     dropdown.addEventListener("change", (e) => filterBreeds(e))
// } )

// function fetchDogImages(){
//     fetch(imgUrl)
//     .then(response => response.json())
//     .then(json => renderDogImages(json.message))
// }

// function renderDogImages(images){
//     images.forEach(renderDogImage)
// }

// function renderDogImage(image){
//     const img = document.createElement('img')
//     const container = document.querySelector('#dog-image-container')
//     img.src = image
//     img.alt = image.split("http://images.dog.ceo/breeds/")[0]
//         // alt is meant for seeing impaired
//     container.appendChild(img)
//         // appendChild vs append ? what's the difference -> can write blog
// }

// function fetchBreeds(filter){
//     fetch(breedUrl)
//     .then(response => response.json())
//     .then(json => {
//         // console.log(json.message)
//             // but how do we turn this return into an array so we can manipulate the data?
//         let breedArray = Object.keys(json.message)
//         if (filter){
//             breedArray = breedArray.filter(breed => breed[0] === filter)
//         }
//             // if there is a filter, breedArray wil be changed so that it is filters the breedArray and gets changed to the values we want
//             // however, this means we also need to clear out our ul first before we can return the values we want
//         renderBreeds(breedArray)
//     })
//         // you still want the same thing but you want to change the array you pass through to renderBreeds
// }

// function renderBreeds(breeds){
//     const ul = document.querySelector('#dog-breeds')
//     ul.textContent = ""
//     breeds.forEach(renderBreed)
// }

// function renderBreed(breed){
//     const ul = document.querySelector('#dog-breeds')
//     const li = document.createElement('li')
//     li.textContent = breed
//     ul.appendChild(li)
//     li.addEventListener('click', () => {
//         if (li.style.color !== "green"){
//             li.style.color = "green"
//         }
//         else {
//             li.style.color = "black"
//         }
// })}

// function filterBreeds(e){
//     fetchBreeds(e.target.value)
//     // this gets passed to fetchBreeds as the filter
//     // this allows us to be able to manipulate the array to play with our filters
// }
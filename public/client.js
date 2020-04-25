const createField = document.getElementById("create-field")
const itemList = document.getElementById("item-list")

const itemTemplate = (item) => {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                <span class="item-text">${item.text}</span>
                <div>
                <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
                <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
                </div>
            </li>`
}

//Create feature
document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post("/create-item", {text: createField.value}).then( (response) => {
        //Create the HTML for the new item
        itemList.insertAdjacentHTML("beforeend", itemTemplate(response.data))
        //Clear input field
        createField.value = ""
        //Set focus back to the input field
        createField.focus()
    }).catch( () => {
        //Error handling here
        console.log("Something went wrong!")
    })
})

document.addEventListener("click", e => {

    //Delete Feature
    if (e.target.classList.contains("delete-me")) {
        if (confirm("Do you really want to delete this item permanently?")) {
            axios.post("/delete-item", {id: e.target.getAttribute("data-id")}).then( () => {
                //Here goes the promise to delete the item on the UI
                e.target.parentElement.parentElement.remove()
            }).catch( () => {
                //Error handling here
                console.log("Something went wrong!")
            })
        }
    }

    //Update Feature
    if (e.target.classList.contains("edit-me")) {
        // alert("You clicked an edit button")
        const currentText = e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
        const userInput = prompt("Enter your desired new text", currentText)
        if (userInput) {
            axios.post("/update-item", {text: userInput, id: e.target.getAttribute("data-id")}).then( () => {
                //Here goes the promise to update the item on the UI
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch( () => {
                //Error handling here
                console.log("Something went wrong!")
            })
        }
    }
})
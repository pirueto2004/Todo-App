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
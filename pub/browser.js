function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
            <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
            <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
        </li>`
}

//Pageload render
let ourHTML = items.map(function(item) {
    return itemTemplate(item)
}).join('')
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)

//Create item
let createField = document.getElementById("create-field")

document.getElementById("create-form").addEventListener("submit", (e) => {
    e.preventDefault()
    axios.post('/create-item', { text: createField.value }).then((response) => {
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch(() => {
        console.log("Something happened, come back later!")
    })
})

document.addEventListener("click", (e) => {
    //Update item
    if (e.target.classList.contains("edit-me")) {
        let userInput = prompt("Enter your changes:", e.target.parentElement.parentElement.querySelector(".item-text").innerHTML)
        if (userInput) {
            axios.post('/update-item', { id: e.target.getAttribute("data-id"), text: userInput }).then(() => {
                //Update a part of the list you needed
                e.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(() => {
                console.log("Something happened, come back later!")
            })
        }
    }

    //Delete item
    if (e.target.classList.contains("delete-me")) {
        if (confirm("Are you sure bruh!!")) {
            axios.post('/delete-item', { id: e.target.getAttribute("data-id") }).then(() => {
                e.target.parentElement.parentElement.remove()
            }).catch(() => {
                console.log("Something happened, come back later!")
            })
        }
    }
})
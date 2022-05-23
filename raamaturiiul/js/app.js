const bookNameInput = document.getElementById("new-book-name");
const bookPagesAmountInput = document.getElementById("new-book-pages-amount");
const bookCurrentPageInput = document.getElementById("new-book-current-page");
const addButton = document.getElementsByTagName("button")[0];
const incompleteBooksHolder = document.getElementById("incomplete-books");
const completedBooksHolder = document.getElementById("completed-books");

const createNewBookElement = function (listItemBookName, listItemBookAmountOfPages, listItemBookCurrentPage) {
    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");

    const bookName = document.createElement("label");
    const bookAmountOfPages = document.createElement("label");
    const bookCurrentPage = document.createElement("label");
    bookName.setAttribute("id", "label-name");
    bookAmountOfPages.setAttribute("id", "label-pages");
    bookCurrentPage.setAttribute("id", "label-progress");


    const editInputName = document.createElement("input");
    const editInputPages = document.createElement("input");
    const editInputProgress = document.createElement("input");
    editInputName.setAttribute("id", "input-name");
    editInputPages.setAttribute("id", "input-pages");
    editInputProgress.setAttribute("id", "input-progress");


    const editButton = document.createElement("button");    // Button.edit
    const deleteButton = document.createElement("button");  // Button.delete

    checkBox.type = "checkbox";
    editInputName.type = "text";
    editInputPages.type = "text";
    editInputProgress.type = "text";
    editInputName.id = "input-name";
    editInputPages.id = "input-pages";
    editInputProgress.id = "input-progress";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    bookName.innerText = listItemBookName;
    bookAmountOfPages.innerText = listItemBookAmountOfPages;
    bookCurrentPage.innerText = listItemBookCurrentPage;

    listItem.appendChild(checkBox);
    listItem.appendChild(bookName);
    listItem.appendChild(bookAmountOfPages);
    listItem.appendChild(bookCurrentPage);
    listItem.appendChild(editInputName);
    listItem.appendChild(editInputPages);
    listItem.appendChild(editInputProgress);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
};

const addBook = function () {
    const listItemBookName = bookNameInput.value || "Book Name";
    const listItemBookAmountOfPages = bookPagesAmountInput.value || 0;
    const listItemBookCurrentPage = bookCurrentPageInput.value || 0;
    const listItem = createNewBookElement(listItemBookName, listItemBookAmountOfPages, listItemBookCurrentPage);
    incompleteBooksHolder.appendChild(listItem);
    bindBookEvents(listItem, bookCompleted);

    bookNameInput.value = "";
    bookPagesAmountInput.value = "";
    bookCurrentPageInput.value = "";
};

const editBookInfo = function () {
    const listItem = this.parentNode;

    const editInputName = listItem.querySelector('input[id="input-name"]');
    const editInputAmountOfPages = listItem.querySelector('input[id="input-pages"]');
    const editInputProgress = listItem.querySelector('input[id="input-progress"]');

    const labelName = listItem.querySelector("label[id='label-name']");
    const labelAmountOfPages = listItem.querySelector("label[id='label-pages']");
    const labelProgress = listItem.querySelector("label[id='label-progress']");

    const button = listItem.getElementsByTagName("button")[0];

    const containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
        labelName.innerText = editInputName.value;
        labelAmountOfPages.innerText = editInputAmountOfPages.value;
        labelProgress.innerText = editInputProgress.value;
        button.innerText = "Edit";
    } else {
        editInputName.value = labelName.innerText || "";
        editInputAmountOfPages.value = labelAmountOfPages.innerText || "";
        editInputProgress.value = labelProgress.innerText || "";
        button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
};

const deleteBook = function () {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);

};

const bookCompleted = function () {
    const listItem = this.parentNode;
    completedBooksHolder.appendChild(listItem);
    bindBookEvents(listItem, bookIncomplete);
};

const bookIncomplete = function () {
    const listItem = this.parentNode;
    incompleteBooksHolder.appendChild(listItem);
    bindBookEvents(listItem, bookCompleted);
};

const bindBookEvents = function (bookListItem, checkBoxEventHandler) {
    const checkBox = bookListItem.querySelector("input[type=checkbox]");
    const editButton = bookListItem.querySelector("button.edit");
    const deleteButton = bookListItem.querySelector("button.delete");

    editButton.onclick = editBookInfo;
    deleteButton.onclick = deleteBook;
    checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener("click", addBook);

for (let i = 0; i < incompleteBooksHolder.children.length; i++) {
    bindBookEvents(incompleteBooksHolder.children[i], bookCompleted);
}

for (let i = 0; i < completedBooksHolder.children.length; i++) {
    bindBookEvents(completedBooksHolder.children[i], bookIncomplete);
}
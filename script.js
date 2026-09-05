document.addEventListener("DOMContentLoaded", () => {
    const products = document.getElementById("products");
    const addColumnBtn = document.getElementById("add-column-btn");

    addColumnBtn.addEventListener("click", () => {

        const name = prompt("Введіть назву колонки:");

        if (!name || !name.trim()) {
            return;
        }

        const column = document.createElement("div");

        column.innerHTML = `
            <h2>${name}</h2>
            <button class="button">Додати підпис (натисніть)</button>
            <button class="button-delete">Видалити колонку</button>
            
        `;

        products.appendChild(column);
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const products = document.getElementById("products");
    const addColumnBtn = document.getElementById("add-column-btn");
    const searchInput = document.getElementById("search");
    const searchClear = document.getElementById("search-clear");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const sortyvaniaBtns = document.querySelectorAll(".sort-btn");
 
    const state = {
        columns: [],
        searchQuery: "",
        filter: "nodane",
        sortyvania: null,
    };
 
    function genId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
    }
 
    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }
 
    function render() {
        products.innerHTML = "";
 
        let columns = [...state.columns];
 
        if (state.filter === "nodane") {
            columns = columns.filter((c) => !c.done);
        } else if (state.filter === "done") {
            columns = columns.filter((c) => c.done);
        }
 
        if (state.searchQuery.trim()) {
            const q = state.searchQuery.trim().toLowerCase();
            columns = columns.filter((c) => c.name.toLowerCase().includes(q));
        }
 
        if (state.sortyvania === "alphavite") {
            columns.sort((a, b) => a.name.localeCompare(b.name, "uk"));
        }
 
        if (columns.length === 0) {
            const empty = document.createElement("p");
            empty.className = "empty-state";
            empty.textContent = "Нічого не знайдено";
            products.appendChild(empty);
            return;
        }
 
        columns.forEach((column) => {
            const columnEl = document.createElement("div");
            columnEl.className = "column";
            columnEl.dataset.id = column.id;
 
            columnEl.innerHTML = `
                <div class="column-header">
                    <h2>${escapeHtml(column.name)}</h2>
                </div>
                <div class="column-status">
                    <span class="status-square ${column.done ? "active" : ""}" data-action="toggle-status"></span>
                    <button class="button" data-action="add-todo">Додати підпис</button>
                </div>
                <button class="button-delete" data-action="delete-column">Видалити колонку</button>
            `;
 
            products.appendChild(columnEl);
        });
    }
 
    addColumnBtn.addEventListener("click", () => {
        const name = prompt("Введіть назву колонки:");
        if (!name || !name.trim()) return;
 
        state.columns.push({
            id: genId(),
            name: name.trim(),
            done: false,
        });
 
        render();
    });
 
    products.addEventListener("click", (e) => {
        const action = e.target.dataset.action;
        if (!action) return;
 
        const columnEl = e.target.closest(".column");
        if (!columnEl) return;
        const column = state.columns.find((c) => c.id === columnEl.dataset.id);
        if (!column) return;
 
        if (action === "delete-column") {
            if (confirm(`Видалити колонку "${column.name}"?`)) {
                state.columns = state.columns.filter((c) => c.id !== column.id);
                render();
            }
        }
 
        if (action === "add-todo" || action === "toggle-status") {
            column.done = !column.done;
            render();
        }
    });
 
    searchInput.addEventListener("input", (e) => {
        state.searchQuery = e.target.value;
        render();
    });
 
    searchClear.addEventListener("click", () => {
        searchInput.value = "";
        state.searchQuery = "";
        render();
    });
 
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            state.filter = btn.dataset.filter;
            render();
        });
    });
 
    sortyvaniaBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (state.sortyvania === btn.dataset.sort) {
                state.sortyvania = null;
                btn.classList.remove("active");
            } else {
                sortyvaniaBtns.forEach((b) => b.classList.remove("active"));
                state.sortyvania = btn.dataset.sort;
                btn.classList.add("active");
            }
            render();
        });
    });
 
    render();
});
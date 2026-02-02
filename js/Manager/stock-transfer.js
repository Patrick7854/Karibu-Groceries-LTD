const fromBranch = document.getElementById("fromBranch");
const toBranch = document.getElementById("toBranch");
const produce = document.getElementById("produce");
const tonnage = document.getElementById("tonnage");
const availableStockEl = document.getElementById("availableStock");
const warning = document.getElementById("warning");
const message = document.getElementById("message");
const form = document.getElementById("transferForm");
const submitBtn = form.querySelector("button");

/* BRANCH INVENTORY */
const inventory = {
    Maganjo: {
        Beans: 3000,
        "Grain Maize": 5000,
        "Cow Peas": 2000,
        "G-nuts": 1500,
        Soybeans: 2500
    },
    Matugga: {
        Beans: 2000,
        "Grain Maize": 3000,
        "Cow Peas": 1000,
        "G-nuts": 1000,
        Soybeans: 1500
    }
};

/* UPDATE AVAILABLE STOCK */
function updateAvailableStock() {
    if (!fromBranch.value || !produce.value) {
        availableStockEl.textContent = "0 KG";
        return;
    }

    availableStockEl.textContent =
        inventory[fromBranch.value][produce.value] + " KG";
}

/* EVENTS */
[fromBranch, produce].forEach(el => {
    el.addEventListener("change", () => {
        warning.textContent = "";
        updateAvailableStock();
    });
});

/* REAL-TIME VALIDATION */
tonnage.addEventListener("input", () => {
    const qty = Number(tonnage.value);

    if (!fromBranch.value || !produce.value) return;

    if (qty > inventory[fromBranch.value][produce.value]) {
        warning.textContent = "Not enough stock in source branch!";
        submitBtn.disabled = true;
    } else {
        warning.textContent = "";
        submitBtn.disabled = false;
    }
});

/* SUBMIT TRANSFER */
form.addEventListener("submit", e => {
    e.preventDefault();

    if (fromBranch.value === toBranch.value) {
        message.style.color = "red";
        message.textContent = "Cannot transfer to the same branch.";
        return;
    }

    const qty = Number(tonnage.value);

    if (qty > inventory[fromBranch.value][produce.value]) {
        message.style.color = "red";
        message.textContent = "Transfer failed: insufficient stock.";
        return;
    }

    /* TRANSFER LOGIC */
    inventory[fromBranch.value][produce.value] -= qty;
    inventory[toBranch.value][produce.value] += qty;

    updateAvailableStock();

    message.style.color = "green";
    message.textContent = "Stock transferred successfully ✔";

    form.reset();
    availableStockEl.textContent = "0 KG";
});

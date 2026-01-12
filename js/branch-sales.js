const branchSelect = document.getElementById("branch");
const produceSelect = document.getElementById("produce");
const tonnageInput = document.getElementById("tonnage");
const branchTotalEl = document.getElementById("branchTotal");
const productStockEl = document.getElementById("productStock");
const warning = document.getElementById("warning");
const form = document.getElementById("salesForm");
const submitBtn = form.querySelector("button");
const message = document.getElementById("message");

/* BRANCH BASED INVENTORY */
const inventory = {
    kampala: {
        Beans: 3000,
        "Grain Maize": 5000,
        "Cow Peas": 2000,
        "G-nuts": 1500,
        Soybeans: 2500
    },
    Hoima: {
        Beans: 2000,
        "Grain Maize": 3000,
        "Cow Peas": 1000,
        "G-nuts": 1000,
        Soybeans: 1500
    },
     Kamwenge: {
        Beans: 2000,
        "Grain Maize": 3000,
        "Cow Peas": 1000,
        "G-nuts": 1000,
        Soybeans: 1500
    },
     Kyangwali: {
        Beans: 2000,
        "Grain Maize": 3000,
        "Cow Peas": 1000,
        "G-nuts": 1000,
        Soybeans: 1500
    },

      Kikuube:{
        Beans: 2000,
        "Grain Maize": 3000,
        "Cow Peas": 1000,
        "G-nuts": 1000,
        Soybeans: 1500
    }
    
    
};

/* UPDATE BRANCH TOTAL */
function updateBranchTotal(branch) {
    const total = Object.values(inventory[branch])
        .reduce((sum, qty) => sum + qty, 0);
    branchTotalEl.textContent = total + " KG";
}

/* WHEN BRANCH CHANGES */
branchSelect.addEventListener("change", () => {
    produceSelect.value = "";
    productStockEl.textContent = "0 KG";
    warning.textContent = "";

    if (branchSelect.value) {
        updateBranchTotal(branchSelect.value);
    } else {
        branchTotalEl.textContent = "0 KG";
    }
});

/* WHEN PRODUCE CHANGES */
produceSelect.addEventListener("change", () => {
    const branch = branchSelect.value;
    const product = produceSelect.value;

    if (!branch || !product) return;

    productStockEl.textContent = inventory[branch][product] + " KG";
    warning.textContent = "";
    submitBtn.disabled = false;
});

/* REAL-TIME VALIDATION */
tonnageInput.addEventListener("input", () => {
    const branch = branchSelect.value;
    const product = produceSelect.value;
    const qty = Number(tonnageInput.value);

    if (!branch || !product) return;

    if (qty > inventory[branch][product]) {
        warning.textContent = "Not enough stock in this branch!";
        submitBtn.disabled = true;
    } else {
        warning.textContent = "";
        submitBtn.disabled = false;
    }
});

/* SUBMIT SALE */
form.addEventListener("submit", e => {
    e.preventDefault();

    const branch = branchSelect.value;
    const product = produceSelect.value;
    const sold = Number(tonnageInput.value);

    if (sold > inventory[branch][product]) {
        message.style.color = "red";
        message.textContent = "Sale failed: insufficient stock.";
        return;
    }

    inventory[branch][product] -= sold;

    updateBranchTotal(branch);
    productStockEl.textContent = inventory[branch][product] + " KG";

    message.style.color = "green";
    message.textContent = "Sale recorded successfully ✔";

    form.reset();
});

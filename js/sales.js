const produceSelect = document.getElementById("produce");
const tonnageInput = document.getElementById("tonnage");
const totalStockEl = document.getElementById("totalStock");
const productStockEl = document.getElementById("productStock");
const warning = document.getElementById("stockWarning");
const form = document.getElementById("salesForm");
const submitBtn = form.querySelector("button");
const message = document.getElementById("message");

/* INVENTORY DATA (SIMULATED) */
const stock = {
    Beans: 5000,
    "Grain Maize": 8000,
    "Cow Peas": 3000,
    "G-nuts": 2500,
    Soybeans: 4000
};

/* UPDATE TOTAL STOCK */
function updateTotalStock() {
    const total = Object.values(stock).reduce((sum, qty) => sum + qty, 0);
    totalStockEl.textContent = total + " KG";
}

updateTotalStock();

/* WHEN PRODUCE CHANGES */
produceSelect.addEventListener("change", () => {
    const product = produceSelect.value;
    productStockEl.textContent = product ? stock[product] + " KG" : "0 KG";
    warning.textContent = "";
    submitBtn.disabled = false;
});

/* REAL-TIME STOCK VALIDATION */
tonnageInput.addEventListener("input", () => {
    const product = produceSelect.value;
    const requested = Number(tonnageInput.value);

    if (!product) return;

    if (requested > stock[product]) {
        warning.textContent = "Not enough stock for selected produce!";
        submitBtn.disabled = true;
    } else {
        warning.textContent = "";
        submitBtn.disabled = false;
    }
});

/* SUBMIT SALE */
form.addEventListener("submit", e => {
    e.preventDefault();

    const product = produceSelect.value;
    const sold = Number(tonnageInput.value);

    if (sold > stock[product]) {
        message.style.color = "red";
        message.textContent = "Sale failed: insufficient stock.";
        return;
    }

    stock[product] -= sold;

    updateTotalStock();
    productStockEl.textContent = stock[product] + " KG";

    message.style.color = "green";
    message.textContent = "Sale recorded successfully ✔";

    form.reset();
});

document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // MANAGER SESSION (SIMULATED)
    // ===============================
    const manager = {
        name: "Branch Manager",
        branch: "MAGANJO" // change to MATUGGA if needed
    };

    // ===============================
    // INVENTORY (DOCUMENT BASED)
    // ===============================
    const inventory = {
        MAGANJO: {
            Beans: 3000,
            "Grain Maize": 5000,
            "Cow Peas": 2000,
            "G-nuts": 1500,
            Soybeans: 2500
        },
        MATUGGA: {
            Beans: 2000,
            "Grain Maize": 4000,
            "Cow Peas": 1500,
            "G-nuts": 1200,
            Soybeans: 1800
        }
    };

    // ===============================
    // DOM ELEMENTS
    // ===============================
    const form = document.getElementById("salesForm");
    const produceSelect = document.getElementById("produce");
    const tonnageInput = document.getElementById("tonnage");
    const priceInput = document.getElementById("price");
    const productStockEl = document.getElementById("productStock");
    const branchTotalEl = document.getElementById("branchTotal");
    const warningEl = document.getElementById("warning");
    const messageEl = document.getElementById("message");
    const submitBtn = form.querySelector("button");

    // ===============================
    // INITIAL LOAD
    // ===============================
    updateBranchTotal();
    submitBtn.disabled = false;

    // ===============================
    // UPDATE BRANCH TOTAL
    // ===============================
    function updateBranchTotal() {
        const total = Object.values(inventory[manager.branch])
            .reduce((sum, qty) => sum + qty, 0);
        branchTotalEl.textContent = total + " KG";
    }

    // ===============================
    // WHEN PRODUCE CHANGES
    // ===============================
    produceSelect.addEventListener("change", () => {
        const product = produceSelect.value;

        if (!product) {
            productStockEl.textContent = "0 KG";
            return;
        }

        productStockEl.textContent =
            inventory[manager.branch][product] + " KG";

        warningEl.textContent = "";
        submitBtn.disabled = false;
    });

    // ===============================
    // REAL-TIME STOCK VALIDATION
    // ===============================
    tonnageInput.addEventListener("input", () => {
        const product = produceSelect.value;
        const qty = Number(tonnageInput.value);

        if (!product) return;

        if (qty > inventory[manager.branch][product]) {
            warningEl.textContent = "❌ Not enough stock in this branch";
            submitBtn.disabled = true;
        } else {
            warningEl.textContent = "";
            submitBtn.disabled = false;
        }
    });

    // ===============================
    // SUBMIT SALE
    // ===============================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const product = produceSelect.value;
        const qty = Number(tonnageInput.value);
        const price = Number(priceInput.value);

        if (!product || qty <= 0 || price <= 0) {
            showMessage("❌ Please fill all fields correctly", "error");
            return;
        }

        if (qty > inventory[manager.branch][product]) {
            showMessage("❌ Sale failed: insufficient stock", "error");
            return;
        }

        // ===============================
        // DEDUCT STOCK
        // ===============================
        inventory[manager.branch][product] -= qty;

        // ===============================
        // RECORD SALE (MOCK)
        // ===============================
        const saleRecord = {
            product,
            qty,
            price,
            branch: manager.branch,
            date: new Date().toLocaleDateString()
        };

        console.log("Sale Recorded:", saleRecord);

        // ===============================
        // UI UPDATES
        // ===============================
        updateBranchTotal();
        productStockEl.textContent =
            inventory[manager.branch][product] + " KG";

        showMessage("✅ Sale recorded successfully", "success");
        form.reset();
    });

    // ===============================
    // MESSAGE HANDLER
    // ===============================
    function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.style.color = type === "success" ? "green" : "red";
    }

});

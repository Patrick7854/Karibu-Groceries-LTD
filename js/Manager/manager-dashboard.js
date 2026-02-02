document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // 1. INVENTORY DATA (MOCK DATA)
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
    // 2. ICON MAPPING
    // ===============================
    const icons = {
        Beans: "fa-seedling",
        "Grain Maize": "fa-wheat-awn",
        "Cow Peas": "fa-leaf",
        "G-nuts": "fa-peanut",
        Soybeans: "fa-leaf"
    };

    // ===============================
    // 3. DOM ELEMENTS
    // ===============================
    const branchSelect = document.getElementById("branchSelect");
    const stockCards = document.getElementById("stockCards");

    const totalStockEl = document.querySelector(
        ".cards .card:first-child .card-info p"
    );

    const fromBranchEl = document.getElementById("fromBranch");
    const toBranchEl = document.getElementById("toBranch");
    const produceEl = document.getElementById("produceSelect");
    const qtyEl = document.getElementById("transferQty");
    const transferBtn = document.getElementById("transferBtn");
    const messageEl = document.getElementById("transferMessage");

    // ===============================
    // 4. RENDER STOCK CARDS
    // ===============================
    function renderStock(branch) {
        stockCards.innerHTML = "";

        if (!inventory[branch]) {
            stockCards.innerHTML = "<p>Select a valid branch</p>";
            totalStockEl.textContent = "0 KG";
            return;
        }

        let totalStock = 0;

        for (let produce in inventory[branch]) {
            const qty = inventory[branch][produce];
            totalStock += qty;

            const card = document.createElement("div");
            card.className = "stock-card";

            card.innerHTML = `
                <i class="fa-solid ${icons[produce]} stock-icon"></i>
                <div class="stock-info">
                    <h4>${produce}</h4>
                    <p>${qty.toLocaleString()} KG</p>
                </div>
            `;

            stockCards.appendChild(card);
        }

        totalStockEl.textContent = totalStock.toLocaleString() + " KG";
    }

    // ===============================
    // 5. BRANCH CHANGE
    // ===============================
    branchSelect.addEventListener("change", () => {
        renderStock(branchSelect.value);
    });

    // ===============================
    // 6. STOCK TRANSFER
    // ===============================
    transferBtn.addEventListener("click", () => {
        const from = fromBranchEl.value;
        const to = toBranchEl.value;
        const produce = produceEl.value;
        const qty = Number(qtyEl.value);

        if (!from || !to || !produce || qty <= 0) {
            showMessage("⚠️ Please fill all fields correctly", "error");
            return;
        }

        if (from === to) {
            showMessage("⚠️ Cannot transfer to the same branch", "error");
            return;
        }

        if (inventory[from][produce] < qty) {
            showMessage("❌ Insufficient stock", "error");
            return;
        }

        inventory[from][produce] -= qty;
        inventory[to][produce] += qty;

        showMessage("✅ Stock transferred successfully", "success");

        if (branchSelect.value === from || branchSelect.value === to) {
            renderStock(branchSelect.value);
        }

        qtyEl.value = "";
    });

    // ===============================
    // 7. MESSAGE HANDLER
    // ===============================
    function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.style.color = type === "success" ? "green" : "red";
    }

    // ===============================
    // 8. INITIAL LOAD
    // ===============================
    branchSelect.value = "MAGANJO";
    renderStock("MAGANJO");

    // ===============================
// QUICK ACTIONS NAVIGATION
// ===============================
const actionCards = document.querySelectorAll(".action-card");

actionCards.forEach(card => {
    card.addEventListener("click", () => {
        const action = card.dataset.action;

        switch (action) {
            case "add-stock":
                window.location.href = "procurement.html";
                break;

            case "record-sale":
                window.location.href = "sales.html";
                break;

            case "view-reports":
                window.location.href = "reports.html"; // future page
                break;

            default:
                alert("Action not implemented yet");
        }
    });
});


});

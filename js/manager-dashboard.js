
   //MANAGER DASHBOARD JAVASCRIPT
   

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       BRANCH INVENTORY DATA
       (Temporary – later from DB)
    ------------------------------ */
    const branchInventory = {
        Kampala: {
            Beans: 3000,
            "Grain Maize": 5000,
            "Cow Peas": 2000,
            "G-nuts": 1500,
            Soybeans: 2500
        },
        Kamwenge: {
            Beans: 2000,
            "Grain Maize": 4000,
            "Cow Peas": 1500,
            "G-nuts": 1200,
            Soybeans: 1800
        },
        Hoima: {
            Beans: 1800,
            "Grain Maize": 3500,
            "Cow Peas": 1200,
            "G-nuts": 1000,
            Soybeans: 1600
        },
        Kikuube: {
            Beans: 1600,
            "Grain Maize": 3000,
            "Cow Peas": 1000,
            "G-nuts": 900,
            Soybeans: 1400
        },
        Kyangwali: {
            Beans: 1400,
            "Grain Maize": 2800,
            "Cow Peas": 900,
            "G-nuts": 800,
            Soybeans: 1200
        }
    };

       /*______________________
       ICON MAPPING PER PRODUCE
       ________________________*/
   
    const produceIcons = {
        Beans: "fa-seedling",
        "Grain Maize": "fa-wheat-awn",
        "Cow Peas": "fa-leaf",
        "G-nuts": "fa-peanut",
        Soybeans: "fa-leaf"
    };

    /* -----------------------------
       DOM ELEMENTS
    ------------------------------ */
    const branchSelect = document.getElementById("branchSelect");
    const stockCards = document.getElementById("stockCards");

    /* -----------------------------
       SUMMARY CARD ELEMENTS
    ------------------------------ */
    const totalStockEl = document.querySelector(".cards .card:nth-child(1) p");
    const totalSalesEl = document.querySelector(".cards .card:nth-child(2) p");
    const totalCreditEl = document.querySelector(".cards .card:nth-child(3) p");

    /* -----------------------------
       DUMMY SALES DATA
    ------------------------------ */
    let totalSales = 1200000;
    let totalCreditSales = 250000;

    /* -----------------------------
       RENDER STOCK CARDS
    ------------------------------ */
    function renderStockCards(branch) {

        stockCards.innerHTML = "";

        if (!branchInventory[branch]) {
            stockCards.innerHTML = "<p>Please select a branch.</p>";
            return;
        }

        let branchTotalStock = 0;

        Object.entries(branchInventory[branch]).forEach(([produce, qty]) => {
            branchTotalStock += qty;

            const card = document.createElement("div");
            card.className = "stock-card";

            card.innerHTML = `
                <i class="fa-solid ${produceIcons[produce]} stock-icon"></i>
                <div class="stock-info">
                    <h4>${produce}</h4>
                    <p>${qty.toLocaleString()} KG</p>
                </div>
            `;

            stockCards.appendChild(card);
        });

        updateSummary(branchTotalStock);
    }

    /* -----------------------------
       UPDATE SUMMARY CARDS
    ------------------------------ */
    function updateSummary(totalStock) {
        totalStockEl.textContent = totalStock.toLocaleString() + " KG";
        totalSalesEl.textContent = "UGX " + totalSales.toLocaleString();
        totalCreditEl.textContent = "UGX " + totalCreditSales.toLocaleString();
    }

    /* -----------------------------
       BRANCH CHANGE EVENT
    ------------------------------ */
    branchSelect.addEventListener("change", () => {
        const selectedBranch = branchSelect.value;
        renderStockCards(selectedBranch);
    });

    /* -----------------------------
       INITIAL LOAD
    ------------------------------ */
    branchSelect.value = "Kampala";
    renderStockCards("Kampala");

});

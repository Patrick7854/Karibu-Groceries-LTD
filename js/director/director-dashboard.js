document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // COMPANY DATA (DOCUMENT-BASED)
    // ===============================
    const branches = {
        MAGANJO: {
            stock: {
                Beans: 3000,
                "Grain Maize": 5000,
                "Cow Peas": 2000,
                "G-nuts": 1500,
                Soybeans: 2500
            },
            sales: 2100000,
            credit: 520000
        },

        MATUGGA: {
            stock: {
                Beans: 2000,
                "Grain Maize": 4000,
                "Cow Peas": 1500,
                "G-nuts": 1200,
                Soybeans: 1800
            },
            sales: 1750000,
            credit: 400000
        }
    };

    // ===============================
    // DOM ELEMENTS
    // ===============================
    const totalStockEl = document.getElementById("totalStock");
    const totalSalesEl = document.getElementById("totalSales");
    const totalCreditEl = document.getElementById("totalCredit");

    // ===============================
    // CALCULATIONS
    // ===============================
    let companyStock = 0;
    let companySales = 0;
    let companyCredit = 0;

    for (let branch in branches) {
        const stockValues = Object.values(branches[branch].stock);
        companyStock += stockValues.reduce((sum, qty) => sum + qty, 0);
        companySales += branches[branch].sales;
        companyCredit += branches[branch].credit;
    }

    // ===============================
    // DISPLAY RESULTS
    // ===============================
    totalStockEl.textContent = companyStock.toLocaleString() + " KG";
    totalSalesEl.textContent = "UGX " + companySales.toLocaleString();
    totalCreditEl.textContent = "UGX " + companyCredit.toLocaleString();

});

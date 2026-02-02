document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // MANAGER SESSION (SIMULATED)
    // ===============================
    const manager = {
        name: "Branch Manager",
        branch: "MAGANJO" // change to MATUGGA if testing other branch
    };

    // ===============================
    // SHARED INVENTORY (DOCUMENT BASED)
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
    const form = document.getElementById("procurementForm");
    const message = document.getElementById("message");

    // ===============================
    // FORM SUBMIT
    // ===============================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const produce = document.getElementById("produce").value;
        const type = document.getElementById("type").value;
        const tonnage = Number(document.getElementById("tonnage").value);
        const cost = Number(document.getElementById("cost").value);
        const dealer = document.getElementById("dealer").value.trim();
        const contact = document.getElementById("contact").value.trim();
        const sellingPrice = Number(document.getElementById("sellingPrice").value);

        // ===============================
        // VALIDATIONS (DOCUMENT RULES)
        // ===============================
        if (!produce || !type || !dealer || !contact) {
            showMessage("❌ All fields are required", "error");
            return;
        }

        if (tonnage < 1000) {
            showMessage("❌ Tonnage must be at least 1000 KG", "error");
            return;
        }

        if (cost < 10000) {
            showMessage("❌ Cost must be at least UGX 10,000", "error");
            return;
        }

        if (sellingPrice <= 0) {
            showMessage("❌ Enter a valid selling price", "error");
            return;
        }

        // ===============================
        // ADD STOCK TO BRANCH
        // ===============================
        inventory[manager.branch][produce] += tonnage;

        // ===============================
        // RECORD PROCUREMENT (MOCK)
        // ===============================
        const procurementRecord = {
            produce,
            type,
            tonnage,
            cost,
            sellingPrice,
            dealer,
            contact,
            branch: manager.branch,
            date: new Date().toLocaleDateString()
        };

        console.log("Procurement Recorded:", procurementRecord);

        showMessage(
            `✅ ${tonnage} KG of ${produce} added to ${manager.branch}`,
            "success"
        );

        form.reset();
    });

    // ===============================
    // MESSAGE HANDLER
    // ===============================
    function showMessage(text, type) {
        message.textContent = text;
        message.style.color = type === "success" ? "green" : "red";
    }

});

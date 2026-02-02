document.addEventListener("DOMContentLoaded", () => {

    // Mock inventory (same logic as dashboard)
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

    const form = document.getElementById("salesForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const branch = document.getElementById("branch").value;
        const produce = document.getElementById("produce").value;
        const qty = Number(document.getElementById("quantity").value);
        const price = Number(document.getElementById("price").value);

        if (!branch || !produce || qty <= 0 || price <= 0) {
            showMessage("⚠️ Please fill all fields correctly", "error");
            return;
        }

        if (inventory[branch][produce] < qty) {
            showMessage("❌ Insufficient stock for this sale", "error");
            return;
        }

        // Deduct stock (mock)
        inventory[branch][produce] -= qty;

        showMessage("✅ Sale recorded successfully", "success");
        form.reset();
    });

    function showMessage(text, type) {
        message.textContent = text;
        message.style.color = type === "success" ? "green" : "red";
    }

});

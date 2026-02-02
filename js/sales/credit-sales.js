document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // MANAGER SESSION (SIMULATED)
    // ===============================
    const manager = {
        name: "Branch Manager",
        branch: "MAGANJO" // change to MATUGGA if needed
    };

    // ===============================
    // DOM ELEMENTS
    // ===============================
    const form = document.getElementById("creditSalesForm");
    const ninInput = document.getElementById("nin");
    const amountInput = document.getElementById("amount");
    const messageEl = document.getElementById("creditMessage");

    // ===============================
    // UGANDA NIN REGEX
    // Format: CF12345678AB
    // ===============================
    const ninRegex = /^[A-Z]{2}\d{8}[A-Z]{2}$/;

    // ===============================
    // FORM SUBMIT
    // ===============================
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nin = ninInput.value.trim().toUpperCase();
        const amount = Number(amountInput.value);

        // Reset styles
        ninInput.classList.remove("error", "success");

        // ===============================
        // VALIDATIONS
        // ===============================
        if (!ninRegex.test(nin)) {
            showMessage("❌ Invalid NIN format (e.g CF12345678AB)", "error");
            ninInput.classList.add("error");
            return;
        }

        if (amount <= 0) {
            showMessage("❌ Enter a valid credit amount", "error");
            return;
        }

        // ===============================
        // RECORD CREDIT SALE (MOCK)
        // ===============================
        const creditSale = {
            nin,
            amount,
            branch: manager.branch,
            status: "OUTSTANDING",
            date: new Date().toLocaleDateString()
        };

        console.log("Credit Sale Recorded:", creditSale);

        ninInput.classList.add("success");

        showMessage(
            `✅ Credit sale recorded for ${manager.branch}`,
            "success"
        );

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

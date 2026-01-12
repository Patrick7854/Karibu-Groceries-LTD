const form = document.getElementById("procurementForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const tonnage = Number(document.getElementById("tonnage").value);
    const cost = Number(document.getElementById("cost").value);

    if (tonnage < 1000) {
        message.style.color = "red";
        message.textContent = "Tonnage must be at least 1000 KG.";
        return;
    }

    if (cost < 10000) {
        message.style.color = "red";
        message.textContent = "Cost must be at least UGX 10,000.";
        return;
    }

    message.style.color = "green";
    message.textContent = "Procurement recorded successfully ✔";

    form.reset();
});

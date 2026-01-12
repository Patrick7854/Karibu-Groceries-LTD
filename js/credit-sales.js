const form = document.getElementById("creditSalesForm");
const message = document.getElementById("message");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nin = document.getElementById("nin").value.trim();
    const contact = document.getElementById("contact").value.trim();

    const ninPattern = /^C[FM]\d{13}$/;
    const phonePattern = /^\+2567\d{8}$/;

    if (!ninPattern.test(nin)) {
        message.style.color = "red";
        message.textContent = "Invalid NIN format. Example: CF1234567890123";
        return;
    }

    if (!phonePattern.test(contact)) {
        message.style.color = "red";
        message.textContent = "Invalid phone number. Use +2567XXXXXXXX";
        return;
    }

    message.style.color = "green";
    message.textContent = "Credit sale recorded successfully ✔";

    form.reset();
});

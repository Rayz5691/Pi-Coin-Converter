document.addEventListener("DOMContentLoaded", function () { const piToFiatRate = { USD: 100, EUR: 90, MYR: 450 }; // Example rates const fiatToPiRate = { USD: 1 / 100, EUR: 1 / 90, MYR: 1 / 450 };

const currencySelect = document.getElementById("currency");
const piInput = document.getElementById("pi-amount");
const fiatInput = document.getElementById("fiat-amount");
const convertToFiatBtn = document.getElementById("convert-to-fiat");
const convertToPiBtn = document.getElementById("convert-to-pi");
const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");

function convertPiToFiat() {
    const currency = currencySelect.value;
    const piAmount = parseFloat(piInput.value);
    if (!isNaN(piAmount)) {
        fiatInput.value = (piAmount * piToFiatRate[currency]).toFixed(2);
    }
}

function convertFiatToPi() {
    const currency = currencySelect.value;
    const fiatAmount = parseFloat(fiatInput.value);
    if (!isNaN(fiatAmount)) {
        piInput.value = (fiatAmount * fiatToPiRate[currency]).toFixed(6);
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        themeLabel.textContent = "🌙 Dark Mode";
    } else {
        themeLabel.textContent = "☀️ Light Mode";
    }
}

convertToFiatBtn.addEventListener("click", convertPiToFiat);
convertToPiBtn.addEventListener("click", convertFiatToPi);
themeToggle.addEventListener("click", toggleTheme);

});


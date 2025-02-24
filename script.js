document.addEventListener("DOMContentLoaded", async function () { const piPriceElement = document.getElementById("piPrice"); const fromCurrency = document.getElementById("fromCurrency"); const toCurrency = document.getElementById("toCurrency"); const amountInput = document.getElementById("amount"); const resultElement = document.getElementById("result"); const donateButton = document.getElementById("donate");

async function fetchPiPrice() {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=usd,myr,idr,eur,gbp,sgd");
        const data = await response.json();
        return data["pi-network"];
    } catch (error) {
        console.error("Error fetching Pi price:", error);
        return null;
    }
}

async function updatePiPrice() {
    const prices = await fetchPiPrice();
    if (prices) {
        piPriceElement.textContent = `1 Pi = ${prices.usd} USD | ${prices.myr} MYR | ${prices.idr} IDR | ${prices.eur} EUR | ${prices.gbp} GBP | ${prices.sgd} SGD`;
    }
}

async function convertCurrency() {
    const prices = await fetchPiPrice();
    if (!prices) return;

    const amount = parseFloat(amountInput.value);
    if (isNaN(amount)) {
        resultElement.textContent = "Please enter a valid amount.";
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    let piToFiatRate = prices[to.toLowerCase()];
    let fiatToPiRate = 1 / prices[from.toLowerCase()];

    if (from === "PI") {
        resultElement.textContent = `${amount} Pi = ${(amount * piToFiatRate).toFixed(2)} ${to}`;
    } else if (to === "PI") {
        resultElement.textContent = `${amount} ${from} = ${(amount * fiatToPiRate).toFixed(4)} Pi`;
    } else {
        resultElement.textContent = "Invalid conversion. Please check your selection.";
    }
}

donateButton.addEventListener("click", function () {
    window.open("https://ton.org/donate", "_blank");
});

document.getElementById("convert").addEventListener("click", convertCurrency);

updatePiPrice();
setInterval(updatePiPrice, 60000);

});


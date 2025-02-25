document.getElementById("convertToFiat").addEventListener("click", function() {
    let piAmount = parseFloat(document.getElementById("piAmount").value);
    let currency = document.getElementById("currency").value;

    if (isNaN(piAmount) || piAmount <= 0) {
        alert("Please enter a valid Pi amount.");
        return;
    }

    getExchangeRate(currency, function(rate) {
        let fiatValue = piAmount * rate;
        document.getElementById("result").innerHTML = `💰 ${piAmount} Pi = ${fiatValue.toFixed(2)} ${currency}`;
    });
});

document.getElementById("convertToPi").addEventListener("click", function() {
    let fiatAmount = parseFloat(document.getElementById("fiatAmount").value);
    let currency = document.getElementById("currency").value;

    if (isNaN(fiatAmount) || fiatAmount <= 0) {
        alert("Please enter a valid Fiat amount.");
        return;
    }

    getExchangeRate(currency, function(rate) {
        let piValue = fiatAmount / rate;
        document.getElementById("result").innerHTML = `🔄 ${fiatAmount} ${currency} = ${piValue.toFixed(6)} Pi`;
    });
});

// Function to fetch real-time exchange rates
function getExchangeRate(currency, callback) {
    let apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=${currency.toLowerCase()}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let rate = data["pi-network"][currency.toLowerCase()];
            callback(rate);
        })
        .catch(error => {
            console.error("Error fetching exchange rate:", error);
            alert("Failed to fetch exchange rate. Please try again later.");
        });
}
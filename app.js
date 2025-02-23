async function convertPi() {
    let piAmount = document.getElementById("piAmount").value;
    let currency = document.getElementById("currency").value;
    
    if (piAmount === "" || piAmount <= 0) {
        alert("Please enter a valid Pi amount.");
        return;
    }

    try {
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=pi-network&vs_currencies=${currency.toLowerCase()}`);
        let data = await response.json();

        if (data["pi-network"] && data["pi-network"][currency.toLowerCase()]) {
            let price = data["pi-network"][currency.toLowerCase()];
            let convertedAmount = (piAmount * price).toFixed(2);
            document.getElementById("result").innerText = `${piAmount} Pi ≈ ${convertedAmount} ${currency}`;
        } else {
            document.getElementById("result").innerText = "Conversion rate not available.";
        }
    } catch (error) {
        document.getElementById("result").innerText = "Error fetching data.";
    }
}

function payWithPi() {
    alert("Pi Wallet Payment feature coming soon!");
}
function convertFiatToPi() {
    let fiatAmount = parseFloat(document.getElementById("fiatAmount").value);
    let currency = document.getElementById("fiatCurrency").value;
    let piToFiatRate = 6.62; // Assuming 1 Pi ≈ 6.62 MYR

    if (!isNaN(fiatAmount) && fiatAmount > 0) {
        let piValue = fiatAmount / piToFiatRate;
        document.getElementById("fiatToPiResult").innerText = fiatAmount + " " + currency + " ≈ " + piValue.toFixed(6) + " Pi";
    } else {
        document.getElementById("fiatToPiResult").innerText = "Please enter a valid amount.";
    }
}

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];
// show loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide loading
const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
const newQuote = () => {

    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (quote.author === "") {
        authorText.innerText = "Unknown";
    } else {
        authorText.innerText = quote.author;
    }
    // check quote length to determind styling
    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = quote.text;
    complete();
}

//  Get Quotes from API

async function getQuotes() {
    loading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error here

    }
}

//  Tweet Quote
const tweetQuote = () => {
    const twitterUlr = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.innerText)} - ${authorText.innerText}`;
    window.open(twitterUlr, "_blank");

}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
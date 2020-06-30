const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.querySelector('.new-quote');

async function getQuote() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const res = await fetch(proxyUrl + url);
    const data = await res.json();
    authorText.innerHTML = data.quoteAuthor || 'Unknown';

    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = data.quoteText;
  } catch (error) {
    getQuote();
    console.error("No quote :(", error);
  }
}

newQuoteBtn.addEventListener('click', getQuote);

getQuote();

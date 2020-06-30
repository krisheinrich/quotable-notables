const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.querySelector('.twitter-button');
const newQuoteBtn = document.querySelector('.new-quote');
const loader = document.querySelector('.loader');

// event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loaded() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    loading();
    const res = await fetch(proxyUrl + url);
    const data = await res.json();
    
    authorText.innerHTML = data.quoteAuthor || 'Unknown';

    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = data.quoteText;
    loaded();
  } catch (error) {
    getQuote();
    console.error("No quote :(", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// on load
getQuote();

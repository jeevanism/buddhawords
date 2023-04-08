// Log a message to the console when main.js is loaded
console.log('main.js loads');

// Get references to the button and quote display div elements in the HTML file
const buttonQuote = document.getElementById('displayRandomQuote');
const quoteDiv = document.getElementById('quote-display');

// Set intervals to update the quote colors and display a random quote every 5 seconds
setInterval(updateQuoteColors, 5000),
  setInterval(() => displayRandomQuote(), 5000);

// Async function to display a random quote from the JSON file
async function displayRandomQuote() {

  try {
    // Fetch the JSON data from the buddha.json file
    const response = await fetch('json/buddha.json');
    const data = await response.json();

    // Get a random quote from the data and display it in the quoteDiv element
    const randomIndex = Math.floor(Math.random() * data.length);
    const randomQuote = data[randomIndex].quote;
    quoteDiv.textContent = randomQuote;

    // Log a message to the console when the quote is updated
    console.log('quote updated');
  }
  catch (error) {
    // Log an error message to the console if there is an error fetching or displaying the quote
    console.error(error);
  }
}

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to get a matching font color based on background color
function getMatchingFontColor(background) {
  const rgb = hexToRgb(background);
  const yiq = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return yiq >= 128 ? "#000" : "#fff";
}

// Function to convert hex color to RGB color
function hexToRgb(hex) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
}

// Function to update the quote background and font color
function updateQuoteColors() {
  const backgroundColor = getRandomColor();
  const fontColor = getMatchingFontColor(backgroundColor);

  // Update the background and font color of the quoteDiv element
  quoteDiv.style.backgroundColor = backgroundColor;
  quoteDiv.style.color = fontColor;
}

// Call the updateQuoteColors function once at the beginning to set the initial colors
updateQuoteColors();

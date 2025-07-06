document.addEventListener("DOMContentLoaded", function(){
   

    const quoteDisplay = document.getElementById("quoteDisplay");
    const button = document.getElementById("newQuote");
    let quotes = [];
    
         const savedQuotes = localStorage.getItem("quotes");
          if (savedQuotes) {
            quotes = JSON.parse(savedQuotes);
           } else {
              quotes = [
                { text: "The best way to predict the future is to create it.", category: "Motivation" },
                { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
              ];
            }

    button.addEventListener("click", showRandomQuote);
    function showRandomQuote(){
        let randomIndex = Math.floor(Math.random()* quotes.length);
        let randomQuote =  quotes[randomIndex];

        quoteDisplay.innerHTML =  `<p>${randomQuote.text}</p><small>Category: ${randomQuote.category}</small>`;
    }

    function createAddQuoteForm(){
        const form = document.createElement("form");

        const quote =document.createElement("label");
        quote.setAttribute("for", "quoteText");
        quote.textContent = "Enter Quote:";
        const inputQuote = document.createElement("input");
        inputQuote.setAttribute("id", "quoteText");

        const inputCategory = document.createElement("input");
        const category =document.createElement("label");
         category.setAttribute("for", "category");
         category.textContent = "Enter category:";
         inputCategory.setAttribute("id", "category");

        const btn = document.createElement("button");
        btn.textContent= "add quote";
        btn.setAttribute("type", "submit");

        form.appendChild(quote);
        form.appendChild(inputQuote);
        form.appendChild(category);
        form.appendChild(inputCategory);
        form.appendChild(btn);

        document.getElementById("formContainer").appendChild(form);
             // Handle form submission
         form.addEventListener("submit", function(e) {
                 e.preventDefault();

               const quoteText = inputQuote.value.trim();
               const categoryText = inputCategory.value.trim();

                if (quoteText === "" || categoryText === "") {
                   alert("Please fill in both fields.");
                  return;
                }

            quotes.push({ text: quoteText, category: categoryText });
              saveQuotes();
              populateCategories();
            form.reset();

         });
    }
      // 🔸 5. Add Quote from Static HTML Form (Step 3)
window.addQuote = function () {
const quoteText = document.getElementById("newQuoteText").value.trim();
const categoryText = document.getElementById("newQuoteCategory").value.trim();

if (quoteText === "" || categoryText === "") {
    alert("Please fill in both fields.");
    return;
}

quotes.push({ text: quoteText, category: categoryText });
saveQuotes();
document.getElementById("newQuoteText").value = "";
document.getElementById("newQuoteCategory").value = "";
alert("Quote added successfully (from static form)!");
};
// 🔸 7. Initialize the dynamic form
createAddQuoteForm();
populateCategories();
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  document.getElementById("exportBtn").addEventListener("click", function () {
    const dataStr = JSON.stringify(quotes, null, 2); // convert to readable JSON
    const blob = new Blob([dataStr], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json"; // file name
    a.click();

    URL.revokeObjectURL(url); // cleanup
});

document.getElementById("importFile").addEventListener("change", function (event) {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
        try {
            const importedQuotes = JSON.parse(e.target.result);

            if (!Array.isArray(importedQuotes)) {
                throw new Error("Invalid file format.");
            }

            quotes.push(...importedQuotes); // add to existing
            saveQuotes(); // update localStorage
            alert("Quotes imported successfully!");
        } catch (err) {
            alert("Failed to import quotes: " + err.message);
        }
    };

    fileReader.readAsText(event.target.files[0]); // read file content
});

function populateCategories() {
    const filterSelect = document.getElementById("categoryFilter");
    const uniqueCategories = new Set();

    // Clear the dropdown first
    filterSelect.innerHTML = '<option value="all">All Categories</option>';

    // Collect unique categories
    quotes.forEach(quote => {
        uniqueCategories.add(quote.category);
    });

    // Add each unique category to the dropdown
    Array.from(uniqueCategories).map(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        filterSelect.appendChild(option);
    });
    

    // Restore previously selected filter if any
    const savedCategory = localStorage.getItem("selectedCategory");
    if (savedCategory) {
        filterSelect.value = savedCategory;
        filterQuotes(); // immediately filter quotes if saved category exists
    }
}

function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);

    let filteredQuotes;

    if (selectedCategory === "all") {
        filteredQuotes = quotes;
    } else {
        filteredQuotes = quotes.filter(q => q.category === selectedCategory);
    }

    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = "<p>No quotes available in this category.</p>";
        return;
    }

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    quoteDisplay.innerHTML = `<p>${quote.text}</p><small>Category: ${quote.category}</small>`;
}
// Step 1: Simulate Fetching Quotes from Server
async function fetchQuotesFromServer() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const serverData = await response.json();
  
      const serverQuotes = serverData.slice(0, 5).map(post => ({
        text: post.title,
        category: "Server"
      }));
  
      quotes = serverQuotes;
      saveQuotes();
      populateCategories();
      showRandomQuote();
  
      alert("Quotes updated from server.");
    } catch (error) {
      console.error("Error syncing with server:", error);
      alert("Failed to sync with server.");
    }
  }
  
  
  // Step 2: Automatically Fetch New Quotes Every 30 Seconds
  setInterval(fetchQuotesFromServer, 30000); // 30,000ms = 30s
  
  // Optional: Sync immediately on first load
  fetchQuotesFromServer();
  //  Manual Sync Button
document.getElementById("manualSyncBtn").addEventListener("click", function () {
    if (confirm("Syncing will replace your current quotes with server data. Continue?")) {
        fetchQuotesFromServer();
    }
});

// Step 3: Send Quotes to Server (POST)
async function sendQuotesToServer() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quotes)
      });
  
      const result = await response.json();
      console.log("Quotes posted to server:", result);
      alert("Quotes sent to server successfully!");
    } catch (error) {
      console.error("Failed to post quotes:", error);
      alert("Error sending quotes to server.");
    }
  }
  
  // Step 4: Add button listener
  document.getElementById("sendQuotesBtn").addEventListener("click", sendQuotesToServer);
  // Send all quotes to the server
  async function syncQuotes() {
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(quotes)
      });
  
      console.log("Quotes synced with server!"); // Required string
      alert("Quotes synced with server!");
    } catch (error) {
      console.error("Failed to sync quotes:", error);
    }
  }
  
  
});
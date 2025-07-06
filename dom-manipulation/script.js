document.addEventListener("DOMContentLoaded", function(){
    const quoteDisplay = document.getElementById("quoteDisplay");
    const button = document.getElementById("newQuote");
    let quotes = [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Life is really simple, but we insist on making it complicated.", category: "Life" }
    ];
    
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
document.getElementById("newQuoteText").value = "";
document.getElementById("newQuoteCategory").value = "";
alert("Quote added successfully (from static form)!");
};
// 🔸 7. Initialize the dynamic form
createAddQuoteForm();
});
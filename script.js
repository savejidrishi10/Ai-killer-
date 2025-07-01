
const apis = {
  openai: "sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  gemini: "AIzaSyXXXXXXXXXXXXXXXXXXX",
  deepseek: "sk-XXXXXXXXXXXXXXXXXXXXXXXXXXX"
};

let currentAPI = "openai";

function switchAPI(api) {
  currentAPI = api;
  document.getElementById("currentApiName").innerText = api;
}

async function sendMessage() {
  const userInput = document.getElementById("chat").value;
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "Thinking...";

  try {
    let responseText = "";
    if (currentAPI === "openai") {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + apis.openai
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userInput }]
        })
      });
      const data = await response.json();
      responseText = data.choices?.[0]?.message?.content || "No response";
    } else if (currentAPI === "gemini") {
      responseText = "Gemini API calling not implemented yet.";
    } else if (currentAPI === "deepseek") {
      responseText = "DeepSeek API calling not implemented yet.";
    }
    outputDiv.innerHTML = responseText;
  } catch (err) {
    outputDiv.innerHTML = "Error: " + err.message;
  }
}

// Function to load content dynamically using AJAX
function loadPageContent(page) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', page, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('dynamic-content').innerHTML = xhr.responseText;
        } else if (xhr.status !== 200) {
            document.getElementById('dynamic-content').innerHTML = "<p>Sorry, the page could not be loaded.</p>";
        }
    };
    xhr.send();
}

// Stealth Mode: Opens about:blank with the target website embedded in an iframe
function openStealthMode() {
    const url = prompt("Enter URL to open in Stealth Mode:");
    if (url) {
        const stealthWindow = window.open('about:blank', '_blank');
        stealthWindow.document.write(`
            <style>html, body { margin: 0; padding: 0; height: 100%; }</style>
            <iframe src="${url}" style="width:100%; height:100%; border:none;"></iframe>
        `);
    }
}

// Unblock Proxy: Redirect to the Ultraviolet proxy
function startProxy() {
    const url = document.getElementById('proxy-url').value;
    if (url) {
        window.location.href = `/proxy/${encodeURIComponent(url)}`;
    } else {
        alert("Please enter a valid URL.");
    }
}


// AI Chatbot - GPT-Neo integration with Hugging Face API
async function callAI() {
    const userInput = document.getElementById('user-input').value;
    const responseElement = document.getElementById('ai-response');

    if (userInput.trim() === "") {
        responseElement.innerHTML = "Please ask a question.";
        return;
    }

    try {
        responseElement.innerHTML = "Thinking...";
        const response = await fetch('https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-1.3B', {
            method: 'POST',
            headers: { 'Authorization': `Bearer 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`},
            body: JSON.stringify({ inputs: userInput })
        });

        const result = await response.json();
        responseElement.innerHTML = result[0].generated_text;
    } catch (error) {
        responseElement.innerHTML = "There was an error processing your request.";
        console.error("Error: ", error);
    }
}

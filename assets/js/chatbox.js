document.addEventListener("DOMContentLoaded", function () {
    
    const sendMessageButton = document.getElementById("sendMessage");
    const messageInput = document.getElementById("messageInput");
    const chatBox = document.getElementById("chatBox");

    function sendMessage() {
        let messageText = messageInput.value.trim();
        if (messageText === "") return; // Ignore empty messages

        // Create message bubble
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("p-2", "mb-2", "bg-secondary", "text-white", "rounded");
        messageDiv.innerHTML = `<strong>You</strong><p>${messageText}</p>`;

        // Append message and clear input
        chatBox.appendChild(messageDiv);
        messageInput.value = "";

        // Scroll to the bottom
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Event listener for button click
    sendMessageButton.addEventListener("click", sendMessage);

    // Send message on Enter key press
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

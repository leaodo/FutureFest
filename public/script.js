document.getElementById('send-button').addEventListener('click', async function () {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    
    appendMessage('Você: ' + userInput, 'user');

    
    document.getElementById('user-input').value = '';

    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        if (data.response) {
            
            appendMessage('AI: ' + data.response, 'ai');
        }
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
});


function appendMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

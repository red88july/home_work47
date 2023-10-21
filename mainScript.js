const inputAuthorValue = document.getElementById('author-input');
const inputAuthorMessage = document.getElementById('input-message');
const formElement = document.getElementById('form');
const serverResponse = document.getElementById('response-from-server');

const emptyInputElement = () => {
  inputAuthorValue.value = '';
  inputAuthorMessage.value = '';
};

const getRequestToServer = async () => {
  const authorName = inputAuthorValue.value;
  const authorMessage = inputAuthorMessage.value;

  const body = new URLSearchParams();
  body.append('author', authorName);
  body.append('message', authorMessage);

  try {
    await fetch('http://146.185.154.90:8000/messages', {method: 'POST', body});
  } catch (error) {
    console.log('Error sending message:', error);
  }
};

const makeMessages = async (message) => {
  const messageItem = document.createElement('div');
  const date = new Date (message.datetime).toString();
  messageItem.classList.add('alert', 'alert-info', 'mt-3');
  messageItem.innerHTML = `<strong><u>Author:</u></strong> ${message.author},
                            <br><i><b>Date: </b></i> ${date}, <br>
                            <i><b>Message: </b></i> ${message.message}`;
  serverResponse.appendChild(messageItem);
};

const fetchMessages = async () => {
  try {
    const response = await fetch('http://146.185.154.90:8000/messages');

    if (response.ok) {
      const data = await response.json();
      const reversDataOfNewToOld = data.reverse();
      serverResponse.innerHTML = '';

      reversDataOfNewToOld.forEach((message) => {
        makeMessages(message);
      })
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

formElement.addEventListener('submit', async (event) => {
  event.preventDefault();
  await getRequestToServer();
  emptyInputElement();
  await fetchMessages();
});

fetchMessages();

setInterval(fetchMessages, 3000);
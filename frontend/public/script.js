const parseJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
};

const userComponent = ({name,surname}) => {
    return `
    <div>
        <h1>${name}</h1>
        <h2>${surname}</h2>
    </div>
    `;
};

const endUserComponent = () => {
    return `
    <div>
        <input type="text" placeholder="First Name" name="name">
        <input type="text" placeholder="Last Name" name="surname">
        <button id="send">Send</button>
    </div>
    `
}

window.addEventListener('load', async () => {
    const result = await parseJSON('/api/v1/users');

    if(window.location.pathname === '/admin/order-view') {
        console.log("We are at the admin page")
    }
    else {
        console.log("We are at the customer page")
    }

    const rootElement = document.getElementById("root");
    rootElement.insertAdjacentHTML(
        'beforeend', 
        result.map(user => userComponent(user)).join("")
    )
    rootElement.insertAdjacentHTML('afterend', endUserComponent())

    const sendBtn = document.getElementById("send");
    sendBtn.addEventListener('click', () => {

        const userData = {
            name: document.querySelector(`input[name='name']`).value,
            surname: document.querySelector(`input[name='surname']`).value
        };

        const fetchSettings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };

        fetch('/users/new', fetchSettings)
        .then(async data => {
            const user = await data.json();

            rootElement.insertAdjacentHTML('beforeend', userComponent(user));
        });
    });
});
carregarItems();

function carregarItems() {
    let storedItems = JSON.parse(localStorage.getItem('items'));
    storedItems.forEach(item => {
        createListItem(item.username, item.password, item.date);
    });
}

function addUsuario() {
    let usernameValue = document.getElementById("username").value;
    let passwordValue = document.getElementById("password").value;
    let currentDate = new Date().toLocaleString();

    if (usernameValue === '') {
        alert("Insira um usuário");
    } else if(passwordValue === ''){
        alert("Insira uma senha");
    } else {
        let item = {
            username: usernameValue,
            password: passwordValue,
            date: currentDate
        };
        salvar(item);
        createListItem(usernameValue, passwordValue, currentDate);
        limparCampos();
    }

    }

function createListItem(username, password, date) {
    let li = document.createElement("li");
    li.textContent = `Usuário: ${username}   |   Senha: ${password}    |    Data: ${date}`;

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function() {
        let parent = this.parentElement;
        remover(parent);
        parent.remove();
    };
    li.appendChild(span);

    document.getElementById("itemLista").appendChild(li);
}

function limparCampos() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function limparUsuarios() {
        document.getElementById("itemLista").innerHTML = "";
        localStorage.removeItem('items');
}

function salvar(item) {
    let storedItems = JSON.parse(localStorage.getItem('items')) || [];
    storedItems.push(item);
    localStorage.setItem('items', JSON.stringify(storedItems));
}

function remover(element) {
    let content = element.textContent.replace("\u00D7", "").trim();
    let items = JSON.parse(localStorage.getItem('items')) || [];
    
    items = items.filter(item => {
        let itemContent = `Usuário: ${item.username}   |   Senha: ${item.password}    |    Data: ${item.date}`;
        return itemContent.trim() !== content;
    });

    localStorage.setItem('items', JSON.stringify(items));
}

function busca() {
    let query = document.getElementById("procurar").value.toLowerCase();
    let items = document.querySelectorAll('#itemLista li');
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(query)) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

function limparBusca() {
    document.getElementById("procurar").value = "";
    busca();
}
document.addEventListener('DOMContentLoaded', function() {
    // Carrega a lista de clientes ao iniciar a página
    carregarClientes();
});

document.getElementById('formCadastroCliente').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        identidade: document.getElementById('identidade').value,
        cpf: document.getElementById('cpf').value,
        passaporte: document.getElementById('passaporte').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        municipio: document.getElementById('municipio').value,
        estado: document.getElementById('estado').value
    };

    fetch('/cadastrarCliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert('Cliente cadastrado com sucesso!');
        carregarClientes(); // Recarrega a lista de clientes após o cadastro
        document.getElementById('formCadastroCliente').reset(); // Limpa o formulário
        habilitarForm(false); // Desabilita os campos após o cadastro
    })
    .catch(error => {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Erro ao cadastrar cliente.');
    });
});

function habilitarCadastro() {
    habilitarForm(true);
}

function habilitarForm(enable) {
    const inputs = document.querySelectorAll('#formCadastroCliente input');
    const button = document.querySelector('#formCadastroCliente button');
    inputs.forEach(input => input.disabled = !enable);
    button.disabled = !enable;
}

function carregarClientes() {
    fetch('/api/clientes')
        .then(response => response.json())
        .then(clientes => {
            const lista = document.getElementById('clientesCadastrados');
            lista.innerHTML = '';  // Limpa a lista atual
            clientes.forEach(cliente => {
                const div = document.createElement('div');
                div.textContent = `Código: ${cliente.codigo} - Nome: ${cliente.nome}`;
                lista.appendChild(div);
            });
        })
        .catch(error => console.error('Erro ao carregar clientes:', error));
}
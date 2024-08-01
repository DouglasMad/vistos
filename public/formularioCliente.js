document.getElementById('formularioCliente').addEventListener('submit', function(e) {
    e.preventDefault();  // Previne o envio padrão do formulário

    // Confirmação antes do envio
    if (!confirm('Tem certeza de que deseja enviar o formulário?')) {
        return; // Interrompe o envio se o usuário não confirmar
    }

    // Coleta de dados do formulário
    const formData = {
        cliente_id: document.getElementById('clienteSelecionado').value,
        declaracaoEstada: document.getElementById('declaracaoEstada').checked,
        declaracaoResidencia: document.getElementById('declaracaoResidencia').checked,
        enderecoCompleto: document.getElementById('enderecoCompleto').checked,
        fotos34: document.getElementById('fotos34').checked,
        certificadoCriminal: document.getElementById('certificadoCriminal').checked,
        comprovativoFinanceiro: document.getElementById('comprovativoFinanceiro').checked,
        interesseIEFP: document.getElementById('interesseIEFP').checked,
        termoAnuencia: document.getElementById('termoAnuencia').checked,
        checklistVFS: document.getElementById('checklistVFS').checked,
        pb4Tempo: document.getElementById('pb4Tempo').checked,
        registroCriminalPortugues: document.getElementById('registroCriminalPortugues').checked,
        dataEntrada: document.getElementById('dataEntrada').value,
        dataVolta: document.getElementById('dataVolta').value,
        dataEnvioVFS: document.getElementById('dataEnvioVFS').value,
        dataChegadaVFS: document.getElementById('dataChegadaVFS').value,
        dataEnvioConsulado: document.getElementById('dataEnvioConsulado').value
    };

    // Envio de dados do formulário para o servidor
    fetch('/salvarFormulario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Falha na rede ou resposta do servidor não é JSON!');
        }
        return response.json();  // Converte a resposta em JSON
    })
    .then(data => {
        if (data.error) {
            throw new Error(data.message);  // Trata erros enviados pelo servidor
        }
        alert('Formulário salvo com sucesso!');
        document.getElementById('formularioCliente').reset();  // Limpa o formulário após o envio bem-sucedido
    })
    .catch(error => {
        console.error('Erro ao salvar o formulário:', error);
        alert('Erro ao salvar o formulário: ' + error.message);  // Mostra erro ao usuário
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const dataEntrada = document.getElementById('dataEntrada');
    const dataVolta = document.getElementById('dataVolta');

    dataEntrada.addEventListener('change', function() {
        if (dataEntrada.value) {
            const entrada = new Date(dataEntrada.value);
            entrada.setDate(entrada.getDate() + 120); // Adiciona 120 dias à data de entrada
            dataVolta.value = entrada.toISOString().split('T')[0]; // Formata a data para o formato aaaa-mm-dd
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('clienteSelect');

    fetch('/clientes')
        .then(response => response.json())
        .then(data => {
            data.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.textContent = cliente.nome;
                select.appendChild(option);
            });
        })
        .catch(error => console.error('Erro ao carregar clientes:', error));
});
const express = require('express');
const path = require('path');
const db = require('./db'); // Certifique-se de que o caminho para o arquivo de conexão está correto
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para cadastrar clientes
app.post('/cadastrarCliente', (req, res) => {
    const { codigo, nome, identidade, cpf, passaporte, email, telefone, cep, rua, numero, bairro, municipio, estado } = req.body;
    const sql = `INSERT INTO cliente (codigo, nome, identidade, cpf, passaporte, email, telefone, cep, rua, numero, bairro, municipio, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [codigo, nome, identidade, cpf, passaporte, email, telefone, cep, rua, numero, bairro, municipio, estado], (err, result) => {
        if (err) {
            console.error('Erro ao cadastrar cliente:', err);
            res.status(500).send('Erro ao cadastrar cliente');
            return;
        }
        res.json({ message: 'Cliente cadastrado com sucesso' });
    });
});

// Rota para obter clientes (limitados aos últimos 3 adicionados)
app.get('/api/clientes', (req, res) => {
    const sql = 'SELECT codigo, nome FROM cliente ORDER BY codigo DESC LIMIT 3';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).send('Erro ao buscar clientes');
            return;
        }
        res.json(results);
    });
});

// Rota para salvar informações do formulário
app.post('/salvarFormulario', (req, res) => {
    const {
        cliente_id,
        declaracaoEstada, declaracaoResidencia, enderecoCompleto, fotos34, certificadoCriminal,
        comprovativoFinanceiro, interesseIEFP, termoAnuencia, checklistVFS, pb4Tempo,
        registroCriminalPortugues, dataEntrada, dataVolta, dataEnvioVFS, dataChegadaVFS, dataEnvioConsulado
    } = req.body;

    const sql = `
    INSERT INTO formulario (
        cliente_id, declaracao_estada, declaracao_residencia, endereco_completo, fotos_34,
        certificado_criminal, comprovativo_financeiro, interesse_iefp, termo_anuencia, checklist_vfs,
        pb4_tempo, registro_criminal_portugues, data_entrada, data_volta, data_envio_vfs,
        data_chegada_vfs, data_envio_consulado
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        cliente_id,
        declaracaoEstada, declaracaoResidencia, enderecoCompleto, fotos34, certificadoCriminal,
        comprovativoFinanceiro, interesseIEFP, termoAnuencia, checklistVFS, pb4Tempo,
        registroCriminalPortugues, dataEntrada, dataVolta, dataEnvioVFS, dataChegadaVFS, dataEnvioConsulado
    ], (err, result) => {
        if (err) {
            console.error('Erro ao salvar o formulário:', err);
            res.status(500).send('Erro ao salvar o formulário');
            return;
        }
        res.send('Formulário salvo com sucesso');
    });
});

// Inicializa o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

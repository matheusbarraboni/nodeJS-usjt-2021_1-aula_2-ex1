const http = require('http');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(porta);

let id = 2;
let alunos = [
    {
        id: 1,
        nome: 'José',
        fone: '11223344',
        email: 'jose@email.com'
    },
    {
        id: 2,
        nome: 'Maria',
        fone: '44332211',
        email: 'maria@email.com'
    }
]

app.post('/alunos', (req, res, next) => {
    const aluno = {
        id: id +=1,
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    };
    alunos.push(aluno);
    res.status(201).json(aluno);
});

app.get('/alunos', (req, res, next) => {
    res.status(201).json(alunos);
});

app.put('/alunos', (req, res, next) =>{
    alunos.forEach((aluno) => {
        if (aluno.id === req.body.id){
            aluno.fone = req.body.fone;
        }
    });
    res.status(204).end();
});

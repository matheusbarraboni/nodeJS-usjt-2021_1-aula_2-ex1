const http = require('http');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(porta);

let id_aluno = 2;
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
        id: id_aluno +=1,
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

let id_livro = 2;
let livros = [
    {
        id: 1,
        titulo: 'Introdução programação Java',
        descricao: 'Ensinamentos a linguagem java para iniciantes',
        edicao: 1,
        autor: 'João',
        valor: 'aaaa'
    },
    {
        id: 2,
        titulo: 'Código Limpo',
        descricao: 'Guiará a tornar seu código uma estória',
        edicao: 3,
        autor: 'Maria',
        valor: 'aaaa'
    }
]

app.get('/livros', (req, res, next) => {
    res.status(200).json(livros);
});

app.post('/livros', (req, res, next) => {
    const livro = {
        id: id_livro += 1,
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        edicao: req.body.edicao,
        autor: req.body.autor
    }
    livros.push(livro);
    res.status(201).json(livro);
});

function estaVazio(req, valor) {
    valor.forEach((item) => {
        if (req.body.item == null){
            valor.splice(item, 1);
        }
    });
    return valor;
}


// Por hora put altera somente a edição do livro
app.put('/livros', (req, res, next) => {
    var valores = ['titulo', 'descricao', 'edicao', 'autor'];
    valores = estaVazio(req, valores);
    livros.forEach((livro) => {
        if (livro.id === req.body.id){
            valores.forEach((valor) => {
                livro[valor] = req.body[valor];
            });
        }
    });
    res.status(200).json(valores);
});

app.delete('/livros/:id', (req, res, next) => {
    var existe = false;
    livros.forEach((livro, index) => {
        if (livro.id == req.params.id){
            livros.splice(index, 1);
            existe = true;
        }
    });
    if (existe){
        res.status(200).json(livros);    
    } else{
        res.status(404).json("Não foi encontrado livro com o id: "+ req.params.id);
    }   
});
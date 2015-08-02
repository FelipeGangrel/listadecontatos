var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

//informando ao server para buscar arquivos estáticos como CSS, HTML e Javascript
// no diretório /public
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Indicanto como o que fazer ao realizar uma requisição na rota '/contactlist'
app.get('/contactList', function (req, res){
  console.log('Recebi uma requisição GET');

  db.contactlist.find(function (err, docs){
    console.log(docs);
    res.json(docs);
  });
});

//Indicando o que deve ser feito ao realizar uma requisição http do tipo post
//pelo controller
app.post('/contactList', function (req, res){
  console.log(req.body);
  db.contactlist.insert(req.body, function (err, doc){
    res.json(doc);
  });
});

app.delete('/contactList/:id', function (req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.get('/contactList/:id', function (req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
    res.json(doc);
  });
});

app.put('/contactList/:id', function (req, res){
  var id = req.params.id;
  console.log(req.body.nome);

  db.contactlist.findAndModify({

    query: {_id: mongojs.ObjectId(id)},

    update: {$set: { nome: req.body.nome, email: req.body.email, telefone: req.body.telefone } },
    new: true}

    , function (err, doc){
      res.json(doc);
    });

});



app.listen(3000);
console.log('Server rodando na porta 3000');

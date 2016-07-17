import express from 'express';
const app = express();

import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

let db;

app.get('/api/todos', function(req, res, next){
    db.collection('todos').find().toArray(function(err, docs){
        res.json(docs);
    });
});

app.post('/api/todos', function(req, res, next){
    console.log("req body", req.body);
    let newTodo = req.body;
    newTodo.complete = false;
    db.collection('todos').insertOne(newTodo, function(err, result){
        var newId = result.insertedId;
        db.collection('todos')
        .find({_id: newId})
        .next(function(err, doc){
            res.json(doc);
        });
    });
});

app.put('/api/todos/:id', function(req, res, next){
    console.log("req", req.body)
    var oid = ObjectId(req.params.id);
    var todo = req.body;
    todo.complete = JSON.parse(todo.complete);
    console.log("req.body", todo)

    db.collection("todos")
        .update({_id: oid},
            {$set:
                {
                    title: todo.title,
                    complete: todo.complete}
                },
            function(err, result) {
            db.collection("todos")
                .find({_id: oid})
                .next(function(err, doc) {
                    res.json(doc);
          });
    });
})

app.delete('/api/todos/:id', function(req, res, next){
    var oid = ObjectId(req.params.id);
    db.collection("todos").remove({_id: oid});
})


MongoClient.connect('mongodb://localhost:27017/express-mongo-todo', function(err, dbConneciton){
    db = dbConneciton;
    const server = app.listen(3000, function(){
        const port = server.address().port;
        console.log("started server at port ", port)
    });
});

import supertest from 'supertest';
import routes from './webapp';
const app = supertest(routes);
import { expect } from 'chai';


describe('Todo routes', function(){
    beforeEach('drop collection', function(){
        console.log("hi",db)

    })
    // console.log(db)

     describe('`/api/todos` URI', function(){
         it ('GET responds with a list of todos', function(){
             return app
                    .get('/api/todos')
                    .expect(200)
                    .expect('Content-Type', 'application/json; charset=utf-8');
         })
     })
 })

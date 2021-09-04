const express = require('express');
const app = express();
const {buildSchema} = require('graphql');
const {graphqlHTTP} = require('express-graphql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/graphQL',
graphqlHTTP({
        schema: buildSchema(`
            type RootQuery{
                events :[String!]
            }
            type RootMutation{
                createEvent(name:String!):String
            }
            schema{
                query:RootQuery
                mutation:RootMutation
            }            
        `),
        rootValue:{
            events :()=>{
                return ['Event1','Event2']
            },
            createEvent: args =>{
                const eventName = args.name;
                return `${eventName}`
            }
        },
        graphiql : true
    })  
)

app.get('/',(req,res)=>{
    res.send('Welcome to graphQL tutorial')
})

app.listen(3000,()=>console.log(`Listeninig on PORT 3000`))
import { config } from 'dotenv'
import express from 'express'
import { connect as mongoConnect } from 'mongoose'


import Ticket from 'models/Ticket'

config()

mongoConnect(process.env.MONGO_URI)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err))

const app = express()

// To parse the request body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get('/test', (_, res) => res.send('This is a test'))

// app.post('/addTodo', async (req, res) => {
//     const { body } = req

//     const newTodo = new Todo(body)
//     const savedtodo = await newTodo.save()

//     return res.send(savedtodo)
// })

// app.delete('/deleteTodo', async (req, res) => {
//     const {
//         body: { todoId },
//     } = req

//     const response = await Todo.findByIdAndDelete(todoId)
//     return res.send(response)
// })

// app.get('/getAllTodos', async (_, res) => {
//     const response = await Todo.find({})
//     return res.send(response)
// })

app.use((req, res) => res.status(404).send('Page not found'));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))

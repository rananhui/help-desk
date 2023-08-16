import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import { connect as mongoConnect } from 'mongoose'
import ticketController from './controllers/ticketControllers'

import Ticket from 'models/Ticket'

config()

mongoConnect(process.env.MONGO_URI)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err))

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.post('/ticket', ticketController.generateTicketId, ticketController.submitTicket, 
(req, res) => res.sendStatus(200))

app.get('/tickets', ticketController.getTickets, 
(req, res) => res.status(200).json(res.locals.tickets))

app.post('/response', ticketController.respondToTicket, 
(req, res) => res.sendStatus(200))

app.patch('/status', ticketController.updateStatus, 
(req, res) => res.sendStatus(200))

app.patch('/assigned', ticketController.updateAssigned, 
(req, res) => res.sendStatus(200))



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

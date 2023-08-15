import { Schema, model } from 'mongoose'

const ticketSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, default: 'New'}
})

const ticketModel = model('ticket', ticketSchema)
export default ticketModel

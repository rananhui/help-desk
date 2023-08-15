import Ticket from 'models/Ticket'

const ticketController = {}

ticketController.generateTicketId = async (req, res, next) => {
    try {
        const count = Ticket.countDocuments();
        res.locals.ticketId = `Ticket #${count + 1}`
        return next()
    } catch (err){
        return next({
            log: 'Express error occurred generateTicketId: ' + err,
            status: 400,
            message: { err: 'ticketController.generateTicketId: An error occurred' },
        })
    }
}

ticketController.submitTicket = (req, res, next) => {
    const { name, email, subject, description } = req.body
    const { ticketId } = res.locals.ticketId
    // Ticket.create({name, email, subject, description, ticketId}, (err, data) => {
    //     if(err){
    //         return next({
    //             log: 'Express error occurred submitTicket: ' + err,
    //             status: 400,
    //             message: { err: 'ticketController.submitTicket: An error occurred' },
    //         })
    //     }
    //     return next();
    // })
    Ticket.create({name, email, subject, description, ticketId})
    .then((data) => {
        console.log(data)
        return next()
    })
    .catch((err) => {
        return next({
            log: 'Express error occurred submitTicket: ' + err,
            status: 400,
            message: { err: 'ticketController.submitTicket: An error occurred' },
        })
    })
}

ticketController.getTickets = (req, res, next) => {
    // Ticket.find({}, (err, tickets) => {
    //     if(err){
    //         return next({
    //             log: 'Express error occurred getTicket: ' + err,
    //             status: 400,
    //             message: { err: 'ticketController.getTickets: An error occurred' },
    //         })
    //     }
    //     res.locals.tickets = tickets
    //     return next();
    // })
    Ticket.find({})
    .then((tickets) => {
        res.locals.tickets = tickets
        return next()
    })
    .catch((err) => {
        return next({
            log: 'Express error occurred getTicket: ' + err,
            status: 400,
            message: { err: 'ticketController.getTicket: An error occurred' },
        })
    })
}

ticketController.respondToTicket = (req, res, next) => {
    const { name, email, subject, response, ticketId } = req.body
    console.log('Would normally send email here with body')
    return next()
}

ticketController.updateStatus = (req, res, next) => {
    const { ticketId } = req.body.ticketId
    const { newStatus } = req.body.status
    Ticket.updateOne({ticketId: ticketId}, {$set: {status: newStatus}}, {new: true})
    .then((data) => {
        console.log(data)
        return next()
    })
    .catch((err) => {
        return next({
            log: 'Express error occurred updateStatus: ' + err,
            status: 400,
            message: { err: 'ticketController.updateStatus: An error occurred' },
        })
    })
}




module.exports = ticketController
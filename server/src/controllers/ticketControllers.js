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
    Ticket.create({name, email, subject, description, ticketId}, (err, data) => {
        if(err){
            return next({
                log: 'Express error occurred submitTicket: ' + err,
                status: 400,
                message: { err: 'ticketController.submitTicket: An error occurred' },
            })
        }
        return next();
    })
}

ticketController.getTickets = (req, res, next) => {
    Ticket.find({}, (err, tickets) => {
        if(err){
            return next({
                log: 'Express error occurred getTicket: ' + err,
                status: 400,
                message: { err: 'ticketController.getTickets: An error occurred' },
            })
        }
        res.locals.tickets = tickets
        return next();
    })
}

ticketController.respondToTicket = (req, res, next) => {
    const { name, email, subject, response, ticketId } = req.body
    console.log('Would normally send email here with body')
    return next()
}





module.exports = ticketController
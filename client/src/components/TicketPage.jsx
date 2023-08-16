import React, { useState } from 'react';
import '../styles/TicketPage.css';

const TicketPage = () => {
    const [ticket, setTicket] = useState({
        name: '',
        email: '',
        subject: '',
        description: ''
    })

    const handleChange = (e) => {
        const {type, value} = e.target
        setTicket(prevValues => ({...prevValues, [type]: value}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()

    }
    return (
        <div className="ticket-container">
            <h1>Submit a Ticket</h1>
            <form className="ticket-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={ticket.name} onChange={handleChange}/>
                <input type="text" name="email" placeholder="Email" value={ticket.email} onChange={handleChange}/>
                <input type="text" name="subject" placeholder="Subject" value={ticket.subject} onChange={handleChange}/>
                <textarea name="description" placeholder="Please enter a detailed description of your issue" value={ticket.name} onChange={handleChange}/>
                <button type="submit">Submit ticket</button>
            </form>
        </div>
    )
}



export default TicketPage;
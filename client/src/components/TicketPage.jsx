import React, { useState } from 'react';
import { Alert } from '@mui/material';
import '../styles/TicketPage.css';

const TicketPage = () => {
    const [ticket, setTicket] = useState({
        name: '',
        email: '',
        subject: '',
        description: ''
    })

    const [ticketPopup, setTicketPopup] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setTicket(prevValues => ({...prevValues, [name]: value}))
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://help-desk-w8aq.onrender.com/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        })
        .then((response) => {
            if(response.ok){
                setTicketPopup(true)
                setTicket({
                    name: '',
                    email: '',
                    subject: '',
                    description: ''
                })
            }else {
                console.log('Ticket submission failed')
            }
        })
        .catch((err) => { console.log('An error has occurred: ', err)})
    }
    return (
        
        <div className="ticket-container">
            <h1>Submit a Ticket</h1>
            <form className="ticket-form" onSubmit={handleSubmit}>
                <input 
                 type="text" 
                 name="name" 
                 placeholder="Name" 
                 value={ticket.name} 
                 onChange={handleChange}/>
                <input 
                 type="text" 
                 name="email" 
                 placeholder="Email" 
                 value={ticket.email} 
                 onChange={handleChange}/>
                <input 
                 type="text" 
                 name="subject" 
                 placeholder="Subject" 
                 value={ticket.subject} 
                 onChange={handleChange}/>
                <textarea 
                 name="description" 
                 className="ticket-textarea"
                 placeholder="Please enter a detailed description of your issue" 
                 value={ticket.description} 
                 onChange={handleChange} 
                 rows="10" 
                 cols="50"/>
                <button type="submit" style={{ marginBottom: '10px' }}>Submit ticket</button>
                {ticketPopup && (
                    <Alert severity="success" onClose={() => {setTicketPopup(false)}}>
                        Ticket sent!
                    </Alert>
                )}
            </form>
        </div>
    )
}



export default TicketPage;
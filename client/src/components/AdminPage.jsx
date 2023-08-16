import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Collapse, MenuItem, Select, Alert, AlertTitle } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../styles/AdminPage.css';

const AdminPage = () => {
    const [tickets, setTickets] = useState([])
    const [responsePopup, setResponsePopup] = useState(false)

    useEffect(() => {
        fetchTickets()
    }, [])

    const handleAssignmentChange = (e, currTicketId) => {
        e.stopPropagation()
        const newAssigned = e.target.textContent
        fetch('https://help-desk-w8aq.onrender.com/assigned', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticketId : currTicketId, assigned: newAssigned})
        })
        .then((response) => {
            if(response.ok){
                console.log('Assigned updated successfully')
            }else {
                console.log('Assigned update failed')
            }
        })
        .catch((err) => { console.log('An error has occurred: ', err)})

        const updatedTickets = tickets.map(ticket => ticket.ticketId === currTicketId ? {...ticket, assigned: newAssigned} : ticket)
        setTickets(updatedTickets)
    }
    
    const handleStatusChange = (e, currTicketId) => {
        e.stopPropagation()
        const newStatus = e.target.textContent
        fetch('https://help-desk-w8aq.onrender.com/status', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticketId : currTicketId, status: newStatus})
        })
        .then((response) => {
            if(response.ok){
                console.log('Status updated successfully')
            }else {
                console.log('Status update failed')
            }
        })
        .catch((err) => { console.log('An error has occurred: ', err)})

        const updatedTickets = tickets.map(ticket => ticket.ticketId === currTicketId ? {...ticket, status: newStatus} : ticket)
        setTickets(updatedTickets)
    }

    const sendResponse = (e, currTicketId) => {
        const textarea = e.target.parentNode.querySelector('.response-textarea')
        const response = textarea.value
        fetch('https://help-desk-w8aq.onrender.com/response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ticketId : currTicketId, response: response})
        })
        .then((response) => {
            if(response.ok){
                setResponsePopup(true)
                textarea.value = ''
            }else {
                console.log('Email failed to send')
            }
        })
        .catch((err) => { console.log('An error has occurred: ', err)})
    }
    
    

    const fetchTickets = () => {
        fetch('https://help-desk-w8aq.onrender.com/tickets')
        .then((response) => {
            if(!response.ok){
                console.log('Network error')
            }
            return response.json()
        })
        .then(tickets => { setTickets(tickets) })
        .catch((err) => { console.log('An error has occurred: ', err)})
    }


    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            {tickets.map(ticket => (
                <Accordion key={ticket.ticketId} className="ticket-accordion">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-header">
                    <div className="ticket-header-content">
                        <Typography className="ticket-id">{ticket.ticketId}</Typography>
                        <Typography className="subject"> Subject: {ticket.subject}</Typography>
                    </div>
                    <div className="dropdowns">
                        <Select value={ticket.assigned} onClick={(e) => handleAssignmentChange(e, ticket.ticketId)}>
                            <MenuItem value="Assigned">Assigned</MenuItem>
                            <MenuItem value="Unassigned">Unassigned</MenuItem>
                        </Select>
                        <Select value={ticket.status} onClick={(e) => handleStatusChange(e, ticket.ticketId)}>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Resolved">Resolved</MenuItem>
                         </Select>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                    <div className="ticket-details">
                      <Typography>
                        Ticket created by: {ticket.name}
                      </Typography>
                      <Typography>
                        Email: {ticket.email}
                      </Typography>
                      <Typography>
                        Description: {ticket.description}
                      </Typography>
                      <textarea
                        className="response-textarea"
                        rows="10"
                        cols="50"
                        placeholder="Enter a response"
                        value={ticket.adminResponse}
                      />
                    </div>
                      <button onClick={(e) => sendResponse(e, ticket.ticketId)}
                      style={{ marginBottom: '10px' }}>
                        Submit response
                      </button>
                      {responsePopup && (
                        <Alert severity="success" onClose={() => {setResponsePopup(false)}}>
                            Email sent!
                        </Alert>
                        )}
                    </Collapse>
                  </AccordionDetails>
                </Accordion>
              ))}
        </div>
    )
}



export default AdminPage;
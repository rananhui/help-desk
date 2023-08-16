import React, { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Collapse, MenuItem, Select } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import '../styles/AdminPage.css';

const AdminPage = () => {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        fetchTickets();
    }, [])

    const handleAssignmentChange = (event) => {
        event.stopPropagation();
      };
    

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
            <h1>Admin Page</h1>
            {tickets.map(ticket => (
                <Accordion key={ticket.ticketId} className="ticket-accordion">
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} className="accordion-header">
                    <div className="ticket-header-content">
                        <Typography className="ticket-id">{ticket.ticketId}</Typography>
                        <Typography className="subject"> Subject: {ticket.subject}</Typography>
                    </div>
                    <div className="dropdowns">
                        <Select onClick={handleAssignmentChange}>
                            <MenuItem value="assigned">Assigned</MenuItem>
                            <MenuItem value="unassigned">Unassigned</MenuItem>
                        </Select>
                        <Select value={ticket.status}>
                            <MenuItem value="new">New</MenuItem>
                            <MenuItem value="in-progress">In Progress</MenuItem>
                            <MenuItem value="resolved">Resolved</MenuItem>
                         </Select>
                     </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                      {ticket.description}
                    </Collapse>
                  </AccordionDetails>
                </Accordion>
              ))}
        </div>
    )
}



export default AdminPage;
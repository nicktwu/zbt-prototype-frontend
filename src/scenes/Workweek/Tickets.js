/**
 * Created by nwu on 7/16/17.
 */
import React, { Component } from 'react';
import { url } from 'urls';
import { Table, Button, Panel } from 'react-bootstrap';

class TicketView extends Component {


    constructor(props) {
        super(props);
        this.state = {tickets:[]};
        this.takeTicket = this.takeTicket.bind(this)
    }

    componentWillMount() {
        return fetch(url+"workweek/").then(response=>response.json()).then(response=>{
            this.setState(response)
        })
    }

    takeTicket(id) {
        return ()=> {
            console.log('taking')
            fetch(url + "workweek/take/" + id).then(response => response.json()).then(response => {
                this.setState(response)
            })
        }
    }


    render () {
        if (!this.state.authorized) {
            return (
                <Panel>You are not an authorized dev. If you would like to be, you can ask Nick about it.</Panel>
            )
        }
        return (
            <Table>
                <thead>
                <tr>
                    <th>Ticket ID</th>
                    <th>Ticket Description</th>
                    <th>Ticket Value (Hours)</th>
                    <th>Taken by</th>
                    <th>Completed</th>
                </tr>
                </thead>
                <tbody>
                { this.state.tickets && this.state.tickets.length > 0 ? this.state.tickets.map(ticket=>{
                    return (
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.description}</td>
                            <td>{ticket.hours}</td>
                            <td>{ticket.taker ? ticket.taker : <Button onClick={this.takeTicket(ticket.id)}>Take</Button>}</td>
                            <td>{ticket.completed ? "Yes":"No"}</td>
                        </tr>
                    )
                }) : <tr><td colSpan={5}>No tickets</td></tr>}
                </tbody>
            </Table>
        )
    }
}

export { TicketView }
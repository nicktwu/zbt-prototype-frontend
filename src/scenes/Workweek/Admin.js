/**
 * Created by nwu on 7/16/17.
 */
import React, {Component} from 'react';
import {url} from 'urls';
import {AuthorizationPanel} from 'components';
import { Form, FormGroup, FormControl, Button, Table, ControlLabel, Panel } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    componentWillMount() {
        return fetch(url+'workweek/admin').then(response=>response.json()).then(response=>{
            this.setState({authorized:response.authorized, tickets:response.tickets})
        })
    }

    render() {
        return (
            <AuthorizationPanel authorized={this.state.authorized}><TicketEdit tickets={this.state.tickets} /></AuthorizationPanel>
        )
    }
}

class TicketEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            tickets:props.tickets,
            ticket_counter:0,
        };
        this.loadTickets = this.loadTickets.bind(this);
    }

    loadTickets() {
        return fetch(url+'workweek/admin').then(response=>response.json()).then(response=>{
            this.setState({tickets:response.tickets})
        })
    }

    render() {
        return (
            <div>
                <Panel header="Create ticket">
                    <CreateTicketForm refresh={this.loadTickets}/>
                </Panel>
                <Table>
                    <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>Ticket Description</th>
                        <th>Ticket Value (Hours)</th>
                        <th>Taken by</th>
                        <th>Completed</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.tickets && this.state.tickets.length > 0 ? this.state.tickets.map((ticket, index)=>{
                        return (
                            <SingleTicketForm ticket={ticket} key={index}/>
                        )
                    }) : null}
                    </tbody>
                </Table>
            </div>
        )
    }
}

class CreateTicketForm extends Component {
    constructor(props) {
        super(props);
        this.state= {
            description:'',
            hours:0,
        };
        this.editTicket = this.editTicket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    editTicket(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(url+"workweek/admin/ticket/create", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(this.state)
        }).then(()=>{this.props.refresh()})
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" onChange={this.editTicket} name="description" value={this.state.description}/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Hours</ControlLabel>
                    <FormControl type="number" onChange={this.editTicket} name="hours" value={this.state.hours}/>
                </FormGroup>
                <Button type="submit">Create</Button>
            </Form>
        )
    }
}

class SingleTicketForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            id: props.ticket.id,
            description:props.ticket.description,
            hours:props.ticket.hours,
            completed:props.ticket.completed
        };
        this.editTicket = this.editTicket.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    editTicket(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(url+"workweek/admin/ticket/edit", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(this.state)
        }).catch((err)=>{console.log(err)})
    }

    render() {
        return (
            <tr>
                <td>{this.props.ticket.id}</td>
                <td><FormGroup>
                    <FormControl componentClass="textarea" onChange={this.editTicket} name="description" value={this.state.description}/>
                </FormGroup></td>
                <td><FormGroup>
                    <FormControl type="number" onChange={this.editTicket} name="hours" value={this.state.hours}/>
                </FormGroup></td>
                <td>{this.props.ticket.taker}</td>
                <td><FormGroup>
                    <FormControl type="checkbox" onChange={this.editTicket} name="completed" value={this.state.completed}/>
                </FormGroup></td>
                <td>
                    <Button onClick={this.handleSubmit}>Save</Button>
                </td>
            </tr>
        )
    }
}


export {Dashboard}
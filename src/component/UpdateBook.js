import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class UpdateBook extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            show: false
        }
    }
    closeM = () => {
        this.setState({
            show: false
        })
    }
    showM = () => {
        this.setState({
            show: true
        })
    }

    editBook = async (event) => {
        event.preventDefault();
        let bookInfo = {
            bookTitle: event.target.title.value,
            bookDescription: event.target.description.value,
            bookStatus: event.target.status.value,
            userEmail: this.state.data.email,
            id: this.state.data._id
        }
        let newData = await axios.put(`http://localhost:3001/updateBook`, bookInfo);
        this.setState({
            cats: newData.data
        })
        this.closeM();
    }
    render() {
        return (
            <div>
                    <Button variant="outline-dark" onClick={this.showM} style={{margin: '0px', display:'flex', float: 'right'}}>Edit</Button>
                <Modal show={this.state.show} onHide={this.closeM}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.editBook}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" name="title" defaultValue={this.state.data.title} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" placeholder="Status" name="status" defaultValue={this.state.data.status} />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Description" name="description" defaultValue={this.state.data.description} />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeM}>Close</Button>
                                <Button type="submit">Confirm</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}

export default withAuth0(UpdateBook)
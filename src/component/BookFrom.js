import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react';


class BookForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    addBook = async (e) => {
        e.preventDefault()
        let Bookforinfo = {
            bookTitle: e.target.title.value,
            bookDescription: e.target.description.value,
            bookStatus: e.target.status.value,
            userEmail: this.props.auth0.user.email
        }
        this.props.add(Bookforinfo)
        this.setState({
            show: false
        })
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
    render() {
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="outline-dark" onClick={this.showM}  style={{marginBottom:'10px'}}>Add a book</Button>
                </div>
                <Modal show={this.state.show} onHide={this.closeM}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.addBook}>
                            <Form.Group>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" name="title" />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" placeholder="Status" name="status" />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Description" name="description" />
                            </Form.Group>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeM}>Close</Button>
                                <Button type="submit">Add</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}

export default withAuth0(BookForm)
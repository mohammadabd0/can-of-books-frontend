import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import BookForm from './component/BookFrom'

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Bookinfo: [],
    }
  }
componentDidMount = async ()=>{
  // http://localhost:3001/getbooks?email=mohammadabdo518@gmail.com
   let email = this.props.auth0.user.email
   console.log('sssss',email)
  let bookData = await axios.get(`http://localhost:3001/getbooks?email=${email}`)
  this.setState({
    Bookinfo: bookData.data
  })
  console.log('for test data',this.state.Bookinfo)
}
addBook = async (Bookforinfo) => {
  let bookData = await axios.post(`http://localhost:3001/addBook`, Bookforinfo)
  console.log('sssss',bookData)

  this.setState({
    Bookinfo: bookData.data
  })
}
remove = async (id) => {
  let email = this.props.auth0.user.email
  let bookData = await axios.delete(`http://localhost:3001/deleteBook?bookID=${id}&email=${email}`)
  this.setState({
    Bookinfo: bookData.data
  })
}

render() {
  this.componentDidMount()
  return (
    <>
      <h1>My Favorite Books</h1>
        <p>
         This is a collection of my favorite books</p>
      <BookForm add={this.addBook} />
      <CardGroup>
        {
          this.state.Bookinfo.map((item, idx) => {
            return (
              <Card key={idx}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle >{item.status}</Card.Subtitle>
                  <Card.Text>  {item.description}</Card.Text>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="outline-danger" onClick={() => { this.remove(item._id) }} style={{ float: 'right', margin: '0px' }}>Remove</Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        }
      </CardGroup>
    </>
  )
}
}
export default withAuth0(MyFavoriteBooks);




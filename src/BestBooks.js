import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from "@auth0/auth0-react";
import Card from 'react-bootstrap/Card'
import axios from 'axios'
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
  let bookData = await axios.get(`https://backend-api30.herokuapp.com/getbooks?email=${email}`)
  this.setState({
    Bookinfo: bookData.data
  })
  console.log('for test data',this.state.Bookinfo)
}

  render() {
    return(
      <>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.Bookinfo.map(element => {
            return (
              <Card>
                <Card.Body>
                  <Card.Title>{element.title}</Card.Title>
                  <Card.Text>{element.description}</Card.Text>
                  <Card.Text>{element.status}</Card.Text>
                </Card.Body>
              </Card>
            )
          })}
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);




import React,{Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharPage, HousePage, BookPage, BookItem} from '../pages';
import ErrorMessage from '../errorMessage';
import Service from '../services/services';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './app.css';






export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            showRandomChar: true,
            error: false
        }
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error: true
        })
    }

    onToggleHide = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };

    service = new Service();

    render(){
    const randomChar = this.state.showRandomChar ? <RandomChar/> : null;

        if(this.state.error){
            return <ErrorMessage/>
        }

        return (
            <Router>
                <div className='app'> 
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {randomChar}
                                <button
                                type = "button"
                                className = "toggle-btn"
                                onClick={this.onToggleHide}>
                                Hide random character</button>
                            </Col>
                        </Row>

                        <Route path='/characters' component={CharPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params;
                                console.log(id, match);
                                return <BookItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        );
        }
};


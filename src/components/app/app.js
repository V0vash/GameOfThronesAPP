import React,{Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import CharPage from '../pages/characterPage';
import HousePage from '../pages/housePage';
import BookPage from '../pages/bookPage';
import ErrorMessage from '../errorMessage';
import './app.css';

import Service from '../services/services';



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
            <> 
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
                    <CharPage/>
                    <BookPage/>
                    <HousePage/>
                </Container>
            </>
        );
        }
};


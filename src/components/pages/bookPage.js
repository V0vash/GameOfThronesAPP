import React,{Component} from 'react';
import ItemList from '../itemList';
import ErrorMessage from '../errorMessage';
import Service from '../services/services';
import {withRouter} from 'react-router-dom';

class BookPage extends Component {

    service = new Service();

    state ={
        error: false
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error: true
        })
    }

    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }
        
        return(
            <ItemList 
                onItemSelected={(itemId) => {
                    this.props.history.push(`${itemId}`)
                }}
                getData={this.service.getAllBooks}
                renderItem={(item) => `${item.name}`} />
        )
    }
}

export default withRouter (BookPage);
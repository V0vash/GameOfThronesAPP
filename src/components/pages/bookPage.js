import React,{Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import Service from '../services/services';
import RowBlock from '../rowBlock/rowBlock';

export default class BookPage extends Component {

    service = new Service();

    state ={
        selectedBook: null,
        error: false
    }

    componentDidCatch(){
        console.log('error');
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedBook: id
        })
    }

    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.service.getAllBooks}
                renderItem={(item) => `${item.name}`} />
        )

        const bookDetails = (
            <ItemDetails 
                itemId={this.state.selectedBook}
                getData={this.service.getBook}>
                    <Field field='numberOfPages' label='Number of pages'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='released' label='Released'/>
                    <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        
        return(
            <RowBlock 
            list={itemList}
            details={bookDetails}/>
        )
    }
}
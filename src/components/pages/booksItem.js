import React,{Component} from 'react';
import ItemDetails, {Field} from '../itemDetails';
import Service from '../services/services';

export default class BookItem extends Component {

    service = new Service();

    render() {
        return(
        <ItemDetails 
                itemId={this.props.bookId}
                getData={this.service.getBook}>
                    <Field field='numberOfPages' label='Number of pages'/>
                    <Field field='publisher' label='Publisher'/>
                    <Field field='released' label='Released'/>
                    <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
    }
}
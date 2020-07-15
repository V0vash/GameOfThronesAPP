import React,{Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import Service from '../services/services';
import RowBlock from '../rowBlock/rowBlock';

export default class CharPage extends Component {

    service = new Service();

    state ={
        selectedChar: 130,
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
            selectedChar: id
        })
    }

    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.service.getAllCharacters}
                renderItem={(item) => `${item.name} (${item.gender})`} />
        )

        const charDetails = (
            <ItemDetails 
                itemId={this.state.selectedChar}
                getData={this.service.getCharacter}>
                    <Field field='gender' label='Gender'/>
                    <Field field='born' label='Born'/>
                    <Field field='died' label='Died'/>
                    <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        
        return(
            <RowBlock 
            list={itemList}
            details={charDetails}/>
        )
    }
}
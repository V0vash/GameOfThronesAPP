import React,{Component} from 'react';
import ItemList from '../itemList';
import ItemDetails, {Field} from '../itemDetails';
import ErrorMessage from '../errorMessage';
import Service from '../services/services';
import RowBlock from '../rowBlock/rowBlock';

export default class HousePage extends Component {

    service = new Service();

    state ={
        selectedHouse: null,
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
            selectedHouse: id
        })
    }

    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }

        const itemList = (
            <ItemList 
                onItemSelected={this.onItemSelected}
                getData={this.service.getAllHouses}
                renderItem={(item) => `${item.name}`} />
        )

        const houseDetails = (
            <ItemDetails 
                itemId={this.state.selectedHouse}
                getData={this.service.getHouse}>
                    <Field field='region' label='Region'/>
                    <Field field='words' label='Words'/>
                    <Field field='titles' label='Titles'/>
                    <Field field='ancestralWeapons' label='Ancestral Weapons'/>
            </ItemDetails>
        )
        
        return(
            <RowBlock 
            list={itemList}
            details={houseDetails}/>
        )
    }
}
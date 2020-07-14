import React,{Component} from 'react';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
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

    onCharSelected = (id) => {
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
                        onCharSelected={this.onCharSelected}
                        getData={this.service.getAllCharacters}
                        renderItem={(item) => `${item.name} (${item.gender})`} />
        )

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}/>
        )
        
        return(
            <RowBlock 
            list={itemList}
            details={charDetails}/>
        )
    }
}
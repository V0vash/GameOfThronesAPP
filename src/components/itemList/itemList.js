import React, {Component} from 'react';
import Service from '../../components/services/services';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
export default class ItemList extends Component {

    service = new Service();

    state = {
        charList: null,
        loading: true,
        error: false
    }

    componentDidMount(){
        this.service.getAllCharacters()
            .then( (charList) =>{
                this.setState ({
                    charList,
                    loading: false,
                    error: false
                });
            })
            .catch(() => {
                this.setState({
                    charList: null,
                    error: true,
                    loading: false
                });
            })
    }

    componentDidCatch(){
        this.setState({
            charList: null,
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id, name} = item;
            return(
                <li 
                    key = {id}
                    className="list-group-item"
                    onClick = {() => this.props.onCharSelected(id)}>
                    {name}
                </li>
            )
        })
    }

    render() {

        console.log(this.state.error)

        if (this.state.error) {
            return (
                <div className="char-details rounded">
                    <ErrorMessage/>
                </div>
            )
        }

        if(this.state.loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {charList} = this.state;

        const items = this.renderItems(charList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
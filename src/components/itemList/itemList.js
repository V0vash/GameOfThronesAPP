import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

export default class ItemList extends Component {

    state = {
        itemList: null,
        loading: true,
        error: false
    }

    componentDidMount(){
        const {getData} = this.props;

        getData()
            .then( (itemList) =>{
                this.setState ({
                    itemList,
                    loading: false,
                    error: false
                });
            })
            .catch(() => {
                this.setState({
                    itemList: null,
                    error: true,
                    loading: false
                });
            })
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true,
            loading: false
        })
    }

    renderItems(arr) {
        return arr.map((item) => {
            const {id} = item;
            // console.log('props',this.props.renderItem(item));
            const label = this.props.renderItem(item);
            return(
                <li 
                    key = {id}
                    className="list-group-item"
                    onClick = {() => this.props.onCharSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

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

        const {itemList} = this.state;

        const items = this.renderItems(itemList)

        console.log(itemList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
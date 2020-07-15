import React, {Component} from 'react';
import './charDetails.css';
import Service from '../../components/services/services';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Field = ({char, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{char[field]}</span>
        </li>
    )
}

export {Field};

export default class CharDetails extends Component {

    service = new Service();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps){
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if(!charId){
            return;
        }

        this.service.getCharacter(charId)
            .then((char) => {
                this.setState({
                    char,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({
                    char: null,
                    error: true,
                    loading: false
                })
            })
            // this.foo.bar = 0;
    }

    render() {
        const {char, loading, error} = this.state;

        if (!char && error) {
            return (
                <div className="char-details rounded">
                    <ErrorMessage/>
                </div>
            )
        } else if (!char) {
            return <span className="select-error">Please select a character</span>
        }

        if(loading) {
            return (
                <div className="char-details rounded">
                    <Spinner/>
                </div>
            )
        }

        const {name} = char;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            console.log(child, {char});
                            return React.cloneElement(child, {char});
                        })
                    }
                </ul>
            </div>
        );
    }
}
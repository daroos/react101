import React from 'react';
import ReactDOM from 'react-dom';
import * as S from './index.styles';

class App extends React.Component {
    state = {
        items: [],
        loading: false,
        name: 'moja lista',
    };

    componentDidMount() {


        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({
                items: [{ id: 1, name: "dupa" }],
                loading: false,
            })
        }, 100);
    }

    handleItemDelete = (id) => {
        console.log({id});
        this.setState(prevState => {
            return {
                items: prevState.items.filter(item => item.id !== id),
            }
        });
    };

    handleSave = (newValue) => {
        this.setState(prevState => {
            return {
                items: [...prevState.items, { id: newValue, name: newValue}],
            }
        })
    };

    render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        return (
            <TodoList
                items={this.state.items}
                onItemDelete={this.handleItemDelete}
                name={this.state.name}
                onSave={this.handleSave}
            />
        );
    }
}

class TodoList extends React.Component {
    state = {
        newValue: '',
    };

    constructor(props) {
        super(props);
        this.input = React.createRef();
    }

    componentDidMount() {
        this.input.current.focus();
    }

    handleSave = () => {
        this.props.onSave(this.state.newValue);
        this.setState({ newValue: '' });
    };

    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <div>
                    <S.Input
                        type="text" value={this.state.newValue}
                        onChange={(e) => this.setState({ newValue: e.currentTarget.value })}
                        ref={this.input}
                    />
                    {
                        this.state.newValue && (<div>Wpisałeś: {this.state.newValue}</div>)
                    }
                    <button onClick={this.handleSave}>Zapisz</button>
                </div>
                {
                    this.props.items.map(item => <TodoListItem key={item.id} item={item} onItemDelete={this.props.onItemDelete} />)
                }
            </div>
        );
    }
}

class TodoListItem extends React.Component {
    onItemDelete = () => {
        const { onItemDelete, item } = this.props;

        onItemDelete(item.id);
    };

    render() {
        const { item } = this.props;

        return (
            <S.ListItem onClick={this.onItemDelete}>{item.name}</S.ListItem>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

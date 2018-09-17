import React from 'react';
import PropTypes from 'prop-types';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';

export class SomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: props.users, name: '' };
    }

    componentDidMount() {
        this.props.requestUsers();
    }

    componentWillReceiveProps({ users }) {
        this.setState({ ...this.state, users });
    }

    deleteUser(user) {
        this.props.delete(user);
    }

    addUserByName(name) {
        this.props.add({ name, id: this.state.users.length });
    }

    render() {
        const CustomSuperName = props => (
            <td>
                My super name: {props.dataItem.name}
                <button
                    className="btn btn-primary"
                    onClick={() => this.deleteUser(props.dataItem)}
                >
                    Delete
                </button>
            </td>
        );
        return (
            <div>
                <h1>Add users feature</h1>
                <fieldset>
                    <legend>User fields</legend>
                    <label htmlFor="name">
                        Nombre
                        <input
                            id="name"
                            value={this.state.name}
                            onChange={event => this.setState({ name: event.target.value })}
                        />
                    </label>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.addUserByName(this.state.name)}
                    >
                        Add user
                    </button>
                </fieldset >
                <Grid style={{ height: '410px' }} data={this.state.users}>
                    <Column field="id" title="ID" width="40px" />
                    <Column field="name" title="Name" width="250px" />
                    <Column field="name" title="Super name" width="120px" cell={CustomSuperName} />
                </Grid>
            </div>
        );
    }
}

SomeComponent.defaultProps = {
    users: []
};

SomeComponent.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })),
    requestUsers: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired
};

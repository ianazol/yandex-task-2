import React from 'react';
import resource from '../lib/resource';
import {addItem, removeItem, updateItem} from '../lib/helpers';

function withCrud(Component, apiUrl) {
    class WithCrud extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                data: [],
                error: null
            };

            this.remove = this.remove.bind(this);
            this.create = this.create.bind(this);
            this.update = this.update.bind(this);
        }

        componentDidMount() {
            resource.list(apiUrl)
                .then(data => this.setState({data}));
        }

        remove(id) {
            resource.remove(apiUrl, id)
                .then((result) => {
                    if (result.error) {
                        this.setState({error: result.error});
                    } else {
                        const updatedList = removeItem(this.state.data, id);
                        this.setState({error: null, data: updatedList});
                    }
                });
        }

        create(data) {
            return resource.create(apiUrl, data)
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                    } else {
                        const updatedList = addItem(this.state.data, result);
                        this.setState({data: updatedList});
                    }
                });
        }

        update(data, id) {
            return resource.update(apiUrl, id, data)
                .then((result) => {
                    if (result.error) {
                        throw new Error(result.error);
                    } else {
                        const updatedList = updateItem(this.state.data, result);
                        this.setState({data: updatedList});
                    }
                });
        }

        render() {
            return <Component data={this.state.data}
                              error={this.state.error}
                              create={this.create}
                              remove={this.remove}
                              update={this.update}
                              {...this.props} />
        }
    }

    WithCrud.displayName = `WithCrud(${Component.displayName || Component.name || 'Component'})`;

    return WithCrud;
}

export default withCrud;
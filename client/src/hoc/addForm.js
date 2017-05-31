import React from 'react';
import {getFormData, validate} from '../lib/helpers';

function addForm(Component) {
    class AddForm extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                error: null
            };

            this.fields = [];
            this.onAddHandler = this.onAddHandler.bind(this);
            this.addToFields = this.addToFields.bind(this);
            this.clearFields = this.clearFields.bind(this);
        }

        onAddHandler(event) {
            event.preventDefault();

            let newData = getFormData(this.fields);
            if (newData.data || newData.start || newData.finish) {
                newData.start = `${newData.date}T${newData.start}:00`;
                newData.finish = `${newData.date}T${newData.finish}:00`;
            }

            validate(newData)
                .then(this.props.create)
                .then(this.clearFields)
                .then(() => this.setState({error: null}))
                .catch(error => this.setState({error: error.message}));
        }

        clearFields() {
            this.fields.forEach((field) => {
                field.value = '';
            });
        }

        addToFields(input) {
            this.fields.push(input);
        }

        render() {
            return <Component {...this.props}
                        error={this.state.error}
                        addToFields={this.addToFields}
                        onAddHandler={this.onAddHandler} />
        }
    }

    AddForm.displayName = `AddForm(${Component.displayName || Component.name || 'Component'})`;

    return AddForm;
}

export default addForm;
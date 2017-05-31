import React from 'react';
import {getFormData, validate} from '../lib/helpers';

function editForm(Component) {
    class EditForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null
            };
            this.fields = [];
            this.handleSubmit = this.handleSubmit.bind(this);
            this.addToFields = this.addToFields.bind(this);
        }

        handleSubmit(event) {
            event.preventDefault();

            let updatedData = getFormData(this.fields);
            if (updatedData.date || updatedData.start || updatedData.finish) {
                updatedData.start = `${updatedData.date}T${updatedData.start}:00`;
                updatedData.finish = `${updatedData.date}T${updatedData.finish}:00`;
            }

            validate(updatedData)
                .then(() => this.props.update(updatedData, this.props._id))
                .then(this.props.handleClose)
                .catch(error => this.setState({error: error.message}));
        }

        addToFields(field) {
            this.fields.push(field);
        }

        render() {
            return <Component {...this.props}
                              error={this.state.error}
                              addToFields={this.addToFields}
                              handleSubmit={this.handleSubmit} />
        }
    }

    EditForm.displayName = `EditForm(${Component.displayName || Component.name || 'Component'})`;
    return EditForm;
}

export default editForm;
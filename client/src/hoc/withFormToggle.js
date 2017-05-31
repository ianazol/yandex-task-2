import React from 'react';

function withFormToggle(Component) {
    class WithFormToggle extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                editFormOpen: false
            };

            this.handleOpen = this.handleOpen.bind(this);
            this.handleClose = this.handleClose.bind(this);
        }

        handleOpen(event) {
            event.preventDefault();
            this.setState({editFormOpen: true});
        }

        handleClose(event) {
            if (event !== undefined) {
                event.preventDefault();
            }

            this.setState({editFormOpen: false});
        }

        render() {
            return <Component editFormOpen={this.state.editFormOpen}
                              openForm={this.handleOpen}
                              closeForm={this.handleClose}
                              {...this.props} />
        }
    }

    WithFormToggle.displayName = `WithFormToggle(${Component.displayName || Component.name || 'Component'})`;

    return WithFormToggle;
}

export default withFormToggle;
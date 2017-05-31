import React from 'react';
import SchoolEdit from './SchoolEdit';
import withFormToggle from '../../hoc/withFormToggle';

const SchoolItem = props => {
    const handleRemove = event => {
        event.preventDefault();
        props.remove(props._id);
    };

    return (
        <div className="school-item">
            <div className="row">
                <div className="col-8">
                    <b>{props.name}</b><br/>
                    Количество: {props.count}<br/>
                </div>
                <div className="col-4">
                    <button className="btn btn-link btn-sm" onClick={props.openForm}>Редактировать</button>
                    <button className="btn btn-link btn-sm" onClick={handleRemove}>Удалить</button>
                </div>
            </div>
            {props.editFormOpen && <SchoolEdit {...props} handleClose={props.closeForm} />}
            <hr/>
        </div>
    );
};

export default withFormToggle(SchoolItem);
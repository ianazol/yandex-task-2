import React from 'react';
import ClassroomEdit from "./ClassroomEdit";
import withFormToggle from '../../hoc/withFormToggle';

const ClassroomItem = props => {
    const handleRemove = event => {
        event.preventDefault();
        props.remove(props._id);
    };

    return (
        <div className="classroom-item">
            <div className="row">
                <div className="col-8">
                    <b>{props.name}</b><br/>
                    Вместимость: {props.capacity}<br/>
                    Описание: {props.description}<br/>
                </div>
                <div className="col-4">
                    <button className="btn btn-link btn-sm" onClick={props.openForm}>Редактировать</button>
                    <button className="btn btn-link btn-sm" onClick={handleRemove}>Удалить</button>
                </div>
            </div>
            {props.editFormOpen && <ClassroomEdit {...props} handleClose={props.closeForm} />}
            <hr/>
        </div>
    );
};

export default withFormToggle(ClassroomItem);
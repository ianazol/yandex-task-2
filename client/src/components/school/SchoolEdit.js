import React from 'react';
import editForm from '../../hoc/editForm';

const SchoolEdit = (props) => {
    return (
        <div className="school-edit-form">
            <br/>
            <div className="jumbotron">
                {props.error && <div className="alert alert-danger">{props.error}</div>}
                <form onSubmit={props.handleSubmit} method="post">
                    <div className="form-group">
                        <label htmlFor="name">Название школы</label>
                        <input type="text" className="form-control" id="name" name="name"
                               defaultValue={props.name} ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="count">Количество студентов</label>
                        <input type="text" className="form-control" id="count" name="count"
                               defaultValue={props.count} ref={props.addToFields} />
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                    <button type="button" className="btn btn-secondary" onClick={props.handleClose}>Отменить</button>
                </form>
            </div>
        </div>
    );
};

export default editForm(SchoolEdit);
import React from 'react';
import addForm from '../../hoc/addForm';

const SchoolAdd = (props) => {
    return (
        <div className="jumbotron">
            <h4>Добавить школу</h4>
            <hr/>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
            <form onSubmit={props.onAddHandler}>
                <div className="form-group">
                    <label htmlFor="name">Название школы</label>
                    <input type="text" className="form-control" id="name" name="name" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="count">Количество студентов</label>
                    <input type="text" className="form-control" id="count" name="count" ref={props.addToFields} />
                </div>
                <button name="addSchoolBtn" type="submit" className="btn btn-primary">Сохранить</button>
            </form>
        </div>
    )
};

export default addForm(SchoolAdd);
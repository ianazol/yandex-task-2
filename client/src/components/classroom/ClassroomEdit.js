import React from 'react';
import editForm from '../../hoc/editForm';

const ClassroomEdit = (props) => {
    return (
        <div className="classroom-edit-form">
            <br/>
            <div className="jumbotron">
                {props.error && <div className="alert alert-danger">{props.error}</div>}
                <form onSubmit={props.handleSubmit} method="post">
                    <div className="form-group">
                        <label htmlFor="name">Название аудитории</label>
                        <input type="text" className="form-control" id="name" name="name"
                               defaultValue={props.name} ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="capacity">Вместимость</label>
                        <input type="text" className="form-control" id="capacity" name="capacity"
                               defaultValue={props.capacity} ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Описание</label>
                        <textarea name="description" className="form-control" id="description" rows="3"
                                  defaultValue={props.description} ref={props.addToFields}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                    <button type="button" className="btn btn-secondary" onClick={props.handleClose}>Отменить</button>
                </form>
            </div>
        </div>
    );
};

export default editForm(ClassroomEdit);
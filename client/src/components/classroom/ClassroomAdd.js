import React from 'react';
import addForm from '../../hoc/addForm';

const ClassroomAdd = (props) => {
    return (
        <div className="jumbotron">
            <h4>Добавить аудиторию</h4>
            <hr/>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
            <form onSubmit={props.onAddHandler}>
                <div className="form-group">
                    <label htmlFor="name">Название аудитории</label>
                    <input type="text" className="form-control" id="name" name="name" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="capacity">Вместимость</label>
                    <input type="text" className="form-control" id="capacity" name="capacity" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание</label>
                    <textarea name="description" className="form-control" id="description" rows="3" ref={props.addToFields}/>
                </div>

                <button name="addClassroomBtn" type="submit" className="btn btn-primary">Сохранить</button>
            </form>
        </div>
    )
};

export default addForm(ClassroomAdd);
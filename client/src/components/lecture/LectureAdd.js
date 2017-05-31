import React from 'react';
import {createOptionList} from '../../lib/helpers';
import addForm from '../../hoc/addForm';

const LectureAdd = (props) => {
    const schoolOptions = createOptionList(props.schools);
    const classroomOptions = createOptionList(props.classrooms);

    return (
        <div className="jumbotron">
            <h4>Добавить лекцию</h4>
            <hr/>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
            <form onSubmit={props.onAddHandler}>
                <div className="form-group">
                    <label htmlFor="name">Название лекции</label>
                    <input type="text" className="form-control" id="name" name="name" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="lecturer">Имя лектора</label>
                    <input type="text" className="form-control" id="lecturer" name="lecturer" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="lecturer">Дата</label>
                    <input type="date" className="form-control" id="date" name="date" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="start">Время начала</label>
                    <input type="time" className="form-control" id="start" name="start" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="finish">Время окончания</label>
                    <input type="time" className="form-control" id="finish" name="finish" ref={props.addToFields} />
                </div>
                <div className="form-group">
                    <label htmlFor="school">Школа</label>
                    <select name="school" id="school" multiple size="4" className="form-control" ref={props.addToFields}>
                        {schoolOptions}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="classroom">Аудитория</label>
                    <select name="classroom" id="classroom" className="form-control" ref={props.addToFields}>
                        {classroomOptions}
                    </select>
                </div>
                <button name="add" type="submit" className="btn btn-primary">Сохранить</button>
            </form>
        </div>
    );
};

export default addForm(LectureAdd);
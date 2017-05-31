import React from 'react';
import {createOptionList, getTime} from '../../lib/helpers';
import editForm from '../../hoc/editForm';

const LectureEdit = (props) => {
    const schoolOptions = createOptionList(props.schools);
    const classroomOptions = createOptionList(props.classrooms);

    return (
        <div className="lecture-edit-form">
            <br/>
            <div className="jumbotron">
                {props.error && <div className="alert alert-danger">{props.error}</div>}
                <form onSubmit={props.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Название лекции</label>
                        <input type="text" defaultValue={props.name} className="form-control" id="name"
                               name="name" ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lecturer">Имя лектора</label>
                        <input type="text" defaultValue={props.lecturer} className="form-control" id="lecturer"
                               name="lecturer" ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lecturer">Дата</label>
                        <input type="date" defaultValue={props.start.substring(0, 10)} className="form-control" id="date"
                               name="date" ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="start">Время начала</label>
                        <input type="time" defaultValue={getTime(props.start)} className="form-control" id="start"
                               name="start" ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="finish">Время окончания</label>
                        <input type="time" defaultValue={getTime(props.finish)} className="form-control" id="finish"
                               name="finish" ref={props.addToFields} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="school">Школа</label>
                        <select defaultValue={props.school.map(school => school._id)} name="school" id="school"
                                multiple size="4" className="form-control" ref={props.addToFields}>
                            {schoolOptions}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="classroom">Аудитория</label>
                        <select defaultValue={props.classroom._id} name="classroom" id="classroom"
                                className="form-control" ref={props.addToFields}>
                            {classroomOptions}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Сохранить</button>
                    <button type="button" className="btn btn-secondary" onClick={props.handleClose}>Отменить</button>
                </form>
            </div>
        </div>
    );
};

export default editForm(LectureEdit);
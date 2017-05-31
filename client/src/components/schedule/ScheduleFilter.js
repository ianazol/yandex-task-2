import React, {Component} from 'react';
import {createOptionList, getFormData, leadZero} from '../../lib/helpers';

export default class ScheduleFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
        this.fields = [];
        this.addToFields = this.addToFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        let query = getFormData(this.fields);

        Object.keys(query).map(key => {
            if (!query[key]) {
                delete query[key];
            }
        });

        if ((query.from && !Date.parse(query.from)) || (query.to && !Date.parse(query.to))) {
            this.setState({error: 'Некорректно введена дата, формат: YYYY-MM-DD'});
        }

        if (query.to) {
            let date = new Date(query.to);
            query.to = Date.parse(`${date.getFullYear()}-${leadZero(date.getMonth() + 1)}-${leadZero(date.getDate())} 23:59:59`);
        }

        this.props.filterSchedule(query);
    }

    addToFields(input) {
        this.fields.push(input);
    }

    render() {
        const schoolOptions = createOptionList(this.props.schools);
        const classroomOptions = createOptionList(this.props.classrooms);

        return (
            <div className="jumbotron filter">
                <form onSubmit={this.onSubmit} method="post">
                    <div className="row">
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="from">Начало</label>
                                <input type="date" className="form-control" id="from" name="from"
                                       placeholder="Например, 2017-05-12" ref={this.addToFields}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="to">Окончание</label>
                                <input type="date" className="form-control" id="to" name="to"
                                       placeholder="Например, 2017-05-12" ref={this.addToFields}/>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="school">Школа</label>
                                <select name="school" className="form-control" id="school" ref={this.addToFields}>
                                    <option value="">Все школы</option>
                                    {schoolOptions}
                                </select>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label htmlFor="classroom">Аудитория</label>
                                <select name="classroom" className="form-control" id="classroom" ref={this.addToFields}>
                                    <option value="">Все аудитории</option>
                                    {classroomOptions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary lecture-save">Показать</button>
                </form>
            </div>
        )
    }
}
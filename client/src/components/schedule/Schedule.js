import React, {Component} from 'react';
import resource from '../../lib/resource';
import ScheduleList from './ScheduleList';
import ScheduleFilter from './ScheduleFilter';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: [],
            classrooms: [],
            lectures: []
        };

        this.filterSchedule = this.filterSchedule.bind(this);
    }

    componentDidMount() {
        Promise.all([
            resource.list("school"),
            resource.list("classroom"),
            resource.list('lecture')
        ]).then((results) => {
            this.setState({
                schools: results[0],
                classrooms: results[1],
                lectures: results[2]
            });
        });
    }

    filterSchedule(query) {
        resource.list('lecture', query)
            .then(lectures => this.setState({lectures}))
    }

    render() {
        return (
            <div>
                <h4>Расписание</h4><br/>
                <ScheduleFilter filterSchedule={this.filterSchedule} schools={this.state.schools}
                                classrooms={this.state.classrooms}/>
                <ScheduleList lectures={this.state.lectures}/>
            </div>
        );
    }
}

export default Schedule;
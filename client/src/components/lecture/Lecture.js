import React, {Component} from 'react';
import {LectureList} from './LectureList';
import LectureAdd from './LectureAdd';
import resource from '../../lib/resource';

import withCrud from '../../hoc/withCrud';

class Lecture extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schools: [],
            classrooms: []
        }
    }

    componentDidMount() {
        Promise.all([
            resource.list("school"),
            resource.list("classroom"),
        ]).then((results) => {
            this.setState({
                schools: results[0],
                classrooms: results[1]
            });
        });
    }

    render() {
        return (
            <div>
                <LectureList error={this.props.error} lectures={this.props.data} schools={this.state.schools}
                             classrooms={this.state.classrooms} update={this.props.update} remove={this.props.remove} />
                <LectureAdd create={this.props.create} schools={this.state.schools} classrooms={this.state.classrooms}/>
            </div>
        );
    }
}

export default withCrud(Lecture, "lecture");
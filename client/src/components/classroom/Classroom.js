import React from 'react';
import {ClassroomList} from './ClassroomList';
import ClassroomAdd from './ClassroomAdd';

import withCrud from '../../hoc/withCrud';

const Classroom = (props) => {
    return (
        <div>
            <ClassroomList error={props.error} classrooms={props.data} update={props.update} remove={props.remove} />
            <ClassroomAdd create={props.create} />
        </div>
    );
};

export default withCrud(Classroom, "classroom");
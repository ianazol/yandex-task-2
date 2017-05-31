import React from 'react';
import {SchoolList} from './SchoolList';
import SchoolAdd from './SchoolAdd';

import withCrud from '../../hoc/withCrud';

const School = (props) => {
    return (
        <div>
            <SchoolList error={props.error} schools={props.data} update={props.update} remove={props.remove} />
            <SchoolAdd create={props.create} />
        </div>
    );
};

export default withCrud(School, "school");
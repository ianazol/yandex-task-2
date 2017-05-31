import React from 'react';
import SchoolItem from './SchoolItem';

export const SchoolList = (props) => {
    return (
        <div>
            <h4>Список школ</h4>
            {props.error && <div className="alert alert-danger">{props.error}</div>}
            <hr/>
            <div className="schoolList">
                {props.schools.map(school => <SchoolItem key={school._id} {...school}
                     remove={props.remove} update={props.update} />)}
            </div>
            <br/>
        </div>
    );
};
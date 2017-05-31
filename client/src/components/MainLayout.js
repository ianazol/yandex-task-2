import React from 'react';
import {Link} from 'react-router-dom';

const MainLayout = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <nav className="nav flex-column">
                        <Link className="nav-link" to="/">Расписание</Link>
                        <Link className="nav-link" to="/school">Школы</Link>
                        <Link className="nav-link" to="/classroom">Аудитории</Link>
                        <Link className="nav-link" to="/lecture">Лекции</Link>
                    </nav>
                </div>
                <div className="col-9">
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export default MainLayout;
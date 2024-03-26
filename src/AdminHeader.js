import React from 'react';
import { Link } from 'react-router-dom';

function AdminHeader(){
    return(
        <div>
            <div className="sidebar sidebar-dark sidebar-fixed" id="sidebar">
            <div className="sidebar-brand d-none d-md-flex">
            </div>
            <ul className="sidebar-nav" data-coreui="navigation" data-simplebar="">
                <li className="nav-title"><Link className="nav-link" to="/">Home</Link></li>
                <li className="nav-title"><Link className="nav-link" to="/admin-users">Users</Link></li>
                <li className="nav-title"><Link className="nav-link" to="/admin-exams">Exams</Link></li>
            </ul>
            <div className="header header-sticky">
                <div className="container-fluid">
                    <ul className="header-nav d-none d-md-flex">
                    </ul>
                    <ul className="header-nav ms-auto">
                    </ul>
                    <ul className="header-nav ms-3">
                        <li className="nav-item dropdown"><a className="nav-link py-0" data-coreui-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                            <div className="avatar avatar-md"><img className="avatar-img" src="assets/img/avatars/8.jpg" alt="user@email.com"/></div>
                        </a>
                            <div className="dropdown-menu dropdown-menu-end pt-0">
                                <div className="dropdown-header bg-light py-2">
                                    <div className="fw-semibold">Account</div>
                                </div>
                                <div className="dropdown-divider"></div> 
                                Logout
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
}

export default AdminHeader;
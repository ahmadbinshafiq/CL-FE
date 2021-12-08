import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// import {Progress, Alert} from 'reactstrap';
import {withRouter} from 'react-router-dom';
import {dismissAlert} from '../../actions/alerts';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup';

import {changeActiveSidebarItem} from '../../actions/navigation';
import {logoutUser} from '../../actions/user';
import HomeIcon from '../Icons/SidebarIcons/HomeIcon';
import TablesIcon from '../Icons/SidebarIcons/TablesIcon';
// import NotificationsIcon from '../Icons/SidebarIcons/NotificationsIcon';
import ComponentsIcon from '../Icons/SidebarIcons/ComponentsIcon';

import logo from './../../assets/people/alfalah-logo2.png';




class Sidebar extends React.Component {
    static propTypes = {
        sidebarStatic: PropTypes.bool,
        sidebarOpened: PropTypes.bool,
        dispatch: PropTypes.func.isRequired,
        activeItem: PropTypes.string,
        location: PropTypes.shape({
            pathname: PropTypes.string,
        }).isRequired,
    };

    static defaultProps = {
        sidebarStatic: false,
        activeItem: '',
    };

    constructor(props) {
        super(props);

        this.doLogout = this.doLogout.bind(this);
    }

    componentDidMount() {
        this.element.addEventListener('transitionend', () => {
            if (this.props.sidebarOpened) {
                this.element.classList.add(s.sidebarOpen);
            }
        }, false);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
            if (nextProps.sidebarOpened) {
                this.element.style.height = `${this.element.scrollHeight}px`;
            } else {
                this.element.classList.remove(s.sidebarOpen);
                setTimeout(() => {
                    this.element.style.height = '';
                }, 0);
            }
        }
    }

    dismissAlert(id) {
        this.props.dispatch(dismissAlert(id));
    }

    doLogout() {
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <nav style = {{backgroundColor:'white', backgroundImage: 'linear-gradient(to bottom, #c95b5b, #da190b)', boxShadow:'10px 0px rgba(0,0,0, 0.1)'}}
                className={cx(s.root)}
                ref={(nav) => {
                    this.element = nav;
                }}
            >
                <header className={s.logo} >
                   <img src = {logo} alt = "logo" width ='150px' />
                </header>
                <ul className={s.nav} >
                    <LinksGroup
                        style = {{color: 'white'}}
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Records"
                        isHeader
                        iconName={<HomeIcon className={s.menuIcon} />}
                        link="/app/main"
                        index="main"
                    />
                    
                    <LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Down Time"
                        isHeader
                        iconName={<TablesIcon className={s.menuIcon} />}
                        link="/app/downtime"
                        index="tables"
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Analytics"
                        isHeader
                        iconName={<ComponentsIcon className={s.menuIcon} />}
                        link="/app/analytics"
                        index="analytics"
                    />
                    <LinksGroup
                        onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
                        activeItem={this.props.activeItem}
                        header="Technical Analytics"
                        isHeader
                        iconName={<ComponentsIcon className={s.menuIcon} />}
                        link="/app/technical-analytics"
                        index="analytics"
                    />
                    {/* <LinksGroup
                        onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                        activeItem={this.props.activeItem}
                        header="Audio"
                        isHeader
                        iconName={<NotificationsIcon className={s.menuIcon}/>}
                        link="/app/audio"
                        index="ui"
                    /> */}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(store) {
    return {
        sidebarOpened: store.navigation.sidebarOpened,
        sidebarStatic: store.navigation.sidebarStatic,
        alertsList: store.alerts.alertsList,
        activeItem: store.navigation.activeItem,
    };
}

export default withRouter(connect(mapStateToProps)(Sidebar));

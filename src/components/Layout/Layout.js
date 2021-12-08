import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';


import TablesStatic from '../../pages/tables/static';
import MapsGoogle from '../../pages/components/maps/google';
import CoreTypography from '../../pages/typography';
import Charts from '../../pages/components/charts/Charts';
import Records from '../../pages/Records/Records';
import Downtime from '../../pages/downtime/Downtime';
import Analytics from '../../pages/analytics/analytics';
import TechnicalAnalytics from '../../pages/technicalAnalytics/technicalAnalytics';

import Header from '../Header';
import Sidebar from '../Sidebar';
import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    sidebarOpened: false,
  };
  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
  }


  handleSwipe(e) {
    if ('ontouchstart' in window) {
      if (e.direction === 4 && !this.state.chatOpen) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }

      this.setState({ chatOpen: e.direction === 2 });
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          'sidebar-' + this.props.sidebarPosition,
          'sidebar-' + this.props.sidebarVisibility,
        ].join(' ')}
      >
        <div className={s.wrap}>
          <Header />
          {/* <Chat chatOpen={this.state.chatOpen} /> */}
          {/* <Helper /> */}
          <Sidebar />
          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route path="/app/main" exact render={() => <Redirect to="/app/main/records" />} />
                    <Route path="/app/main/records" exact component={Records} />
                    <Route path="/app/downtime" exact component={Downtime} />
                    <Route path="/app/analytics" exact component={Analytics} />
                    <Route path="/app/technical-analytics" exact component={TechnicalAnalytics} />
                    <Route path="/app/components/charts" exact component={Charts} />
                    <Route path="/app/tables" exact component={TablesStatic} />
                    <Route path="/app/components/maps" exact component={MapsGoogle} />
                    <Route path="/app/typography" exact component={CoreTypography} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
              
              <footer className={s.contentFooter}>
              <div style = {{backgroundColor: '#d51302', padding:'10px', color: 'white'}}>
                Checque Verification Software - 2021 made by <a href="https://issm.ai" >ISSM</a>
                </div>
              </footer>
              
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarPosition: store.navigation.sidebarPosition,
    sidebarVisibility: store.navigation.sidebarVisibility,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));

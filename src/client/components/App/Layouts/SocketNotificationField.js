import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {getNotification} from '../../../actions/notificationAction';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getSocketNotification, editSocketNotification, deleteAllSocket } from '../../../actions/socketNotificationActions';

class ViewNotification extends Component {
  state = {
    socketNotifications: {},
    loading: true
  };
  
  componentDidMount() {
    const profileId = this.props.profile._id;
    const { getSocketNotification, deleteAllSocket } = this.props;
    getSocketNotification(profileId, "all");
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    const {socketNotifications, loading} = nextProps;
    this.setState({
      socketNotifications,
      loading
    });
  }
  
  showSubtitle = () => {
    let {auth} = this.props;
    if (this.state.notification.sentBy._id !== auth.profile._id) {
      return `${this.state.notification.sentBy.lastName}, ${this.state.notification.sentBy.firstName}`;
    } else {
      return this.state.notification.recipients.map(({firstName, lastName}) => {
        return <span className={'mg-r-5 tx-dark'}>{lastName}, {firstName} | </span>;
      });
    }
  };

  goReferral = (id) => {
    this.props.history.push('/referrals/detail/' + id);
  }
  
  render() {
    const { socketNotifications, loading } = this.props;
    console.log("socketNotifications: ", socketNotifications);
    let self = this;
    let notifications = this.props.socketNotifications.map((socketNotification, index) => {
        return (
          <div className='section-wrapper' key={index}>
            <h3 className="card-title">{socketNotification.type} from  {socketNotification.sentBy}</h3>
            <p className="card-subtitle">{socketNotification.title}</p>
            <div className={'row mg-t-20'}>
              <div className={'col-8 tx-dark'}>
                {socketNotification.content}
              </div>
              <div className={'col-4'}>
                {
                  socketNotification.type === "Referral" ?
                    <a href="#" onClick={() => self.goReferral(socketNotification.referralId)}>Go to Referrals</a> :
                    ""
                }
              </div>
            </div>
          </div>
        )
    })

    return (
      <div className='slim-mainpanel'>
        <div className='container'>
          <div className="slim-pageheader">
              <Breadcrumb>
                <Breadcrumb.Item href="dashboard">Home</Breadcrumb.Item>
              </Breadcrumb>
              <h6 className="slim-pagetitle">Notifcaionts</h6>
          </div>
          {notifications}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notifications.notification,
  loading: state.notifications.loading,
  auth: state.auth,
  errors: state.errors,
  profile: state.auth.profile,
  socketNotifications : state.socketNotifications.allsocketNotifications
});

export default connect(mapStateToProps, {getSocketNotification, deleteAllSocket})(ViewNotification);

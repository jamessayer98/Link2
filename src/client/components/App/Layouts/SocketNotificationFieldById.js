import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {getNotification} from '../../../actions/notificationAction';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { getSocketNotification, editSocketNotification, deleteAllSocket } from '../../../actions/socketNotificationActions';

class ViewNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: ""
    };
  }
  
  async componentDidMount() {
    const profileId = this.props.profile._id;
    const { getSocketNotification, match: {params: {id}} } = this.props;
    this.setState({id: id});
    getSocketNotification(profileId);
  }
  
  render() {
    const { socketNotifications, loading } = this.props;
    console.log("socketNotifications: ", this.state.id);
    let self = this;
    let notifications = this.props.socketNotifications.map((socketNotification, index) => {
      if (self.state.id == socketNotification._id) {
        return (
          <div className='section-wrapper' key={index}>
            <h3 className="card-title">{socketNotification.type} from  {socketNotification.sentBy}</h3>
            <p className="card-subtitle">{socketNotification.title}</p>
            <div className={'row mg-t-20'}>
              <div className={'col-8 tx-dark'}>
                {socketNotification.content}
              </div>
            </div>
          </div>
        )
      }
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

export default connect(mapStateToProps, {getSocketNotification})(ViewNotification);

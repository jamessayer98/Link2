import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../../actions/authActions';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { API_URL } from '../../../actions/types';
import ReactNotification from "react-notifications-component";
import { getSocketNotification, editSocketNotification, deleteAllSocket, editAll } from '../../../actions/socketNotificationActions';
let reload = 1;
class Header extends Component {
  constructor(props) {
    super(props)
    this.socket = io(API_URL);
    this.addNotification = this.addNotification.bind(this);
      this.notificationDOMRef = React.createRef();
      this.state = {
        type: "",
        sentBy: "",
        content: "",
        title: "",
        id: "",
        once: false,
        delete: true,
        profileId: null,
        referralId: "",
    }
  }

  componentDidMount() {
    const profileId = window.localStorage.getItem("profileId");
    const { getSocketNotification } = this.props;
    getSocketNotification(profileId);
    let self = this;
    this.socket.on('has-new-conversation/', function(data) {
      self.setState({
        type: data.type,
        sentBy: data.sentBy,
        content: data.content,
        title: data.title,
        id: data.id,
        referralId: data.referralId
      });
      if (profileId == data.to) {
        window.$("#socketNotification").trigger("click");
        getSocketNotification(profileId);
      }
    });
  }

  addNotification() {
    const title = this.state.type + " from " + this.state.sentBy;
    const content = this.state.title === "" ? this.state.content : (this.state.title + ": " + this.state.content);
    this.notificationDOMRef.current.addNotification({
    title: title,
    message: content,
    type: "success",
    insert: "top",
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: { duration: 2000 },
    dismissable: { click: true }
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  deleteSocket = () => {
    this.props.deleteAllSocket();
    this.setState({delete: true});
  }

  setRead = (notificaitionid, id) => {
    const {editSocketNotification} = this.props;
    editSocketNotification(notificaitionid, id);
    console.log("aaaa");
  }

  setReadAll = e => {
    const {editAll} = this.props;
    const profileId = window.localStorage.getItem("profileId");
    console.log(profileId);
    editAll(profileId);
  }

  render() {
    const { permissions, auth } = this.props;
    const role = permissions.length > 0 ? permissions[0].role : '';
    const firstName = auth.profile.firstName;
    const { title, content, sentBy, type, id } = this.state;
    const { socketNotifications } = this.props;
    let organization = permissions ? permissions[0] ? permissions[0].organization : "" : '';
    window.localStorage.setItem('organization', organization);
    console.log(socketNotifications);
    let notifictions;
    let self = this;
    let bell = 0;
    if (socketNotifications && socketNotifications.length > 0) {
      notifictions = socketNotifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((notification, index) => {
        let url = "/notifications/view/" + notification.id;
        if (notification.type == "Notification") {
          url = "/notifications/view/" + notification.id;
        }
        else {
          url = "/unreadNotifications/" + notification._id; 
        }
        if (notification.isRead === false && !self.state.once) {
          bell++;

          return (
              <React.Fragment key={index}>
                <a href={url} className="dropdown-link" onClick={() => this.setRead(notification._id, notification.id)}>
                  <div className="media">
                    <img src="http://via.placeholder.com/500x500" alt="" />
                    <div className="media-body">
                      <p>
                        <strong>{notification.type} from {notification.sentBy}</strong> 
                      </p>
                      <h6>{notification.title}</h6>
                      <span>{notification.content}</span>
                    </div>
                  </div>
                </a>
              </React.Fragment>
            )
        }
      })
    }

    return (
      <div className="slim-header">
        <div className="app-content">
          <ReactNotification ref={this.notificationDOMRef} />
          <button style={{ display: "none" }} onClick={this.addNotification} className="btn btn-primary" id="socketNotification">notification</button>
        </div>
        <div className="container">
          <div className="slim-header-left">
            <h2 className="slim-logo">
              <Link to="/">
                iAuto<span>.</span>
              </Link>
            </h2>

            <div className="search-box">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
              <button className="btn btn-primary">
                <i className="fa fa-search" />
              </button>
            </div>
          </div>
          <div className="slim-header-right">
            <div className="dropdown dropdown-b">
              <Link
                to=""
                className="header-notification"
                data-toggle="dropdown"
              >
                <i className="icon ion-ios-bell-outline" />
                {bell > 0 ? <span className="indicator" /> : "" }
              </Link>
              <div className="dropdown-menu">
                <div className="dropdown-menu-header">
                  <h6 className="dropdown-menu-title">Notifications</h6>
                  <div>
                    <Link to="/" onClick={this.deleteSocket}>Mark All as Read</Link>
                    <Link to="/">Settings</Link>
                  </div>
                </div>
                <div className="dropdown-list">
                  {notifictions}
                  <div className="dropdown-list-footer">
                    <a href="/unreadNotifications" onClick={self.setReadAll}>
                      <i className="fa fa-angle-down"/> Show All Notifications
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-c">
              <Link to="/" className="logged-user" data-toggle="dropdown">
                <img src="http://via.placeholder.com/500x500" alt="" />
                <span>{firstName}</span>
                <i className="fa fa-angle-down" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <nav className="nav">
                  {/* <a href="page-profile.html" className="nav-link">
                    <i className="icon ion-person" /> View Profile
                  </a>
                  <a href="page-edit-profile.html" className="nav-link">
                    <i className="icon ion-compose" /> Edit Profile
                  </a>
                  <a href="page-activity.html" className="nav-link">
                    <i className="icon ion-ios-bolt" /> Activity Log
                  </a> */}
                  {role === 'admin' && (
                    <Link to="/settings/admin-settings" className="nav-link">
                      <i className="icon ion-ios-gear" /> Admin Settings
                    </Link>
                  )}
                  {role !== 'admin' && (
                      <Link to="/settings/settings" className="nav-link">
                        <i className="icon ion-ios-gear" /> Settings
                      </Link>
                  )}

                  <Link to="" className="nav-link" onClick={this.onLogoutClick}>
                    <i className="icon ion-forward" /> Sign Out
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.auth.profile,
  socketNotifications : state.socketNotifications.allsocketNotifications,
  permissions: state.access.permissions,
});

export default connect(
  mapStateToProps,
  { logoutUser, getSocketNotification, editSocketNotification, deleteAllSocket, editAll }
)(Header);

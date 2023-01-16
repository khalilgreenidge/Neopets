import React from 'react';
import { fetchUserData, cancelFetch } from '../handlers/dataFetcher';
import { Userlist } from './Userlist';

export class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {userData: null};
    this.loadUserData = this.loadUserData.bind(this);
  }

  componentDidMount(){
    this.loadUserData();
  }

  componentDidUpdate(prevProps){
    if(this.props.username !== prevProps.username){
      cancelFetch(this.fetchID);
      this.loadUserData();
    }
  }

  componentDidUnmount(){
    cancelFetch(this.fetchID);
  }

  loadUserData() {
    this.state = {userData: null};
    this.fetchID = fetchUserData(this.props.username, (userData) => {this.setState({userData })});
  }

  render() {
    const isLoading = true;
    let name; let bio; let friends; 
    let showImg;
    let className = 'Profile';
    if (this.state.userData === null) {
      name = 'Loading...';
      bio = 'Loading...';
      showImg = false
      friends = [];
      className += ' loading';
    }
    else{
      name = this.state.userData.name;
      bio = this.state.userData.bio;
      friends = this.state.userData.friends;
      showImg = true;
    }

    return (
      <div className={className}>
        <div className="profile-picture">
          {showImg && <img src={this.state.userData.profilePictureUrl}/> }
        </div>
        <div className="profile-body">
          <h2>{name}</h2>
          <h3>@{this.props.username}</h3>
          <p>{bio}</p>
          <h3>My friends</h3>
          <Userlist usernames={friends} onChoose={this.props.onChoose} />
        </div>
      </div>
    );
  }
}
import React , {Component} from "react";

class UserProfile extends Component {
  render() {
    const {
      createEvent
    } = this.props;
    return (
      <div>
        <h1>UserProfile</h1>
        <button onClick={createEvent}>Create event</button>
      </div>
    );
  }
}

export default UserProfile;

import React , {Component} from "react";

class Home extends Component {
    render() {
        const {
            hey
        } = this.props;
    console.info(this.props.test);
    return (
      <>
        <h1>Home</h1>
      </>
    );
  }
}

export default Home;

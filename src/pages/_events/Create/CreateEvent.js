import React, { Component } from "react";
import { withRouter } from 'react-router';

class Create extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isFetching: false,
    };
  }

  render() {
    return (
        <div className='root'>
          <div className='title'>
            <h4>Bla</h4>
          </div>
        </div>
    );
  }
}

export default withRouter((Create));

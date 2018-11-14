import React , {Component} from "react";
import PropTypes from "prop-types";

class Home extends Component {
    render() {
        const {
            hey
        } = this.props;

        console.info(hey);

        return (
            <div className='root'>

            </div>
        );
    }
}

export default Home;


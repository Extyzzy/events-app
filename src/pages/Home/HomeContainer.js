import React , {Component} from "react";
import Layout from "../../components/_layout/Layout";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        const {
            history,
            cumVrei
        } = this.props;

        console.info(cumVrei);

        return (
            <div className='root'>
                HOME
                <br />
                <span onClick={() => {history.push('/events', {utm: 'jenea'})}}>Click me</span>
            </div>
        );
    }
}

function mapStateToProps(store) {
    return {
        cumVrei: store.auth.isAuthenticated,
    };
}

export default withRouter(connect(mapStateToProps)(Home));


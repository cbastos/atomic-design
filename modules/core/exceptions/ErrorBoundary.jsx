import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(message, data) {
        this.setState({ hasError: true });
        this.props.logErrorInWebApi({ message, data });
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong, please reload.</h1>;
        }
        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element.isRequired,
    logErrorInWebApi: PropTypes.func.isRequired
};

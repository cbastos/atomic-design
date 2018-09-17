import React from 'react';

class Connector {
    use(store, actions) {
        this.store = store;
        this.actions = actions;
    }
    connect(Component, mapToProps) {
        const connector = this;
        return class Connected extends React.Component {
            constructor(props) {
                super(props);
                const state = connector.store.getState();
                this.state = Object.assign({}, props, mapToProps(state, connector.actions));
            }
            componentDidMount() {
                this.storeSubscription = connector.store.subscribe(() => {
                    const state = connector.store.getState();
                    const props = mapToProps(state, connector.actions);
                    if (this.areDifferentThanLastState(props)) {
                        this.setState(Object.assign({}, this.props, props));
                    }
                });
            }
            componentWillUnmount() {
                this.storeSubscription();
            }
            areDifferentThanLastState(props) {
                let hasChanged = false;
                Object.keys(props).forEach((p) => {
                    hasChanged = hasChanged || (typeof props[p] !== 'function' && props[p] !== this.state[p]);
                });
                return hasChanged;
            }
            render() {
                return <Component {...this.state} />;
            }
        };
    }
}

export const connector = new Connector();
export const connect = connector.connect.bind(connector);

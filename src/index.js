import React, { Component, createElement } from 'react'
import hoistStatics from 'hoist-non-react-statics'
import throttle from 'lodash.throttle'

function getDisplayName(component) {
  return component.displayName || component.name
}

function throttleProps(component, wait) {
  class Throttle extends Component {
    constructor(props, context) {
      super(props, context)
      this.state = {props}
      this.throttledSetState = throttle(this.setState, wait);
    }

    componentWillReceiveProps(nextProps) {
      this.throttledSetState({props: nextProps})
    }

    shouldComponentUpdate(nextProps, nextState) {
      return this.state !== nextState
    }

    render() {
      return createElement(component, this.state.props)
    }
  }

  Throttle.displayName = getDisplayName(component)

  return hoistStatics(Throttle, component)
}

export default throttleProps

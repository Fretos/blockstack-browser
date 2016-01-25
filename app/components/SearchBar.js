import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { SearchActions } from '../store/search'

function mapStateToProps(state) {
  return {
    query: state.search.query,
    currentId: state.identities.current.id
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SearchActions, dispatch)
}

class SearchBar extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    timeout: PropTypes.number.isRequired,
    searchIdentities: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  }

  static contextTypes = {
    history: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      query: '',
      searchResults: [],
      timeoutId: null,
      placeholder: this.props.placeholder
    }

    this.onQueryChange = this.onQueryChange.bind(this)
    this.submitQuery = this.submitQuery.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.locationHasChanged = this.locationHasChanged.bind(this)
  }

  locationHasChanged(location) {
    let pathname = location.pathname,
        query = 'local:/' + pathname
    if (pathname.includes('/profile/')) {
      query = pathname.replace('/profile/', '')
    } else if (pathname.includes('/search/')) {
      query = pathname.replace('/search/', '')
    }
    this.setState({
      query: query
    })
  }

  componentDidMount() {
    this.context.router.listen(this.locationHasChanged)
  }

  componentWillUnmount() {
    this.context.router.unregisterTransitionHook(this.locationHasChanged)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentId !== null && nextProps.currentId !== this.props.currentId) {
      this.setState({
        query: nextProps.currentId
      })
    }
  }

  submitQuery(query) {
    const newPath = `search/${query.replace(' ', '%20')}`
    this.context.history.pushState(null, newPath)
  }

  onFocus(event) {
    this.setState({
      placeholder: ''
    })
  }

  onBlur(event) {
    this.setState({
      placeholder: this.props.placeholder
    })
  }

  onQueryChange(event) {
    const query = event.target.value

    if (this.state.timeoutId) {
      clearTimeout(this.state.timeoutId)
    }

    const timeoutId = setTimeout(() => {
      this.submitQuery(query)
    }, this.props.timeout)

    this.setState({
      query: query,
      timeoutId: timeoutId
    })
  }

  render() {
    return (
      <div>
        <input type="text"
          className="form-control form-control-sm"
          placeholder={this.state.placeholder} 
          name="query" value={this.state.query}
          onChange={this.onQueryChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
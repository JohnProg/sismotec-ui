import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NewNeedView from '../Presentational/NewNeedView';
import { GridList, GridListTile } from 'material-ui/GridList';
import Grid from 'material-ui/Grid';
import ResourcesActions from '../Data/Redux/ResourcesRedux';
import NeedsActions from '../Data/Redux/NeedsRedux';

class NewNeed extends Component {

    componentDidMount() {
        this.props.getResources();
    }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isAuth) {
      // Redirect to dashboard
      this.props.navigateToDashboard();
    }    
  }
    constructor(props) {
        super(props);
        this.data = {};
        this.state = {
            expanded: false
        };

        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    static propTypes = {
        resources: PropTypes.array,
        getresources: PropTypes.func,
        createNeed: PropTypes.func,
        updateresources: PropTypes.func,
    };

    static defaultProps = {
        resources: [],
    };

    handleExpandClick(){
        this.setState({ expanded: !this.state.expanded });
    };

    handleAdd(resource) {
        this.props.createNeed({
            id_beneficiario: this.props.userId,
            recursos: [resource],
        });
    }
  
  render() {
    return (
      <div>
        <GridList>
            {this.props.resources.map(item => <NewNeedView
                key={item.id}
                item = {item}
                handleExpandClick={this.handleExpandClick}
                handleAdd={this.handleAdd} />)}
        </GridList>
      </div>
    )
  }

}

const mapStateToProps = state => ({
    userId: state.user.userId,
    resources: state.resources.get.results,
});

const mapDispatchToProps = dispatch => ({
    getResources: () => dispatch(ResourcesActions.getRequest()),
    createNeed: data => dispatch(NeedsActions.createRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewNeed);
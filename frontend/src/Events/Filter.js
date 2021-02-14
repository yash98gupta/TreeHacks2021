import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionCreater from '../../src/store/actions/index'
import { Dropdown, Button} from 'semantic-ui-react'

class Filter extends Component {

    handleFilter(category){
        this.props.selectedFilter(category);
    }


  render() {

    let categories = this.props.categories
    let category_filter = null

    if(categories != null && categories.length != 0){
        category_filter = (
            <Dropdown
            text='Filter'
            icon='filter'
            floating
            labeled
            button
            className='icon'
            >
            <Dropdown.Menu>
            <Dropdown.Header icon='tags' content='Filter by tag' />
            <Dropdown.Divider />
            {categories.map(category => {
                
                return (
                    <Dropdown.Item
                    label={{ color: 'red', empty: true, circular: true }}
                    text={category}
                    onClick={(e)=>this.handleFilter({category})} 
                    />
                )
            })}
            </Dropdown.Menu>
            </Dropdown>
        )
    }

    return (
        <div>
            {category_filter}
            <Button content='Remove Filter' onClick={(e)=>this.props.handleRemoveFilter()}/>
        </div>
    )
  }
}

const mapPropsToState = (state) => {
    return{
      categories : state.event.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
  return{
    selectedFilter : (category) => dispatch(actionCreater.selectedFilter(category)),
    handleRemoveFilter : () => dispatch(actionCreater.handleRemoveFilter())
  }
}

export default connect(mapPropsToState,mapDispatchToProps)(Filter);

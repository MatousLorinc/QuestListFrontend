import React, { Component } from 'react'
import QuestForm from './QuestForm.js';
import QuestDataGrid from './QuestDataGrid.js';

export class QuestsAPI extends Component  {
    constructor(props) {
      super(props);
      this.state = {
        // any error during downloading json?
        error: null,
        // is downloading json finished?
        isLoaded: false,
        // download json data
        items: []
      };
    }
  
    componentDidMount() {
      this.getQuests();
    }
    // fetch all quest in json format
    getQuests(){
      fetch("http://lorincsoft.com/api/quest_list/")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // error handling
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, items } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <React.Fragment>
              <QuestForm
              parent = {this}
              ></QuestForm>
              <QuestDataGrid
              parent = {this}
              rows = {this.state.items}
              ></QuestDataGrid>
          </React.Fragment>
        );
      }
    }
  }

export default QuestsAPI

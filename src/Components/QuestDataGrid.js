//import * as React from 'react';
import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios'

export class QuestDataGrid extends Component {

    constructor(props){
        super(props)
        this.state = {
            rows: [],
            selectedRowsIds: [],
            columns: [
                // { field: 'id', headerName: 'ID', width: 70 },
                 { field: 'name', headerName: 'Úkol', width: 200 },
                 { field: 'type', headerName: 'Typ', width: 130 },
                 { field: 'start', headerName: 'Začátek', width: 200 },
                 { field: 'end', headerName: 'Konec', width: 200 }
               ]
        }
    }

    deleteQuests = (e) => {
        axios({
            method: 'post',
            url: 'http://lorincsoft.com/api/quest_list/',
            data: this.state.selectedRowsIds,
            //headers: {'Content-Type': 'application/json; charset=UTF-8'}
            headers:{'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'}
            })
            .then((response) => {
                //handle success
                console.log(response);
                this.props.parent.getQuests()
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    };

    hanndleSelectionChange = (newSelection) => {
        this.setState({selectedRowsIds: newSelection.rowIds})
    };

    render() {
        const { columns } = this.state
        return (
            <div className="quest-datagrid-wrapper">
            <div className="quest-datagrid" style={{ height: 400, width: '100%' }}>
                <DataGrid rows={this.props.rows} columns={columns} pageSize={5} checkboxSelection
                onSelectionChange={this.hanndleSelectionChange}
                />
            </div>
            <Button className="quest-datagrid-btn" variant="contained" color="primary" onClick={this.deleteQuests}>
                    Smazat úkoly
                </Button>
            </div>
        )
    }
}

export default QuestDataGrid
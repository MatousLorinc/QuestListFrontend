import React, { Component } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';

export class QuestForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            // name of the quest 
            name: '',
            // id of the quest type
            type: 1,
            // start of the quest 
            start: '',
            // end of the quest 
            end: '',
            // axios response message string
            msg:''
        }
    }

    // set state on input change
    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    // insert quest
    submitHandler = e => {
        e.preventDefault()
        var bodyFormData = new FormData();
        bodyFormData.append('name', this.state.name);
        bodyFormData.append('type', this.state.type);
        bodyFormData.append('start', this.state.start);
        bodyFormData.append('end', this.state.end);
        axios({
            method: 'post',
            url: 'http://lorincsoft.com/api/quest_list/',
            data: bodyFormData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then((response) => {
                //handle success
                console.log(response);
                if(response.data.success){
                   // this.setState({msg: response.data.message})
                    this.setState(state => ({
                        msg: response.data.message
                    }));
                    this.props.parent.getQuests()
                }
                else{
                    
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    render() {
        const { name, type, start, end, msg} = this.state
        return (
            <form action="http://quests.test/" className="quest-form" encType="multipart/form-data" method="post" onSubmit={this.submitHandler}>
                <input className="quest-form-input" name="name" type="text" value={name} onChange={this.changeHandler} placeholder="Název úkolu"></input>
                <select className="quest-form-input" name="type" value={type} onChange={this.changeHandler}>
                    <option value="1">Programování</option>
                    <option value="2">Kódování</option>
                    <option value="3">Meeting</option>
                </select>
                <input className="quest-form-input" name="start" type="datetime-local" value={start} onChange={this.changeHandler}></input>
                <input className="quest-form-input" name="end" type="datetime-local" value={end} onChange={this.changeHandler}></input>
                <input className="quest-form-input" type="submit" name="insert_quest"></input>
                <div className="quest-form-msg">{msg}</div>
            </form>
        )
    }
}

export default QuestForm

import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class ToDoList extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                inputValue : '',
                toDo : [],
                toolTip : 'none',
                outline : 'none',
            };
        }

        addTask() {
            if(this.state.inputValue.length === 0 || !this.state.inputValue.trim()){
                this.setState({
                    toolTip : 'block',
                    outline : ' #FF5722 solid 3px',
                });
                this.timeOutId = setTimeout(() => {
                    this.setState({
                        toolTip : 'none',
                    });
                }, 2200);

            }else{
                const toDoCopy = this.state.toDo.slice();
                toDoCopy.push({name: this.state.inputValue, done: false});

                this.setState({
                    toDo : toDoCopy,
                    inputValue : '',
                });
            }
        };

        handleInputOnChange = (event) => {
            clearTimeout(this.timeOutId);
            this.setState({
                toolTip : 'none',
                inputValue : event.target.value,
                outline : 'none',
            });
        };

        handleAddBtnClick = (event) => {
            this.addTask();
        };

        handleAddOnKeyPress = (event) => {
            if(event.key === 'Enter'){
                this.addTask();
            }
        };

        handleLiClick = (index) => {
            const toDoCopy = this.state.toDo.slice();
            toDoCopy[index].done = !toDoCopy[index].done;

            this.setState({
                toDo : toDoCopy,
            });
        };

        handleCloseLiClick = (event,index) => {
            event.stopPropagation();
            const toDoCopy = this.state.toDo.slice();
            toDoCopy.splice(index,1);

            this.setState({
                toDo : toDoCopy,
            });
        };

        componentWillUnmount() {
            clearTimeout(this.timeOutId);
        }

        render() {

            const toDoList = this.state.toDo.map( (el,index) => {
                return (
                    <li key={index}
                        className={el.done ? 'checked' : 'active'}
                        onClick={e => this.handleLiClick(index)}>
                        {el.name}
                        <span className="close"
                            onClick={e => this.handleCloseLiClick(e,index)}>
                            x
                        </span>
                    </li>
                )
            })

            return (
                <div className="toDoList">
                    <div className="header">
                        <h1>To Do List made in React.js</h1>
                        <h4>Just add your tasks for today. </h4>

                        <input type='text' placeholder="Text..."
                            style={{outline: this.state.outline}}
                            value={this.state.inputValue}
                            onChange={this.handleInputOnChange}
                            onKeyPress={this.handleAddOnKeyPress}/>
                        <button className='addBtn'
                            onClick={this.handleAddBtnClick}>
                            Add
                        </button>
                        <div className="infoToolTip"
                            style={{display: this.state.toolTip}}>
                            <span className="infoToolTipText">
                                Sorry, it can't be empty.
                            </span>
                        </div>
                    </div>

                    <ul>
                        {toDoList}
                    </ul>
                </div>
            )
        }
    }
    ReactDOM.render(
        <ToDoList />,
        document.getElementById('app')
    );
});

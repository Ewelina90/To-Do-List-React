import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class ToDoList extends React.Component {

        render() {
            return (
                <div className="toDoList">
                    <div className="header">
                        <h1>To Do List made in React.js</h1>
                        <h4>Just add your tasks for today. </h4>
                        <input type='text' placeholder="Text..."
                            value={this.state.inputValue}
                            onChange={this.handleInputOnChange} />
                        <button className='addBtn'
                            onClick={this.handleAddBtnClick}>Add</button>
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

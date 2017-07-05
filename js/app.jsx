import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    class ToDoList extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                inputValue : '',
                toDo : [],
            };
        }

        handleInputOnChange = (event) => {
            this.setState({
                inputValue : event.target.value,
            });
        };

        handleAddBtnClick = (event) => {
            if(this.state.inputValue.length === 0 || !this.state.inputValue.trim()){
                console.log('There has to be something To Do? Just type it!');
            }else{
                const toDoCopy = this.state.toDo.slice();
                toDoCopy.push({name: this.state.inputValue, done: false});

                this.setState({
                    toDo : toDoCopy,
                    inputValue : '',
                });
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
            console.log(toDoCopy);

            this.setState({
                toDo : toDoCopy,
            });
        };
        
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

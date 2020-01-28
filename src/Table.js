// import React from "react";
import React from "react";
import "./App.scss";

class Table extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: props.users.data,
      change: props.users.data,
      nochange: props.users.data,
      header: props.header,
      activeColumn: 0,
      lastActiveColumn: 0,
      currentPage: 1,
      todosPerPage: 10,
      lastCache: props.users.data,
    }

  }

  actualSort(a, colIndex, reverse) {

    if (reverse === true) {
      a.sort(sortFunc).reverse();
    } else {
      a.sort(sortFunc);
    }

    function sortFunc(a, b) {
      if (a[colIndex] === b[colIndex]) {
        return 0;
      } else {
        return (a[colIndex] < b[colIndex]) ? -1 : 1;
      }
    }
    return a;
  }


  sortClick(title, key) {
    if (this.state.activeColumn === key) {
      let toggle = !this.state.toggle
      this.setState({
        toggle: toggle,
        activeColumn: key,
        rows: this.actualSort(this.state.data, title, toggle)
      })
    } else {
      this.setState({
        activeColumn: key,
        rows: this.actualSort(this.state.data, title, false)
      })
    }
  }

  filterList(event) {
    const searchedWord = event.target.value.toLowerCase();
    const updatedList = this.state.nochange.filter(function (item) {
      return item.Name.toLowerCase().search(searchedWord) !== -1;
    });

    this.setState({
      change: updatedList
    });
    setTimeout(() => {
      if (searchedWord.length > 0) {
        const currentTodos = this.state.change.slice(0, this.state.todosPerPage);
        this.setState({
          data: currentTodos
        });
      } else {
        const currentTodos = this.state.change.slice(0, this.state.todosPerPage);
        this.setState({
          data: currentTodos,
          
        });
      }
    }, .5);
  }

  componentWillMount() {
    const indexOfLastTodo = this.state.currentPage * this.state.todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - this.state.todosPerPage;
    const currentTodos = this.state.change.slice(indexOfFirstTodo, indexOfLastTodo);
    this.setState({
      data: currentTodos,
      lastCache: currentTodos
    });
  }

  
  render() {
    return (
      <div className="container">
        <div className="table">
          <div className="filter-area">search: 
          <input className="filter-input" 
          type="text" 
          onChange={this.filterList.bind(this)} 
          placeholder="Search Name.." /></div>
           <header className="tableheader">
            {this.state.header.map((item, key) =>
               <div className="repeat" key={item} onClick={this.sortClick.bind(this, item, key)} >{item}
                 {(this.state.activeColumn === key) ? (this.state.toggle) ? " ▲" : " ▼" : ""} 

              </div>
            )
            }
          </header> 
          <section>
            {this.state.data.map((item, items) => {
              return (
                <div key={item.ID} >
                  <div className="repeated" >
                    {item.Name}
                  </div>
                  <div className="repeated" >
                    {item.Email}
                  </div>
                  <div className="repeated" >
                    {item.Age}
                  </div>
                  <div className="repeated" >
                    {item.YearsofExperience}
                  </div>
                  <div className="repeated" >
                    {item.Positionapplied}
                  </div>
                  <div className="repeated" >
                    {item.Applied}
                  </div>
                  <div className="repeated" >
                    {item.Status}
                  </div>
                </div>
              )
            })
            }
          </section>
        </div>

      </div>
    );
  }

}



export default Table;

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import axios from "axios";

import {
  fetchCategories,
  createCategories,
} from "../../redux/categories/categories.action";
import { fetchTask, createTask } from "../../redux/task/task.action";

import { selectAllTasks } from "../../redux/task/task.selector";
import "./TaskDirectory.styles.css";
import PostTask from "../../components/PostTask/PostTask.component";
import TaskCard from "../../components/TaskCard/TaskCard.component";
import CategoreisCardComponent from "../../components/CategoriesCard/CategoreisCard.component";
import { selectAllCategories } from "../../redux/categories/categories.selector";

class TaskDirectory extends React.Component {
  state = {
    todo: "",
    categories: "",
    page: 1,
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.fetchTask();
      this.props.fetchCategories();
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleCategoriesSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.categories);
    axios
      .post(
        "/api/v1/todos/categories",
        { name: this.state.categories },
        {
          headers: {
            // eslint-disable-next-line
            ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.props.createCategories(res.data.data);
        this.setState({ description: "" });
      })
      .catch((err) => console.log(err.response));
  };

  handleTodoSubmit = (event) => {
    event.preventDefault();
    let foundCat = [];
    const { categories } = this.props;
    const { todo } = this.state;
    const catLabel = /#(\w*)/g;
    let propCat = todo.match(catLabel);
    if (propCat) {
      propCat.forEach((cat, index) => (propCat[index] = cat.substr(1)));
      propCat.forEach((cat) => {
        let x = categories.find(
          (cat_obj) => cat_obj.name.toLowerCase() === cat
        );
        if (x) {
          foundCat.push(x.id);
        }
      });
    }
    let todoEdit = todo.replace(catLabel, "");
    console.log(todo);
    console.log(foundCat);
    const postObj = {
      todo: todoEdit,
      categories: foundCat.length > 0 ? foundCat : [],
    };
    axios
      .post("/api/v1/todos/new", postObj, {
        headers: {
          // eslint-disable-next-line
          ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        this.props.createTask(res.data.data);
        this.setState({ description: "" });
      })
      .catch((err) => console.log(err.response));
  };

  render() {
    const { tasks, categories } = this.props;

    return (
      <div>
        <div className="categories-directory uk-container uk-container-xlarge">
          <PostTask
            cat={true}
            handleSubmit={this.handleCategoriesSubmit}
            handleChange={this.handleChange}
            description={this.state.categories}
          />
          {categories
            ? categories.map((category) => (
                <CategoreisCardComponent
                  key={category.id}
                  category={category}
                />
              ))
            : null}
        </div>
        <div className="task-directory uk-container uk-container-xlarge">
          <PostTask
            handleSubmit={this.handleTodoSubmit}
            handleChange={this.handleChange}
            description={this.state.todo}
          />
          {tasks !== undefined
            ? tasks.map((task) => <TaskCard key={task.id} task={task} />)
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  tasks: selectAllTasks,
  categories: selectAllCategories,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTask: () => dispatch(fetchTask()),
    fetchCategories: () => dispatch(fetchCategories()),
    createTask: (task) => dispatch(createTask(task)),
    createCategories: (cat) => dispatch(createCategories(cat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDirectory);

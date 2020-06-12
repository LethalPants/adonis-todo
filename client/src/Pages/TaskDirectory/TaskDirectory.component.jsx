import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import axios from "axios";

import { fetchTask, createTask } from "../../redux/task/task.action";
import { selectAllTasks } from "../../redux/task/task.selector";
import "./TaskDirectory.styles.css";
import PostTask from "../../components/PostTask/PostTask.component";
import TaskCard from "../../components/TaskCard/TaskCard.component";

class TaskDirectory extends React.Component {
  state = {
    todo: "",
    page: 1,
  };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.fetchTask();
    }
  }

  handleChange = (event) => {
    this.setState({
      todo: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        "/api/v1/todos/new",
        { todo: this.state.todo },
        {
          headers: {
            // eslint-disable-next-line
            ["Authorization"]: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.props.createTask(res.data.data);
        this.setState({ description: "" });
      })
      .catch((err) => console.log(err.response));
  };

  render() {
    const { tasks } = this.props;
    console.log(tasks);

    return (
      <div>
        <div className="task-directory uk-container uk-container-xlarge">
          <PostTask
            handleSubmit={this.handleSubmit}
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTask: () => dispatch(fetchTask()),
    createTask: (task) => dispatch(createTask(task)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskDirectory);

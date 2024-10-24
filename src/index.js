document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.querySelector("#create-task-form");
  const taskList = document.querySelector("#tasks");
  const sortButton = document.querySelector("#sort-tasks");
  let tasks = [];

  // Create a new task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    // Get form values
    const taskDescription = document.querySelector("#new-task-description").value;
    const priority = document.querySelector("#priority").value;
    const user = document.querySelector("#user").value;
    const duration = document.querySelector("#duration").value;
    const dueDate = document.querySelector("#due-date").value;

    // Create task object
    const task = {
      description: taskDescription,
      priority: priority,
      user: user,
      duration: duration,
      dueDate: dueDate
    };

    // Add the task to the tasks array
    tasks.push(task);

    // Render the updated list of tasks
    renderTasks(tasks);

    // Clear the form fields
    taskForm.reset();
  });

  // Function to render tasks in the DOM
  function renderTasks(taskArray) {
    taskList.innerHTML = ""; // Clear previous tasks

    taskArray.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.classList.add(task.priority); // Add priority class (low, medium, high)

      // Create task list item with description, user, duration, and due date
      taskItem.innerHTML = `
        <span>${task.description} (User: ${task.user}, Duration: ${task.duration}hrs, Due: ${task.dueDate})</span>
        <button class="edit-task" data-index="${index}">Edit</button>
        <button class="delete-task" data-index="${index}">Delete</button>
      `;

      taskList.appendChild(taskItem);
    });

    // Attach event listeners for delete and edit functionality
    addDeleteFunctionality();
    addEditFunctionality();
  }

  // Function to delete a task
  function addDeleteFunctionality() {
    document.querySelectorAll(".delete-task").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index; // Get the task index
        tasks.splice(index, 1); // Remove task from array
        renderTasks(tasks); // Re-render the tasks
      });
    });
  }

  // Function to edit a task
  function addEditFunctionality() {
    document.querySelectorAll(".edit-task").forEach(button => {
      button.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const task = tasks[index];

        // Populate the form fields with the task's details for editing
        document.querySelector("#new-task-description").value = task.description;
        document.querySelector("#priority").value = task.priority;
        document.querySelector("#user").value = task.user;
        document.querySelector("#duration").value = task.duration;
        document.querySelector("#due-date").value = task.dueDate;

        // Remove the task from the array so it can be re-added once edited
        tasks.splice(index, 1);
        renderTasks(tasks);
      });
    });
  }

  // Function to sort tasks by priority
  sortButton.addEventListener("click", () => {
    tasks.sort((a, b) => {
      const priorityLevels = { low: 1, medium: 2, high: 3 };
      return priorityLevels[b.priority] - priorityLevels[a.priority]; // Sort by descending priority
    });
    renderTasks(tasks); // Re-render tasks after sorting
  });
});

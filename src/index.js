// Get references to DOM elements
const form = document.getElementById('create-task-form');
const taskInput = document.getElementById('new-task-description');
const taskList = document.getElementById('task-list');

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  // Get the task text from the input
  const taskText = taskInput.value;

  // Check if the task text is not empty
  if (taskText.trim() !== '') {
    // Create a new list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      li.remove(); // Remove the list item when the button is clicked
    });

    // Append the list item and delete button to the task list
    li.appendChild(deleteButton);
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
  }
});
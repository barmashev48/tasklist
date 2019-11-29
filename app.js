//Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Event listener function
(function loadEventListener(){
    //DOM load event
    document.addEventListener('DOMcontentLoaded', getTasks)
    //Add task
    form.addEventListener('submit', addTask);
    //Remove task
    taskList.addEventListener('click', removeTask);
    // Clear tasks
    clearBtn.addEventListener('click', clearTasks);
    // Filter tasks
    filter.addEventListener('keyup', filterTasks);
})();

//Get tasks from LS

function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        //Create li
        const li = document.createElement('li');
        //Add class to li
        li.className = 'collection-items';
        //Add text node to li
        li.appendChild(document.createTextNode(task));
        //Append li to ul
        taskList.appendChild(li);
        
        //Create a link
        const link = document.createElement('a');
        //Add class to a link
        link.className = 'delete-item secondary-content';
        //Add icon html to link
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //Append link to li
        li.appendChild(link);

    })

}

// Add task
function addTask(e){
    if (taskInput.value === ''){
        alert('Add a task!');
    } 
    
    //Create li
    const li = document.createElement('li');
    //Add class to li
    li.className = 'collection-items';
    //Add text node to li
    li.appendChild(document.createTextNode(taskInput.value));
    //Append li to ul
    taskList.appendChild(li);
    
    //Create a link
    const link = document.createElement('a');
    //Add class to a link
    link.className = 'delete-item secondary-content';
    //Add icon html to link
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);
    
    //Clear input
    taskInput.value = '';

    e.preventDefault();
    
}

//Store task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
        }
    }
}

//Clear tasks
function clearTasks(){
    while(taskList.firstElementChild){
        taskList.removeChild(taskList.firstElementChild);
    }
}

// Filter tasks

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    });
}








let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const nameInput = document.getElementById('username');
const newTodoForm = document.getElementById('todoForm');

const username = localStorage.getItem('username') || '';
nameInput.value = username;

nameInput.addEventListener('change', e => {
  localStorage.setItem('username', e.target.value);
});

newTodoForm.addEventListener('submit', e => {
  e.preventDefault();

  if (e.target.taskText.value === '') {
    alert('Please fill out the task');
    return;
  }

  const task = {
    taskText: e.target.elements.taskText.value,
    category: e.target.elements.category.value,
    done: false,
  };
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  e.target.reset();

  showTasks();
});


const showTasks = () => { 
  const list = document.querySelector('.list');
  list.textContent = '';

  tasks.forEach(task => {
    const item = document.createElement('div');
    item.classList.add('list__item');
  
    const label = document.createElement('label'); 
    const checkbox = document.createElement('input');
    const span = document.createElement('span');
  
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

  
    if (task.category === 'business') {
      checkbox.id = 'business';
    } else if (task.category === 'personal') {
      checkbox.id = 'personal';
    }
  
    const listTextBlock = document.createElement('div');
    listTextBlock.classList.add('list__text-block');

    const listText = document.createElement('input');
    listText.classList.add('list__text');
    listText.type = 'text';
    listText.value = `${task.taskText}`;
    listText.setAttribute('readonly', 'readonly');

    const btns = document.createElement('div');
    btns.classList.add('list__btns');
    
    const editBtn = document.createElement('button');
    editBtn.classList.add('list__btn', 'list__btn_edit');
    editBtn.innerText = 'Edit'; 
  
    const delBtn = document.createElement('button');
    delBtn.classList.add('list__btn', 'list__btn_delete');
    delBtn.innerText = 'Delete';
  
    label.append(checkbox, span);
    btns.append(editBtn, delBtn);
    listTextBlock.append(label, listText);
    item.append(listTextBlock, btns);
    list.append(item);

    checkbox.addEventListener('click', e => {
      task.done = e.target.checked;

      localStorage.setItem('tasks', JSON.stringify(tasks));

      if (task.done) {
        item.classList.add('done');
      } else {
        item.classList.remove('done');
      }
      showTasks();
    });
    
    editBtn.addEventListener('click', () => {
      const listText = document.querySelector('.list__text');
      listText.removeAttribute('readonly');
      listText.focus();

      listText.addEventListener('blur', (e) => {
        listText.setAttribute('readonly', 'readonly');
        task.taskText = e.target.value;
        console.log(listText.value);
          
        localStorage.setItem('tasks', JSON.stringify(tasks));
        showTasks();
      });
    });

    delBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t != task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      showTasks();
    });
    
  });
};
showTasks();
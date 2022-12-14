
window.addEventListener('load', () => {
	// define variables
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');
	let task_input = document.querySelector('#content');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	// set event for changing the name
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	// set action for submit button.
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		//sent alert to user if they didnt write anything in the input before submitting.
		let tasks = task_input.value;
		if(!tasks){
			alert('please fill out the task');
			return;
		}

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos();
	});

	DisplayTodos();
})


// create elements in Html for showing the added tasks in the page
function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		// create categories for tasks
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');

		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else if(todo.category == 'other'){
			span.classList.add('other');
		}else if(todo.category == 'business'){
			span.classList.add('business');
		}else{
			span.classList.add('other');
		};

		// create edit / delete button for each task
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');


		// get the value of input and show it to the user
		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		// append child for every tasks
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		// save the user task list in local storage
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		// set action for edit button in tasks
		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			edit.innerHTML = "save";
			edit.style.background = "orange";

			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})

		// set action for delete button in tasks list
		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		});

		// set action for clear All button to select all tasks
		const clear_completed = document.querySelector('.clear');
		clear_completed.addEventListener ('click',()=>{
			if (todo.done) {
				todos = todos.filter(t => t != todo);
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
			};
		});
	});




// create filter option for added tasks
	let filterOption = document.querySelector('.filter');
	let list = document.querySelectorAll('.todo-item');

	filterOption.addEventListener('click', (e) =>{
		list.forEach(function(category){
			switch(e.target.value){
				case "all":
					category.style.display = 'flex';
					break;
				case "personal":
					if(category.childNodes[0].childNodes[1].classList.contains("personal")){
						category.style.display = 'flex';
					}
					else{
						category.style.display = 'none';
					};
					break;
				case "business":
					if(category.childNodes[0].childNodes[1].classList.contains("business")){
						category.style.display = 'flex';
					}
					else{
						category.style.display = 'none';
					};
					break;
				case "other":
					if(category.childNodes[0].childNodes[1].classList.contains("other")){
						category.style.display = 'flex';
					}
					else{
						category.style.display = 'none';
					};
					break;
				case "completed":
					if(category.classList.contains("done")){
						category.style.display = 'flex';
					}
					else{
						category.style.display = 'none';
					};
					break;
				case "uncompleted":
					if(category.classList.contains("done")){
						category.style.display = 'none';
					}
					else{
						category.style.display = 'flex';
					};
					break;
			};
		});
	});

	
};
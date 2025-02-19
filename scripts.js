let todos = JSON.parse(localStorage.getItem('todos')) || []
let currentTodoIndex = null

document.getElementById('newTodoBtn').addEventListener('click', () => {
    currentTodoIndex = null
    document.getElementById('todoTitle').value = ''
    document.getElementById('todoDescription').value = ''
    document.getElementById('todoModal').style.display = 'flex'
})

document.getElementById('saveTodoBtn').addEventListener('click', () => {
    const title = document.getElementById('todoTitle').value
    if(title===''){
        alert('Please enter a title')
        return
    }
    const description = document.getElementById('todoDescription').value

    if (currentTodoIndex === null) {
        todos.push({ title, description, completed: false })
    } else {
        todos[currentTodoIndex] = { ...todos[currentTodoIndex], title, description }
    }

    localStorage.setItem('todos', JSON.stringify(todos))
    document.getElementById('todoModal').style.display = 'none'
    renderTodos()
})

document.querySelectorAll('.filters button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
        renderTodos(button.dataset.filter)
    })
})

function renderTodos(filter = 'all') {
    const todoList = document.getElementById('todoList')
    todoList.innerHTML = ''

    todos.filter(todo => {
        if (filter === 'all') return true
        if (filter === 'pending') return !todo.completed
        if (filter === 'completed') return todo.completed
    }).forEach((todo, index) => {
        const todoItem = document.createElement('div')
        todoItem.className = 'todo-item'

        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.checked = todo.completed
        checkbox.addEventListener('change', () => {
            todos[index].completed = checkbox.checked
            localStorage.setItem('todos', JSON.stringify(todos))
            renderTodos(filter)
        })

        const title = document.createElement('span')
        title.textContent = todo.title

        const actions = document.createElement('div')
        actions.className = 'actions'

        const button_view = document.createElement('button')
        button_view.innerHTML = '<i class="fas fa-eye"></i>'
        button_view.addEventListener('click', () => {
            alert(`Title: ${todo.title}\nDescription: ${todo.description}`)
        })

        const editBtn = document.createElement('button')
        editBtn.innerHTML = '<i class="fas fa-edit"></i>'
        editBtn.addEventListener('click', () => {
            currentTodoIndex = index
            document.getElementById('todoTitle').value = todo.title
            document.getElementById('todoDescription').value = todo.description
            document.getElementById('todoModal').style.display = 'flex'
        })

        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1)
            localStorage.setItem('todos', JSON.stringify(todos))
            renderTodos(filter)
        })

        actions.appendChild(button_view)
        actions.appendChild(editBtn)
        actions.appendChild(deleteBtn)

        todoItem.appendChild(checkbox)
        todoItem.appendChild(title)
        todoItem.appendChild(actions)

        todoList.appendChild(todoItem)
    })
}

renderTodos()
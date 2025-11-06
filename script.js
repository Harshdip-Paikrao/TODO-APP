// select dom elements

const input = document.getElementById('todo-input');
const addBtn =document.getElementById('add-btn');
const list = document.getElementById('todo-list');

//load saved todos from localSTorage
const saved= localStorage.getItem('todos');
const todos = saved? JSON.parse(saved):[];
function saveTodos(){
    //Save current array to local storage

    localStorage.setItem('todos',JSON.stringify(todos));
}

//creat a dom node for todo for a todo object and append it to the list
function createTodoNode(todo,index){
const li = document.createElement('li');

const checkbox= document.createElement('input');
checkbox.type='checkbox';
checkbox.checked = !!todo.completed;

checkbox.addEventListener("change",()=>{
    todo.completed= checkbox.checked;

    // TODO:visual feedback
saveTodos();
textSpan.style.textDecoration=todo.completed?'line-through':"none";

})



//text of the todo

const textSpan = document.createElement("span");
textSpan.textContent = todo.text;
textSpan.style.margin = '0.8px';

if(todo.completed){
    textSpan.style.textDecoration='line-through';
}
    // add double click
    textSpan.addEventListener('dblclick',()=>{
        const newText = prompt("Edit Todo",todo.text);

        if(newText !== null){
            todo.text = newText.trim()
            textSpan = textContent= todo.text;
            saveTodos();
        }
    })

    //delete todos 

    const delBtn =document.createElement('button');

    delBtn.textContent="Delete";
    delBtn.addEventListener('click',()=>{
        todos.splice(index,1);

        render();
        saveTodos();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return  li

}
function render(){
    list.innerHTML="";
    
    todos.forEach((todo,index) => {
       
      const node = createTodoNode(todo,index);
        list.appendChild(node);
        
    });
}


function addTodo(){
    const text = input.value.trim();

    if(!text){
        return
    }

    //push new todo object

    todos.push({text,completed:false});
    input.value='';
    render();
    saveTodos();
}

addBtn.addEventListener('click',addTodo);
render();
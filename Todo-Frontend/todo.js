const todoinp=document.getElementById('todo-input');
const todolist=document.getElementById('todo-list');
const errtext=document.getElementById('error-message');
function addTodo(){
    const text=todoinp.value.trim();
    console.log(text);
    if(text==="")
    {
        console.log("blank");
       errtext.textContent="Please Enter the text";
       errtext.style.display="block";
        return;
    }
    const li=document.createElement("li");
    const span=document.createElement("span");
    span.textContent=text;
    const deletebtn=document.createElement("button");
    deletebtn.textContent="delete the task";
    deletebtn.onclick=()=>{
        todolist.removeChild(li);
    }
    li.appendChild(span);
    li.appendChild(deletebtn);
    todolist.appendChild(li);
    todoinp.value=" ";

}
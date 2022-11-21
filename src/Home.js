import react, { useEffect ,useState} from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function Home(){
    const nav=useNavigate();
    const [todos, setTodos] = useState();
    const[addtodo,setAddtodo]=useState();
    const[updatetodo,setUpdatetodo]=useState();
    const getTodo = async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/"
        ).then((response) => response.json());
     
        // update the state
        setTodos(response);
      };
      const updateTodo=(id) =>{
        axios
          .put(`https://jsonplaceholder.typicode.com/todos/${id}`, {
            title: updatetodo,
           
          })
          .then((response) => {
            setTodos(response.data);
            getTodo();
          });
      }
    
      const deleteTodo=(id)=>{
       
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then(() => {
            setTodos(todos.filter(todo => todo.id !== id))
            getTodo();
        })
      }
      const postData=()=>{
        console.log(addtodo)
        axios.post(`https://jsonplaceholder.typicode.com/todos`, {
          title: addtodo,
          completed:false
        }).then((response) => response.json());
     
        // update the state
        setTodos(response);
        setAddtodo("");
        getTodo();
      }
      useEffect(() => {
        getTodo();
        postData();
      }, []);
return(
    <div>
        
        <h1>Todo List</h1>
  

  
      <button onClick={()=>{
            localStorage.removeItem("token")
            nav("/login")
        }}>Logout</button>
         <div className="App">
     Add TODO:<input value={addtodo} onChange={(e) => setAddtodo(e.target.value)} type="text" ></input><br/>
    
     <button onClick={postData}>ADD</button>
    </div>

 <div className="item-container">
          <Table striped bordered hover>
      <thead>
        <tr>
          
          <th>Id</th>
          <th>Title</th>
          <th>Action</th>
          
        </tr>
      </thead>
     
      <tbody >
      {todos &&
    todos.map((todo,index) => (
        <tr key={index}>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          

          <td><button onClick={updateTodo}>Update</button><button  onClick={deleteTodo} >Delete</button> </td>
          
         
        </tr>
        ))}
    
      </tbody>
    
    </Table>
      
      </div>
   
       
        
    </div>
)
}
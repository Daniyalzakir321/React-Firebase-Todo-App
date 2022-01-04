import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebase';
import firebase from 'firebase/app';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

function App() {

  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  // Date Time
  var today = new Date();
  var dateTime = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + "    " +
    today.getHours() + ":" + today.getMinutes();


  useEffect(() => {
    db.collection('TodoApp').orderBy('SERVERTIMESTAMP', 'desc').onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          keyF: doc.id,
          todoF: doc.data().TODO,
          timeF: doc.data().TIME
        }))

      )
    })
  }, [])




  // Add
  const Add = (e) => {
    e.preventDefault()
    db.collection('TodoApp').add({
      TODO: text,
      TIME: dateTime,
      SERVERTIMESTAMP: firebase.firestore.FieldValue.serverTimestamp(),
    })
      .then(() => {
        setText('')
        alert('☑️ Todo Successfully Added')
      })
      .catch((error) => {
        alert('⚠️', error.message)
      })
  }

  // Update
  const Update = (keyF) => {
    const modifyTodo = prompt("Enter New Todo ☑️")
    if (modifyTodo) {
      db.collection('TodoApp').doc(keyF).update({
        TODO: modifyTodo,
        TIME: dateTime,
        SERVERTIMESTAMP: firebase.firestore.FieldValue.serverTimestamp(),
      })
        .then(() => {
          setText('')
          alert('☑️ Todo Successfully Updated')
        })
        .catch((error) => {
          alert('⚠️ This Key Is Not Present In Database', error.message)
        })
    }
    else {
      alert('Update Is Cancelled 🗙')
    }

  }


  // Delete
  const Delete = (keyF) => {
    db.collection('TodoApp').doc(keyF).delete()
      .then(() => {
        alert('☑️ Todo Is Deleted')
      })
      .catch((error) => {
        alert('⚠️ This Key Is Not Present In Database', error.message)
      })

  }


  // DeleteAll
  const DeleteAll = () => {
    if (DeleteAll) {
      alert('Are You Sure You Want To Delete All Todos?')
      db.collection('TodoApp').get()
        .then(res => {
          res.forEach(element => {
            element.ref.delete()
          })
          alert('☑️ All Todos Are Deleted')
        })
        .catch((error) => {
          alert('⚠️ There Is No Doc In Database', error.message)
        })
    }
    else {
      alert('Delete All Operations Is Cancelled 🗙')
    }

  }

  return (
    <div>
      <h1 className="Todo__Header">☑ TODO APP WITH FIREBASE</h1>

      <form>
        <Paper elevation={5} className="Add__Todo">
          <TextField className="Text__Field" label="Enter Todos" value={text} onChange={(e) => setText(e.target.value)}
            inputProps={{ maxLength: 55 }}
          /> <br /> <br />
          <Button type="sumit" variant="contained" color="primary" disabled={!text} onClick={Add}>ADD &nbsp;<AddBoxOutlinedIcon /></Button>
          <Button variant="contained" color="primary" onClick={DeleteAll}>DELETE ALL &nbsp;<DeleteOutlinedIcon /></Button>

        </Paper>
      </form>


      {todos.map((data, i) => {
        return <Paper elevation={5} className="Todos_Rendering">
          <p> {i + 1} &nbsp;&nbsp;&nbsp;  {data.todoF}</p>

          <div>
            <Button variant="contained" color="primary" onClick={() => Update(data.keyF)}>UPDATE &nbsp; <UpdateIcon /></Button>
            <Button variant="contained" color="primary" onClick={() => Delete(data.keyF)}>DELETE &nbsp;<DeleteOutlinedIcon /></Button>
          </div>
          <span>{data.timeF}</span>
        </Paper>

      })


      }


    </div>
  );
}

export default App;


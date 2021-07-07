import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {

  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage

    }).then(() => {
      setEmployeeList([...employeeList, {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage
      },
      ])
    });

  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  }

  const handleEdit = (val) => {
    setName(val.name);
    setAge(val.age);
    setCountry(val.country);
    setPosition(val.position);
    setWage(val.wage);
    setId(val.id);
} 

const editEmployee = () => {
  Axios.put("http://localhost:3001/update", [id, name, age, country, position, wage]).then(
    (response) => {
      alert('update');
    }
  )
}

const handleDelete = (id) => {
  Axios.delete(`http://localhost:3001/delete/${id}`)
  setEmployeeList(employeeList.filter((val) => {
    return val.id != id
  }))
}

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
          value={age}

        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          value={country}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
          value={position}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
          value={wage}
        />
        <button className="button1" onClick={addEmployee}>Add Employee</button>
        <button className="button1" onClick={editEmployee}>Edit Employee</button>
      </div>
      <hr />

      <div className="employees">
        <button className="button1" onClick={getEmployees}> Show Employee </button>
        <table>
          <thead><tr>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Position</th>
            <th>Wage</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
            {employeeList.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name + " "}</td>
                  <td>{val.age}</td>
                  <td>{val.country}</td>
                  <td>{val.position}</td>
                  <td>{val.wage}</td>
                  <td style={{textAlign: 'center'}}>
                    <button className="button" onClick={() => handleEdit(val)} >Edit</button>
                    <button className="button" onClick={() => handleDelete(val.id)} >Delete</button>
                  </td>
                </tr>)
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

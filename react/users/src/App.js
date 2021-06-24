import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

function App() {
  const [usersList, setUsersList] = useState([]);
  const [userId, setUsersId] = useState(0);

  const addUserHandler = (username, age) => {
    console.log('in addUserHandler', username, age);
    console.log('in addUserHandler', userId);
    setUsersList(prevUsersList => [...prevUsersList, {name: username, age: age, id: userId}]);
    // setUsersId(prevUserId => {
    //   let retVal = prevUserId + 1;
    //   console.log('setUsersId: prevUserId ' + prevUserId + 'retVal ' + retVal);
    //   return retVal;
    // });
    // setUsersId(prevUserId => {
    //   let retVal = prevUserId + 1;
    //   return retVal;
    // });
    setUsersId(prevUserId => prevUserId + 1);
  }
  return (
    <div>
      <AddUser onAddUser={addUserHandler}/>
      <UsersList users={usersList}/>
    </div>
  );
}

export default App;

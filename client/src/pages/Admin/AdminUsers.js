import React from 'react'
import { useSelector } from 'react-redux';
function AdminUsers() {
  const { user } = useSelector((state) => state.users);

  return (
    <>
    <h1 style={{fontSize : "30px"}}>People who have logged in and viewed courses :-</h1>
    <p style={{marginTop : "30px"}}>Name : {user.name} and  Roll no : {user.studentID}</p>
    </>
  )
}

export default AdminUsers
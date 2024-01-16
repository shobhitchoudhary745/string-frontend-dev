import React, { useEffect } from "react";
import { getAllUsers } from "../../features/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { Card, Table } from "react-bootstrap";

export default function User() {
    const dispatch = useDispatch()
  const { users, userCount, filteredUsers } = useSelector(
    (state) => state.user
  );
  console.log(("users",users))
  useEffect(() => {
    getAllUsers(dispatch);
  }, []);
  return <div>
    <Card>
        <Card.Header>

        </Card.Header>
        <Card.Body>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email address</th>
                        <th>Mobile no</th>
                        <th>Plan</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                   
                </thead>
                <tbody>
                    {
                        users.map((user,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>{"Premium"}</td>
                                    <td>{"Active"}</td>
                                    <td>Actions</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </Card.Body>
    </Card>
  </div>;
}

import React, { useEffect, useState } from 'react';
import { Card, Grid, Image, Header, Label } from 'semantic-ui-react';

import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import cookie from 'js-cookie';

function User() {
  const [users, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const token = cookie.get('token');

        const res = await axios.get(`${baseUrl}/api/v1/user`, {
          headers: { Authorization: token },
        });

        setUser(res.data.user);
      } catch (error) {
        console.log(error);
        ('Error Searching Users');
      }
    })();
  }, [users]);

  if (users) {
    return (
      <div>
        <Card.Group>
          {users.map((user) => (
            <Card>
              <img src={user.image} width="290px" height="300px" class="center"/>
              <Card.Content>
                <Card.Header>{user.name}</Card.Header>
                <Card.Meta>{user.typeOfUser}</Card.Meta>
              </Card.Content>
              <Card.Content>Email: {user.email}</Card.Content>
              <Card.Content>RFID: {user.RFID}</Card.Content>
              <Card.Content>P. NO: {user.phoneNumber}</Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    );
  } else {
    return <div>No User</div>;
  }
}

export default User;

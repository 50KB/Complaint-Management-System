import React from 'react';
import { List, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { route } from 'next/dist/server/router';
import { logoutUser } from '../../utils/authUser';

function SideMenu({ user }) {
  const router = useRouter();

  const isActive = (router) => router.pathname === route;

  if (
    user.typeOfUser == 'Student' ||
    user.typeOfUser == 'Helper' ||
    user.typeOfUser == 'Non-Faculty'
  ) {
    return (
      <>
        <List
          style={{ paddingTop: '1rem' }}
          size="big"
          verticalAlign="middle"
          selection
        >
          <Link href="/">
            <List.Item active={isActive('/') ? true : false}>
              <Icon
                name="home"
                size="large"
                active={isActive('/')}
                color={'teal'}
              />
              <List.Content>
                <List.Header content="Home" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <Link href="/complain">
            <List.Item active={isActive('/complain')}>
              <Icon
                name="envelope outline"
                size="large"
                active={isActive('/complain')}
                color={'red'}
              />
              <List.Content>
                <List.Header content="Complain" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <List.Item onClick={() => logoutUser(user.email)}>
            <Icon name="log out" size="large" />
            <List.Content>
              <List.Header content="Logout" />
            </List.Content>
          </List.Item>
        </List>
      </>
    );
  } else if (user.typeOfUser == 'Faculty' || 
             user.typeOfUser == 'Admin-Staff' ||
             user.typeOfUser == 'Chairman' ||
             user.typeOfUser == 'Dean' ||
             user.typeOfUser == 'Academic-Council' ||
             user.typeOfUser == 'Pro-Vice-Chancellor' ||
             user.typeOfUser == 'Vice-Chancellor') {
    return (
      <>
        <List
          style={{ paddingTop: '1rem' }}
          size="big"
          verticalAlign="middle"
          selection
        >
          <Link href="/">
            <List.Item active={isActive('/')}>
              <Icon
                name="home"
                size="large"
                active={isActive('/')}
                color={'teal'}
              />
              <List.Content>
                <List.Header content="Home" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <Link href="/complain">
            <List.Item active={isActive('/complain')}>
              <Icon
                name="envelope outline"
                size="large"
                active={isActive('/complain')}
                color={'red'}
              />
              <List.Content>
                <List.Header content="Complain" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <Link href="/review">
            <List.Item active={isActive('/review')}>
              <Icon
                name="find"
                size="large"
                active={isActive('/review')}
                color={'blue'}
              />
              <List.Content>
                <List.Header content="Review" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <List.Item onClick={() => logoutUser(user.email)}>
            <Icon name="log out" size="large" />
            <List.Content>
              <List.Header content="Logout" />
            </List.Content>
          </List.Item>
        </List>
      </>
    );
  } else {
    return (
      <>
        <List
          style={{ paddingTop: '1rem' }}
          size="big"
          verticalAlign="middle"
          selection
        >
          <Link href="/">
            <List.Item active={isActive('/')}>
              <Icon
                name="home"
                size="large"
                active={isActive('/')}
                color={'teal'}
              />
              <List.Content>
                <List.Header content="Home" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <Link href="/registerAccount">
            <List.Item active={isActive('/registerAccount')}>
              <Icon
                name="registered outline"
                size="large"
                active={isActive('/registerAccount')}
                color={'pink'}
              />
              <List.Content>
                <List.Header
                  active={isActive('/registerAccount')}
                  content="Register Account"
                />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <Link href="/complain">
            <List.Item active={isActive('/complain')}>
              <Icon
                name="envelope outline"
                size="large"
                active={isActive('/complain')}
                color={'red'}
              />
              <List.Content>
                <List.Header content="Complain" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <Link href="/review">
            <List.Item active={isActive('/review')}>
              <Icon
                name="find"
                size="large"
                active={isActive('/review')}
                color={'blue'}
              />
              <List.Content>
                <List.Header content="Review" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <Link href="/user">
            <List.Item active={isActive('/user')}>
              <Icon
                name="users"
                size="large"
                active={isActive('/user')}
                color={'pink'}
              />
              <List.Content>
                <List.Header content="All User" />
              </List.Content>
            </List.Item>
          </Link>
          <br />

          <List.Item onClick={() => logoutUser(user.email)}>
            <Icon name="log out" size="large" />
            <List.Content>
              <List.Header content="Logout" />
            </List.Content>
          </List.Item>
        </List>
      </>
    );
  }
}

export default SideMenu;

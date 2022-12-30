import React, { createRef, useLayoutEffect } from 'react';
import { withRouter } from 'next/router';
import HeadTags from './HeadTags';
import Navbar from './Navbar';
import {
  Container,
  Visibility,
  Grid,
  Sticky,
  Ref,
  Divider,
  Segment,
  Menu,
  Image,
  Header,
} from 'semantic-ui-react';
import nProgress from 'nprogress';
import Router from 'next/router';
import SideMenu from './SideMenu';
import Search from './Search';

function Layout({ children, user, ctx }) {
  const contextRef = createRef();

  Router.onRouteChangeStart = () => nProgress.start();
  Router.onRouteChangeComplete = () => nProgress.done();
  Router.onRouteChangeError = () => nProgress.done();

  var check = false;
  if (user != undefined) {
    if (!user.typeOfUser) check = true;
  }

  if (check) {
    return (
      <>
        <HeadTags />
        <Navbar />

        <Container text style={{ paddingTop: '1rem' }}>
          {children}
        </Container>
      </>
    );
  } else {
    return (
      <>
        <HeadTags />

        {user ? (
          <>
            <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
              <Menu fluid borderless>
                <Image
                  src="https://i.postimg.cc/j5PGNVxB/logo512.png"
                  size="tiny"
                  circular
                />

                <Container text position="center">
                  <Menu.Item as="h1" color="violet">
                    Welcome to NSU Ovijog, {user.name}
                  </Menu.Item>
                </Container>
              </Menu>

              <Ref innerRef={contextRef}>
                <Grid>
                  <Grid.Column floated="left" width={2}>
                    <Sticky content={contextRef}>
                      <SideMenu user={user} />
                    </Sticky>
                  </Grid.Column>

                  <Grid.Column width={13}>
                    <Visibility context={contextRef}>{children}</Visibility>
                  </Grid.Column>
                </Grid>
              </Ref>
            </div>
          </>
        ) : (
          <>
            {' '}
            <Navbar />
            <Container style={{ paddingTop: '1rem' }} text>
              {children}
            </Container>{' '}
          </>
        )}
      </>
    );
  }
}

export default Layout;

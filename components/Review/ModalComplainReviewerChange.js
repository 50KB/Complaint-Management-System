import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Divider,
  Form,
  Label,
  Message,
  Modal,
  Search,
  Segment,
  Grid,
  Button,
  List,
  Image,
} from 'semantic-ui-react';

import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import { changeReviewer } from '../../utils/review';

function ModalComplainReviewerChange({ user, complain }) {
  const [reviewer, setReviewer] = useState(complain.reviewer.name);
  const [reviewerID, setReviewerID] = useState(complain.reviewer._id);
  const [reviewerLoading, setReviewerLoading] = useState(false);
  const [reviewerResults, setReviewerResults] = useState([]);

  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    //console.log(reviewerID);
    await changeReviewer(user, complain._id);
    setFormLoading(false);
  };

  return (
    <>
      <Modal.Header>Edit Reviewer</Modal.Header>
      <Modal.Content>
        <Message
          color="teal"
          attached
          header="Change Reviewer"
          icon="settings"
        />
        <Form
          loading={formLoading}
          error={errorMessage != null}
          onSubmit={handleSubmit}
        >
          <Message
            error
            header="Opps!"
            content={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />

          <Divider hidden />

          <Segment>
            <Label as="h4">Reviewer</Label>

            <Grid>
              <Grid.Column textAlign="center">
                <Button
                  icon="send"
                  content="Submit"
                  type="submit"
                  color="orange"
                />
              </Grid.Column>
            </Grid>
          </Segment>
        </Form>
      </Modal.Content>
    </>
  );
}

const ResultRenderer = ({ _id, image, name }) => {
  return (
    <List key={_id}>
      <List.Item>
        <Image src={image} alt="ProfilePic" avatar />
        <List.Content header={name} as="a" />
      </List.Item>
    </List>
  );
};

export default ModalComplainReviewerChange;

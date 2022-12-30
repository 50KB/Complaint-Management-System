import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import baseUrl from '../../utils/baseUrl';
import ImageDropDiv from '../Common/ImageDropDiv';
import uploadPic from '../../utils/upload-pic-to-cloudinary';
import { EditComplain } from '../../utils/complain';
import {
  Button,
  Divider,
  Form,
  Grid,
  Label,
  Message,
  Modal,
  Search,
  Segment,
  List,
  Image,
} from 'semantic-ui-react';

function ModalComplainEdit({ user, complain, setComplains }) {
  const [editComplain, setEditComplain] = useState({
    title: complain.title,
    complaintext: complain.complain,
  });

  const { title, complaintext } = editComplain;

  const [faulty, setFaulty] = useState(complain.faulty.name);
  const [faultyID, setFaultyID] = useState(complain.faulty._id);
  const [faultyLoading, setFaultyLoading] = useState(false);
  const [faultyResults, setFaultyResults] = useState([]);

  const faultyHandleChange = async (e) => {
    const { value } = e.target;
    setFaulty(value);
    setFaultyLoading(true);

    try {
      const token = cookie.get('token');

      const res = await axios.get(`${baseUrl}/api/v1/user/${value}`, {
        headers: { Authorization: token },
      });

      if (res.data.length === 0) return setFaultyLoading(false);

      setFaultyResults(res.data);
    } catch (error) {
      console.log(error);
      ('Error Searching');
    }

    setFaultyLoading(false);
  };

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [highlighted, setHighlighted] = useState(false);

  const inputRef = useRef();

  const [errorMessage, setErrorMessage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleChange = (e, result) => {
    const { name, value, files } = e.target || result;

    if (name === 'media') {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setEditComplain({ ...editComplain, [name]: value });
  };

  useEffect(() => {
    if (faultyID) setEditComplain((prev) => ({ ...prev, faulty: faultyID }));
  }, [faultyID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormLoading(true);

    let evidence;

    if (media !== null) {
      evidence = await uploadPic(media);
    }

    if (media !== null && !evidence) {
      setFormLoading(false);
      return setErrorMessage('Error uploading Image');
    }

    await EditComplain(
      user,
      complain,
      editComplain,
      evidence,
      setErrorMessage,
      setFormLoading,
      setComplains
    );

    setFormLoading(false);
  };

  useEffect(() => {
    const isComplain = Object.values({
      title,
      complaintext,
      faultyID,
    }).every((item) => Boolean(item));

    isComplain ? setSubmitDisabled(false) : setSubmitDisabled(true);
  });

  return (
    <>
      <Modal.Header>Edit Complain</Modal.Header>
      <Modal.Content>
        <Message color="teal" attached header="Edit Complain" icon="envelope" />
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
          <Segment>
            <Form.Input
              label="Title"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
              fluid
              required
            />

            <Form.TextArea
              label="Complain"
              placeholder="Detailed Complain"
              name="complaintext"
              value={complaintext}
              onChange={handleChange}
              fluid
              required
            />

            <Label as="h4">Accused</Label>

            <Search
              label="Faulty"
              onBlur={() => {
                faultyResults.length > 0 && setFaultyResults([]);
                faultyLoading && setFaultyLoading(false);
              }}
              loading={faultyLoading}
              value={faulty}
              resultRenderer={ResultRenderer}
              results={faultyResults}
              onSearchChange={faultyHandleChange}
              minCharacters={1}
              onResultSelect={(e, data) => {
                setFaulty(data.result.name);
                setFaultyID(data.result._id);
                console.log(faultyID);
              }}
              fluid
            />

            <Divider hidden />

            <ImageDropDiv
              mediaPreview={mediaPreview}
              setMediaPreview={setMediaPreview}
              setMedia={setMedia}
              inputRef={inputRef}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              handleChange={handleChange}
            />

            <Divider hidden />
            <Grid>
              <Grid.Column textAlign="center">
                <Button
                  icon="send"
                  content="Submit"
                  type="submit"
                  color="orange"
                  disabled={submitDisabled}
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

export default ModalComplainEdit;

import React, { useEffect, useState } from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';
import { closeComplain } from '../../utils/review';

function ComplainCloseInputField({ complainID, user, setStatuses }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(text);
    //await createComment(complainID, user, text, setComments, setText);
    await closeComplain(user, text, complainID, setStatuses);

    setLoading(false);
  };

  useEffect(() => {
    if (text === '') setSubmitDisabled(true);
    else setSubmitDisabled(false);
  }, [text]);

  return (
    <Form reply onSubmit={handleSubmit}>
      <Form.Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add Closing Comment"
      />

      <Divider hidden />
      <Button
        icon="ban"
        content="Close"
        type="submit"
        color="red"
        disabled={submitDisabled}
      />
    </Form>
  );
}

export default ComplainCloseInputField;

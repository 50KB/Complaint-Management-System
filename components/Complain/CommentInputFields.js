import React, { useEffect, useState } from 'react';
import { Button, Divider, Form } from 'semantic-ui-react';
import { createComment } from '../../utils/complain';

function CommentInputField({ complainID, user, setComments }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(text);
    await createComment(complainID, user, text, setComments, setText);

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
        placeholder="Add Status"
      />

      <Divider hidden />
      <Button
        icon="edit"
        content="Post"
        type="submit"
        color="blue"
        disabled={submitDisabled}
      />
    </Form>
  );
}

export default CommentInputField;

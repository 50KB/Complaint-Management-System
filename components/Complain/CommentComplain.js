import {} from 'react';

import { Comment } from 'semantic-ui-react';

import calculateTime from '../../utils/calculateTime';

function CommentComplain({ comment, setComments }) {
  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar src={comment.commenter.image} />
        <Comment.Content>
          <Comment.Author as="a">{comment.commenter.name}</Comment.Author>

          <Comment.Metadata>{calculateTime(comment.date)}</Comment.Metadata>

          <Comment.Text>{comment.text}</Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
}

export default CommentComplain;

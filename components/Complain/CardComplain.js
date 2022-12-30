import React, { useState } from 'react';
import { Button, Card, Divider, Grid, Image, Modal } from 'semantic-ui-react';
import calculateTime from '../../utils/calculateTime';
import ModalComplainDetails from './ModalComplainDetails';
import ModalComplainEdit from './ModalComplainEdit';

function CardComplain({ user, complain, setComplains }) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reviewers, setReviewers] = useState(complain.reviewer);

  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header as="h3">{complain.title}</Card.Header>
          <Card.Meta>{calculateTime(complain.createdAt)}</Card.Meta>
          <Card.Meta>Version: {complain.versionNumber}</Card.Meta>
        </Card.Content>

        <Card.Content>
          <Card color="green">
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src={complain.complainer.image}
              />
              <Card.Header>{complain.complainer.name}</Card.Header>
              <Card.Meta>Complainer</Card.Meta>
            </Card.Content>
          </Card>
        </Card.Content>

        <Card.Content>
          <Card color="red">
            <Card.Content>
              <Image floated="right" size="mini" src={complain.faulty.image} />
              <Card.Header>{complain.faulty.name}</Card.Header>
              <Card.Meta>Accused</Card.Meta>
            </Card.Content>
          </Card>
        </Card.Content>

        {reviewers.length > 0 && 
          reviewers.map((reviewer) => (
            <Card.Content>
              <Card color="blue">
                <Card.Content>
                  <Image
                    floated="right"
                    size="mini"
                    src={reviewer._id.image}
                  />
                  <Card.Header>{reviewer._id.name}</Card.Header>
                  <Card.Meta>Reviewer</Card.Meta>
                </Card.Content>
              </Card>
            </Card.Content>
        ))}

        <Card.Content>
          <Button
            content="Details"
            floated="left"
            color="olive"
            onClick={() => {
              setShowModal(true);
            }}
          />

          <Button
            content="Edit"
            floated="right"
            color="blue"
            onClick={() => {
              setShowEditModal(true);
            }}
          />
        </Card.Content>
      </Card>

      {showModal && (
        <Modal
          closeIcon
          closeOnDimmerClick
          centered
          onClose={() => setShowModal(false)}
          open={showModal}
        >
          <Modal.Content scrolling>
            <ModalComplainDetails user={user} complain={complain} />
          </Modal.Content>
        </Modal>
      )}

      {showEditModal && (
        <Modal
          closeIcon
          closeOnDimmerClick
          centered
          onClose={() => setShowEditModal(false)}
          open={showEditModal}
        >
          <Modal.Content scrolling>
            <ModalComplainEdit
              user={user}
              complain={complain}
              setComplains={setComplains}
            />
          </Modal.Content>
        </Modal>
      )}
    </div>
  );
}

export default CardComplain;

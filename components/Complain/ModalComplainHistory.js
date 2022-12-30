import React, { useState, version } from 'react';
import calculateTime from '../../utils/calculateTime';
import { Card, Modal, Image } from 'semantic-ui-react';

function ModalComplainHistory({ user, complain }) {
  const [versions, setVersions] = useState(complain.versions);
  return (
    <div>
      <Modal.Header>All Histories</Modal.Header>
      <Modal.Content>
        <Card.Group>
          {versions.length > 0 &&
            versions.map((version) => (
              <Card>
                <Card.Content>
                  <Card.Header as="h3">{version._id.title}</Card.Header>
                  <Card.Meta>{calculateTime(version.date)}</Card.Meta>
                  <Card.Meta>Version: {version._id.version}</Card.Meta>
                </Card.Content>

                <Card.Content>{version._id.complain}</Card.Content>

                <Card.Content>
                  <Card>
                    <Card.Content>
                      <Image
                        floated="right"
                        size="mini"
                        src={version.editor.image}
                      />
                      <Card.Header>{version.editor.name}</Card.Header>
                      <Card.Meta>Editor</Card.Meta>
                    </Card.Content>
                  </Card>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Modal.Content>
    </div>
  );
}

export default ModalComplainHistory;

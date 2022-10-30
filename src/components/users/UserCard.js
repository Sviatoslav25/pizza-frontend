import React from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import { PROFILE_PHOTO } from '../../constants/settings';
import paths from '../../router/paths';

export default function UserCard({ user }) {
  return (
    <Row>
      <Col className="mt-3">
        <Link
          to={generatePath(paths.userProfile, { id: user._id })}
          style={{ color: 'inherit', textDecoration: 'inherit' }}
        >
          <Card>
            <Card.Body style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
              <div>
                <Image
                  src={user.profilePhoto || PROFILE_PHOTO}
                  alt="Profile photo"
                  roundedCircle
                  style={{
                    maxWidth: '80px',
                    height: 'auto',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div>
                <Card.Title>{user.nickname || user.email || 'none'}</Card.Title>
                <Card.Text>
                  <strong>About myself:</strong> {user.aboutMyself || 'none'}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </Row>
  );
}

import { Container, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Profile from '../components/profile/Profile';
import useProfile from '../hooks/useProfile';

export default function UserProfile() {
  const params = useParams();
  const [profile, { loading: isLoading, error }] = useProfile(params.id);

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !profile) {
    return <Container className="mt-4">Loading...</Container>;
  }
  return (
    <>
      <Profile profile={profile} isLoading={isLoading} error={error} />
    </>
  );
}

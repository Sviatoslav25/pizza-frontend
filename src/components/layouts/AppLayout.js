import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useCurrentUser from '../../hooks/useCurrentUser';
import useLogout from '../../hooks/useLogout';
import paths from '../../router/paths';
import AuthManager from '../../services/AuthManager';
import ButtonWithSpinner from '../common/ButtonWithSpinner';

export default function AppLayout({ children }) {
  const [user] = useCurrentUser();
  const [logout, { loading: isLoading }] = useLogout({
    onError: (e) => {
      toast.error(e.message);
    },
    onCompleted: () => {
      AuthManager.logout();
    },
  });

  const onLogout = () => {
    logout({ variables: { token: AuthManager.getRefreshToken() } });
  };

  return (
    <>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Navbar.Brand as={Link} to={paths.home}>
            Pizza
          </Navbar.Brand>
          <Navbar.Collapse className="collapse navbar-collapse" id="responsive-navbar-nav">
            <Nav className="navbar-nav me-auto">
              <Nav.Link as={Link} to={paths.home}>
                Pizza List
              </Nav.Link>
              <Nav.Link as={Link} to={paths.users}>
                Users
              </Nav.Link>
              <Nav.Link as={Link} to={paths.basket}>
                Card
              </Nav.Link>
            </Nav>
            <Nav className="d-flex">
              <Nav.Link as={Link} to={paths.myProfile}>
                {user?.email}
              </Nav.Link>
              <ButtonWithSpinner loading={isLoading} variant="outline-secondary" onClick={onLogout}>
                logout
              </ButtonWithSpinner>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
}

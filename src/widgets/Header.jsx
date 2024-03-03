import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch('https://bookmyflights-server.onrender.com/auth/checkLogin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (response.ok) {
        setIsLoggedIn(true)
        const userResponse = await fetch('https://bookmyflights-server.onrender.com/auth/getUser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'token': localStorage.getItem('token')
          }
        });
        if (userResponse.ok) {
          const user = await userResponse.json();
          setUserId(user.id);
          if (user.roles === 'ROLE_ADMIN') {
            setIsAdmin(true);
          }
        }
      }
    }
    checkLogin();
  });
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ position: "fixed", width: "100%", zIndex: 3 }}>
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className={`nav-link`}
                  onClick={() => navigate('/')}
                >
                  Home
                </button>
              </li>
              {
                isAdmin ? (
                  <li className="nav-item">
                    <button
                      className={`nav-link`}
                      onClick={() => navigate('/addFlight')}
                    >
                      Add a flight
                    </button>
                  </li>
                ) : null
              }
            </ul>
          </div>
        </div>
        <div>
          {isLoggedIn ? (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <form class="form-inline">
                <button
                  className='btn btn-danger my-2 my-sm-0'
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                    if (window.confirm('Are you sure you want to log out?')) {
                      localStorage.removeItem('token');
                      setIsLoggedIn(false);
                      setIsAdmin(false);
                      navigate('/login');
                    }
                  }}
                >
                  Logout
                </button>
              </form>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <form class="form-inline">
                <button
                  className='btn btn-warning my-2 my-sm-0'
                  style={{ marginRight: '10px', width: 'max-content' }}
                  onClick={() => navigate('/register')}
                >
                  Register
                </button>
              </form>
              <form class="form-inline">
                <button
                  className='btn btn-danger my-2 my-sm-0'
                  style={{ marginRight: '10px' }}
                  onClick={() => {
                      navigate('/login');
                    }
                  }
                >
                  Login
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
      <br />
      <br />
      <br />
    </div>
  )
}

export default Header

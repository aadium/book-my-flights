import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const navigate = useNavigate();
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
              <li className="nav-item">
                <button
                  className={`nav-link`}
                  onClick={() => navigate('/addFlight')}
                >
                  Add Flight
                </button>
              </li>
            </ul>
          </div>
        </div>
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
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </form>
      </nav>
      <br />
      <br />
      <br />
    </div>
  )
}

export default Header

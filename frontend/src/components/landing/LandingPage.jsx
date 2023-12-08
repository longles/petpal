import '../../styles/layout.css';
import '../../styles/index.scoped.css';

const LandingPage = () => {
    return (
      <>
        <div className="main-content">
          <h1 className="logo-icon">Pet Pal</h1>
          <div className="search-container">
            <form action="/pets/" className="form-inline">
              <input type="text" placeholder="Search for pets/shelters" className="search-input" />
              <a href="/pets/" className="search-btn btn btn-primary" type="submit">Search</a>
            </form>
          </div>
          <div className="search-help">
            <h2>Looking to adopt?</h2>
          </div>
          <div className="animal-cards">
            <a href="/pets/?species=1" className="animal-card" data-animal="dogs">
              <div className="card-content">
                <p>Dogs</p>
              </div>
            </a>
            <a href="/pets/?species=2" className="animal-card" data-animal="cats">
              <div className="card-content">
                <p>Cats</p>
              </div>
            </a>
            <a href="/pets/?species=3" className="animal-card" data-animal="others">
              <div className="card-content">
                <p>Birds</p>
              </div>
            </a>
          </div>
          <div className="search-help">
            <h2>Sign up as a shelter?</h2>
            {/* change to signup as shelter later */}
            <h3>Register <a href="/accounts/">here</a></h3>
          </div>
        </div>
  

      </>
    );
  };
  
  export default LandingPage;
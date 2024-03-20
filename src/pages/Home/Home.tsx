import astronaut2 from "../../assets/images/astronaut2.png";
import galaxy from "../../assets/images/galaxy2.jpg";
import orion from "../../assets/images/orion.jpg";
import nebula from "../../assets/images/nebula.jpg";
import astronaut from "../../assets/images/astronaut.jpg";
import skyMap from "../../assets/images/sky-map.jpg";
import { useNavigate } from "react-router-dom";
import "./Home.css";

/**
 * Home Component
 *
 * This component is in charge of controlling the UI for the home page.
 *
 * The home page consists of information regarding the entire website
 * and providing users with a concise and accurate depiction of what to expect
 * from our web app.
 *
 * @returns the view for the main page of the website
 */
function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="home-page-container">
        <section id="hero-section" className="section-container">
          <div id="hero-text-container" className="home-text-container">
            <p className="hero-text">
              Have you ever wondered what lies beyond?
            </p>
            <p>
              Venture into our sky catalog and discover things in space you've
              never seen before!
            </p>
            <button
              className="home-button"
              onClick={() => {
                navigate("/sky-objects");
              }}
            >
              Explore the Cosmos
            </button>
          </div>
          <img id="hero-image" src={astronaut2} alt="astronaut image" />
        </section>
        <section id="info-section" className="section-container">
          <h1 id="info-section-header">
            Embark on your journey through space...
          </h1>
          <div className="section-container">
            <div id="left-column" className="home-grid-column">
              <p id="galaxy-title" className="image-title">
                Galaxies
              </p>
              <img src={galaxy} alt="galaxy" className="home-image" />
              <p id="galaxy-text" className="image-text">
                Discover what galaxies exist beyond such as the Milky Way, etc.
              </p>
            </div>
            <div id="middle-column" className="home-grid-column">
              <p id="nebula-title" className="image-title">
                Nebulae
              </p>
              <img src={nebula} alt="nebula" className="home-image" />
              <p id="nebula-text" className="image-text">
                Discover nebulae which are interstellar clouds of gas and dust.{" "}
              </p>
            </div>
            <div id="right-column" className="home-grid-column">
              <p id="stars-title" className="image-title">
                Stars
              </p>
              <img src={orion} alt="stars" className="home-image" />
              <p id="stars-text" className="image-text">
                Discover stars including some of your favourite constellations
                such as The Big Dipper and The Little Dipper
              </p>
            </div>
          </div>
        </section>
        <section id="sky-map-section" className="section-container">
          <div id="sky-map-text-container" className="home-text-container">
            <p className="section-title">Sky Map</p>
            <p id="sky-map-text" className="home-section-text">
              Browse our sky map to see where each sky object resides including
              your favourite stars and galaxies
            </p>
            <button
              id="sky-map-nav-button"
              className="home-button"
              onClick={() => {
                navigate("/sky-map");
              }}
            >
              Browse Sky Map
            </button>
          </div>
          <img
            id="sky-map-image"
            className="section-image"
            src={skyMap}
            alt="sky map"
          />
        </section>
        <section id="favourites-section" className="section-container">
          <img
            id="astronaut-image"
            className="section-image"
            src={astronaut}
            alt="favourites"
          />
          <div id="favourites-text-container" className="home-text-container">
            <p className="section-title">Favourites</p>
            <p id="home-favourites-text" className="home-section-text">
              Save sky objects to favourites so you can always go back and check
              them out again!
            </p>
            <button
              id="favourites-nav-button"
              className="home-button"
              onClick={() => {
                navigate("/favourites");
              }}
            >
              View Collection
            </button>
          </div>
        </section>
        <section id="call-to-action" className="section-container">
          <div id="call-to-action-container">
            <p id="call-to-action-text">Create an account today</p>
            <p id="call-to-action-subtext">
              and start your adventure into space, saving all your favourite sky
              objects into your own personal collection
            </p>
            <button
              id="call-to-action-button"
              className="home-button"
              onClick={handleClick}
            >
              Begin Your Journey Today
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;

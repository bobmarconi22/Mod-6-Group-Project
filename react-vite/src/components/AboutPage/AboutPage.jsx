import { useNavigate } from "react-router-dom";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div id="about-div">
      <h1>About Us</h1>
      <div id="authors">
        <div id="author-card">
          <h2>Bob Marconi</h2>
          <img src={"/bob.png"} alt="Bob" className="author-pfp" />
          <div className="author-links">
            <a href="https://github.com/bobmarconi22" target="_blank">
              <img
                src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/github_coding_dev_developer-512.png"
                className="link-img"
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/bob-marconi-3656932a9/"
              target="_blank"
            >
              <img src="/linkdin.png" className="link-img" alt="linkdin" />
            </a>
          </div>
        </div>
        <div className="author-card">
          <h2>Shelby Casalena</h2>
            <img src={"/shelby.png"} alt="Shelby" className="author-pfp" />
            <div className="author-links">
            <a href="https://github.com/yoshelb" target="_blank">
              <img
                src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/github_coding_dev_developer-512.png"
                className="link-img"
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/shelbey-casalena-ba196bb5/"
              target="_blank"
            >
              <img src="/linkdin.png" className="link-img" alt="linkdin" />
            </a>
          </div>
        </div>
        <div className="author-card">
          <h2>Bailey Robinson</h2>
            <img src={"/bailey.png"} alt="Bailey" className="author-pfp" />
            <div className="author-links">
            <a href="https://github.com/BaileyARobinson" target="_blank">
              <img
                src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/github_coding_dev_developer-512.png"
                className="link-img"
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/baileyrobinson/"
              target="_blank"
            >
              <img src="/linkdin.png" className="link-img" alt="linkdin" />
            </a>
          </div>
        </div>
        <div className="author-card">
          <h2>Andrew Ly</h2>
            <img src={"/andrew.png"} alt="Andrew" className="author-pfp" />
            <div className="author-links">
            <a href="https://github.com/enchuu205" target="_blank">
              <img
                src="https://cdn0.iconfinder.com/data/icons/eon-social-media-contact-info-2/32/github_coding_dev_developer-512.png"
                className="link-img"
                alt="github"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/andrew-ly204/"
              target="_blank"
            >
              <img src="/linkdin.png" className="link-img" alt="linkdin" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

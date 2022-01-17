import React from "react";
import styled from "styled-components";
import { Breakpoints } from "../../styles/Breakpoints";

function About() {
  return (
    <StyledAbout>
      <div className="borders">
        <section className="title">
          <h3>
            This app is a training material <br /> built as a comprehensive
            student project
            <br /> upon passing Full Stack Open Course.
          </h3>
          <p>
            Test out the app out by typing in admin for username
            <br /> and admin for password on the log in page.
            <br /> Or you can sign up with your email.
          </p>
        </section>
        <section className="technologies">
          <article className="variant1">
            <div className="left">
              <h4>The technologies used:</h4>
              <ul>
                <li>React Hooks, Javascript</li>
                <li>Redux</li>
                <li>Axios</li>
                <li>Node.js, Express</li>
                <li>MongoDB, Mongoose</li>
              </ul>
            </div>
            <div className="right">
              <h4>Git repository:</h4>
              <p>www.github.com/Starle21/Houston-version1</p>
              <h4>App based on:</h4>
              <p>Assignment by TechFides Solutions s.r.o.</p>
            </div>
          </article>
        </section>
        <section className="other-projects">
          <h4>Check out my other stuff:</h4>
          <a href="https://www.zivotodarnamista.net/">zivotodarnamista.net</a>
          <a href="https://www.wholessence.cz/explainers">
            wholessence.cz/explainers
          </a>
          <a href="https://www.wholessence.cz/">wholessence.cz</a>
        </section>
      </div>
    </StyledAbout>
  );
}

const StyledAbout = styled.div`
  .borders {
    // margin: 0 15rem;
    max-width: 950px;
    margin: 0 auto;
    margin-top: -10rem;

    position: relative;
    z-index: 15;

    .title {
      display: flex;
      flex-direction: column;
    }

    h3 {
      font-variant: small-caps;
      font-family: "JohnSans Black Pro";
      font-size: 25px;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        height: 10px;
        width: 400px;
        border-radius: 5px;
        background: linear-gradient(to right, #fbb04000, #f15a29);
        bottom: -15px;
        left: 110px;
      }
    }

    p {
      margin: 0;
      font-variant: small-caps;
      font-family: "JohnSans Lite Pro";
      font-size: 20px;
    }

    @media (${Breakpoints.deskXL}) {
      width: 2200px;
      margin: 0 auto;
      margin-top: -10rem;
    }
  }

  .variant1 {
    display: flex;

    margin: 5rem 0;

    h4 {
      font-variant: small-caps;
      font-family: "JohnSans Black Pro";
      font-size: 20px;
      margin-bottom: 0.5rem;
    }

    ul {
      margin-top: 0;
    }

    li {
      font-variant: small-caps;
      font-family: "JohnSans Lite Pro";
      font-size: 20px;
    }

    .left {
      flex-basis: 30%;
      padding-left: 8rem;
    }
    .right {
      flex-basis: 70%;
      text-align: center;
    }
  }

  .other-projects {
    margin: 5rem 0;
    text-align: center;

    h4 {
      font-variant: small-caps;
      font-family: "JohnSans Black Pro";
      font-size: 20px;
      margin-bottom: 0.5rem;
    }

    a {
      font-family: "JohnSans Lite Pro";
      font-size: 20px;
      font-variant: small-caps;

      background-color: #191e3b;
      color: white;
      border: none;
      text-decoration: none;

      margin: 0 0.5rem;
      padding: 0.2rem 1rem;
      border-radius: 5px;
    }
  }
`;

export default About;

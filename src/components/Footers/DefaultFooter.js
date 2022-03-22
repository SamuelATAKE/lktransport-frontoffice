/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
                <a
                  href="/"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="/landing-page"
                >
                  A propos
                </a>
              </li>
              <li>
                <a
                  href="/"
                >
                  Blog
                </a>
              </li>
            </ul>
          </nav>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;

/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
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
  );
}

export default DarkFooter;

import React, { useState } from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import TarifService from "../../services/TarifService";

function TarifPage() {
  const [iconPills, setIconPills] = React.useState("1");
  const [pills, setPills] = React.useState("1");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  const [lome, setLome] = React.useState({ tarifs: [] });
  const [cinkasse, setCinkasse] = React.useState({ tarifs: [] });

  const [state, setState] = useState({ tarifs: [] });

  TarifService.getTarif().then((response) => {
    // tab.push(response.data);
    // console.log('After push');
    // console.log(JSON.stringify(response.data));
    response.data.forEach((element) => {
      // console.log(element.depart);
      setState({ tarifs: response.data });
      if (response.data.depart === "Lomé") {
        // console.log('Lomé');
        setLome({ tarifs: response.data });
      } else if (response.data.depart === "Cinkassé") {
        // console.log('Cinkassé');
        setCinkasse({ tarifs: response.data });
      }
    });
    console.log("L etat");
    console.log(state);
  });

  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
        <ProfilePageHeader />
        <div className="section">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                Suivez-nous
              </Button>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip515203352"
                size="lg"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip515203352">
                Suivez-nous sur Twitter
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Suivez-nous sur Instagram
              </UncontrolledTooltip>
            </div>
            <h3 className="title">Les différents tarifs</h3>
            <h5 className="description"></h5>
            <Row>
              <Col className="ml-auto mr-auto" md="12">
                <h4 className="title text-center">Par lieu de départ</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Col>
              <TabContent
                className="gallery ml-auto mr-auto"
                activeTab={"pills" + pills}
              >
                <TabPane tabId="pills1">
                  <Col className="ml-auto mr-auto" md="12">
                    <p>Départ: Lomé</p>
                    <Row>
                      {lome.tarifs.map((tarif) => (
                        <Col lg="12" key={tarif.id}>
                          <Card>
                            <CardHeader className="bg-success text-white">
                              <h3>{tarif.destination}</h3>
                              <hr />
                            </CardHeader>

                            <CardFooter className="text-black">
                              <h4>{tarif.prix}</h4>
                            </CardFooter>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </TabPane>
                <TabPane tabId="pills2">
                  <Col className="ml-auto mr-auto" md="12">
                    <p>Départ: Cinkassé</p>
                    <Row>
                      {cinkasse.tarifs.map((tarif) => (
                        <Col lg="12" key={tarif.id}>
                          <Card>
                            <CardHeader className="bg-success text-white">
                              <h3>{tarif.destination}</h3>
                              <hr />
                            </CardHeader>

                            <CardFooter className="text-black">
                              <h4>{tarif.prix}</h4>
                            </CardFooter>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </TabPane>
              </TabContent>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default TarifPage;

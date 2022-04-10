import React, { useState } from "react";
import axios from "axios";
// reactstrap components
import {
  Button,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  CardBody,
  Card,
  CardTitle,
  CardText,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";

function TarifPage() {
  // const [iconPills, setIconPills] = React.useState("1");
  // const [pills, setPills] = React.useState("1");
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

  const [state, setState] = useState({ tarifs: [] });

  // TarifService.getTarif().then((response) => {
    // tab.push(response.data);
    // console.log("After push");
    // console.log(JSON.stringify(response.data));
  //  response.data.forEach((element) => {
      // console.log(element.depart);
  //    setState({ tarifs: response.data });
      // if (response.data.depart === "Lomé") {
      // console.log("Lomé");
      // setLome({ tarifs: response.data });
      // } else if (response.data.depart === "Cinkassé") {
      // console.log("Cinkassé");
      // setCinkasse({ tarifs: response.data });
      // }
  //  });
    // console.log("L etat");
    // console.log(state.tarifs[0]);
  // });
  
  // axios.get(`https://lktransportbackend.herokuapp.com/tarif`).then((res) => {
  axios.get(`http://localhost:8080/tarif`).then((res) => {
    // console.log(res.data);
    setState({ tarifs: res.data });
  
  //  state.tarifs.forEach((element) => {
  //    if (element.depart === "Lomé") {
  //      setLome({ tarifs: element });
  //    } else if (element.depart === "Cinkassé") {
  //      setCinkasse({ tarifs: element });
  //    }
  //  });
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
            <Row>
              <Col className="ml-auto mr-auto" md="12">
              </Col>
              <TabContent className="gallery ml-auto mr-auto">
                <TabPane>
                  <Col className="ml-auto mr-auto" md="12">
                    <Row>
                      {state.tarifs.map((tarif) => (
                        <Card style={{width: '20rem'}} key={tarif}>
                          <CardBody>
                            <CardTitle>Départ: {tarif.depart}.</CardTitle>
                            <CardText class="card-text">
                              Destination: {tarif.destination}.
                            </CardText>
                            <Button class="btn btn-success">
                              {tarif.prix} FCFA.
                            </Button>
                          </CardBody>
                        </Card>
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

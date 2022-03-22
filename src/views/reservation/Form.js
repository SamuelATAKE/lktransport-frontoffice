import React from "react";

// reactstrap components
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Container,
  Row,
  Col,
} from "reactstrap";


// core components
import DefaultFooter from "components/Footers/DefaultFooter.js";
// import IndexNavbar from "components/Navbars/IndexNavbar";

function Form() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
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
  return (
    <>
      {/* <IndexNavbar /> */}
      <div className="wrapper">
        <div className="section">
          <Container>
            <h3 className="title">Réservation</h3>
            <h5 className="description">
              Veuillez remplir correctement les informations du formulaire pour effectuer votre réservation
            </h5>
            <Row>
              <Col className="text-center ml-auto mr-auto" lg="6" md="8">
                <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons users_circle-08"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Votre nom complet..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons tech_mobile"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Votre numéro de téléphone..."
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons sport_user-run"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  >
                      <option>Sélectionnez votre ville de départ</option>
                      <option>Lomé</option>
                      <option>Kara</option>
                      <option>Sokodé</option>
                      <option>Atakpamé</option>
                      <option>Niamtougou</option>
                      <option>Dapaong</option>
                      <option>Cinkassé</option>
                  </Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons objects_spaceship"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  >
                      <option>Sélectionnez votre ville d'arrivée</option>
                      <option>Lomé</option>
                      <option>Kara</option>
                      <option>Sokodé</option>
                      <option>Atakpamé</option>
                      <option>Niamtougou</option>
                      <option>Dapaong</option>
                      <option>Cinkassé</option>
                  </Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons shopping_bag-16"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  >
                      <option>Avez-vous des bagages?</option>
                      <option>Non, je n'en ai pas.</option>
                      <option>Oui, juste mon sac de voyage</option>
                      <option>Oui, j'ai des bagages conséquents</option>
                  </Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="name"
                    placeholder="Laisser un commentaire... (facultatif)"
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>
                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="success"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="lg"
                  >
                    Faire la réservation
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default Form;

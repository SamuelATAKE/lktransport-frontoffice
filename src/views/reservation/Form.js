import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
// import { useEffect } from "react/cjs/react.production.min";
// import IndexNavbar from "components/Navbars/IndexNavbar";

const initialState = {
  dateVoyage: "",
  nom: "",
  telephone: "",
  depart: "",
  destination: "",
  bagages: "",
  station: "",
};

const iState = {
  dateVoyage: "",
  nom: "",
  telephone: "",
  tarif: "",
  bagages: "",
  station: "",
};

const itState = {
  depart: "",
  destination: "",
  prix: "",
};

function Form() {
  const history = useHistory();
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

  const [state, setState] = React.useState(initialState);
  const [rstate, setRstate] = React.useState(iState);
  const [sstate, setSstate] = React.useState({ stations: [] });
  const [fstate, setFstate] = React.useState({ tarifs: [] });
  const [tstate, setTstate] = React.useState(itState);
  const { dateVoyage, nom, telephone, depart, destination, bagages, station } =
    state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  React.useEffect(() => {
    axios
      .get(`https://lktransportbackend.herokuapp.com/station`)
      // .get(`http://localhost:8080/station`)
      .then((res) => {
        setSstate({ stations: res.data });
      });

    // axios.get(`http://localhost:8080/tarif`).then((res) => {
    axios.get(`https://lktransportbackend.herokuapp.com/tarif`).then((res) => {
      setFstate({ tarifs: res.data });
    });
    // console.log("L'??tat");
    // console.log(sstate);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // axios.get("http://localhost:8080/station").then((res) => {
    //  setSstate({ stations: res.data });
    // });
    console.log("L'??tat");
    console.log(state);

    fstate.tarifs.forEach((element) => {
      if (
        state.depart === element.depart &&
        state.destination === element.destination
      ) {
        const tarif = element;
        console.log("Ice");

        tstate.depart = state.depart;
        tstate.destination = state.destination;
        tstate.prix = element.prix;

        console.log(tstate);

        console.log(element);

        rstate.dateVoyage = new Date(state.dateVoyage)
          .toISOString()
          .substring(0, 10);
        rstate.nom = state.nom;
        rstate.telephone = state.telephone;
        rstate.bagages = state.bagages;
        rstate.tarif = Object.assign(element);
        rstate.station = JSON.parse(state.station);

        console.log(rstate);
        console.log(JSON.stringify(rstate));
      }
    });
    console.log("End foreach");
    axios
      .post(
        `https://lktransportbackend.herokuapp.com/reservation`,
        //`http://localhost:8080/reservation`,
        JSON.stringify(rstate),
        {
          // .post(`http://localhost:8080/reservation`, JSON.stringify(rstate), {
          headers: {
            "content-type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        sessionStorage.setItem("reservation", rstate);
        console.log("navigate");
        history.push({ pathname: "/qrcode", state: { reservation: rstate } });
      });
    console.log("done");

    //for(let elt of sstate){
    //  if(rstate.station === elt.id){
    //    rstate.station = elt;
    //    break;
    //  }
    // }

    console.log(rstate);

    // axios.post(`http://localhost:8080/reservation`, JSON.stringify(rstate)).then((res) => {
    //  console.log(res.data);
    // });
  };

  return (
    <>
      {/* <IndexNavbar /> */}
      <div className="wrapper">
        <div className="section">
          <Container>
            <h3 className="title">R??servation</h3>
            <h5 className="description">
              Veuillez remplir correctement les informations du formulaire pour
              effectuer votre r??servation
            </h5>
            <form onSubmit={onSubmit}>
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
                      name="nom"
                      value={nom}
                      onChange={handleInputChange}
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
                      placeholder="Votre num??ro de t??l??phone..."
                      type="number"
                      name="telephone"
                      value={telephone}
                      onChange={handleInputChange}
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
                      name="depart"
                      value={depart}
                      onChange={handleInputChange}
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    >
                      <option>S??lectionnez votre ville de d??part</option>
                      <option value="Lom??">Lom??</option>
                      <option value="Kara">Kara</option>
                      <option value="Sokod??">Sokod??</option>
                      <option value="Atakpam??">Atakpam??</option>
                      <option value="Niamtougou">Niamtougou</option>
                      <option value="Dapaong">Dapaong</option>
                      <option value="Cinkass??">Cinkass??</option>
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
                      name="destination"
                      value={destination || ""}
                      onChange={handleInputChange}
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    >
                      <option>S??lectionnez votre ville d'arriv??e</option>
                      <option value="Lom??">Lom??</option>
                      <option value="Kara">Kara</option>
                      <option value="Sokod??">Sokod??</option>
                      <option value="Atakpam??">Atakpam??</option>
                      <option value="Niamtougou">Niamtougou</option>
                      <option value="Dapaong">Dapaong</option>
                      <option value="Cinkass??">Cinkass??</option>
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
                      name="bagages"
                      value={bagages || ""}
                      onChange={handleInputChange}
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    >
                      <option>Avez-vous des bagages?</option>
                      <option value="Non">Non, je n'en ai pas.</option>
                      <option value="OuiJ">Oui, juste mon sac de voyage</option>
                      <option value="OuiC">
                        Oui, j'ai des bagages cons??quents
                      </option>
                    </Input>
                  </InputGroup>
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
                      type="date"
                      name="dateVoyage"
                      value={dateVoyage}
                      onChange={handleInputChange}
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
                        <i className="now-ui-icons shopping_bag-16"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="select"
                      name="station"
                      value={station || ""}
                      onChange={handleInputChange}
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                    >
                      <option>S??lectionner votre station de d??part</option>
                      {sstate.stations.map((station) => (
                        <option
                          value={JSON.stringify(station)}
                          key={station.id}
                        >
                          {station.nom}.
                        </option>
                      ))}
                    </Input>
                  </InputGroup>
                  <div className="textarea-container">
                    <Input
                      cols="80"
                      name="commentaire"
                      onChange={handleInputChange}
                      placeholder="Laisser un commentaire... (facultatif)"
                      rows="4"
                      type="textarea"
                    ></Input>
                  </div>
                  <div className="send-button">
                    <Button
                      block
                      type="submit"
                      className="btn-round"
                      color="success"
                      size="lg"
                    >
                      Faire la r??servation
                    </Button>
                  </div>
                </Col>
              </Row>
            </form>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default Form;

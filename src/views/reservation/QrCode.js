import React from "react";
// reactstrap components
import { Button, Container } from "reactstrap";
import ReactToPdf from "react-to-pdf";

// core components
import DefaultFooter from "components/Footers/DefaultFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { QRCodeSVG } from "qrcode.react";
// import { useEffect } from "react/cjs/react.production.min";
// import IndexNavbar from "components/Navbars/IndexNavbar";

function QrCode(props) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const ref = React.createRef();
  // const qvalue = "";
  React.useEffect(() => {
    // var reservation = sessionStorage.getItem("reservation");
    console.log("Réservation");
    console.log(props.location.state.reservation);
    // qvalue = "reservation/";
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, [props]);

  const state = {
    value:
      "https://lktransportbackend.herokuapp.com/reservation/" +
      sessionStorage.getItem("reservation").id,
  };

  const download = () => {
    var canvas = document.getElementById("reservation");
    console.log(canvas);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "reservation.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // canvas.toBlob(function (blob) {
    //  saveAs(blob, "reservation.png");
    // });
  };

  React.useEffect(() => {
    // download();
  }, []);

  return (
    <>
      {/*<IndexNavbar />*/}
      <div className="wrapper">
        <div className="section">
          <Container>
            <center>
              <ReactToPdf
                targetRef={ref}
                filename="mareservation.pdf"
                x={0.5}
                y={0.5}
                scale={0.8}
              >
                {({ toPdf }) => (
                  <Button
                    onClick={toPdf}
                    className="btn-round"
                    color="success"
                    size="md"
                  >
                    Télécharger
                  </Button>
                )}
              </ReactToPdf>
            </center>
          </Container>
          <Container>
            <div ref={ref}>
              <h3 className="title">Réservation effectuée</h3>
              <hr />
              <h4 className="description">
                Frais de voyage: {props.location.state.reservation.tarif.prix}{" "}
                FCFA
              </h4>
              <hr />
              <h4 className="description">Taxe sur bagages: - FCFA</h4>
              <hr />
              <h5 className="description">Voici votre code QR</h5>
              <center>
                <QRCodeSVG
                  id="reservation"
                  value={state.value}
                  fgColor="#00FF00"
                  size={280}
                  includeMargin={true}
                />
              </center>
            </div>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default QrCode;

import React from "react";
// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

// core components
import DefaultFooter from "components/Footers/DefaultFooter.js";
import IndexNavbar from "components/Navbars/IndexNavbar";
import { QRCodeSVG } from "qrcode.react";
// import { useEffect } from "react/cjs/react.production.min";
// import IndexNavbar from "components/Navbars/IndexNavbar";

function QrCode() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  // const qvalue = "";
  React.useEffect(() => {
    var reservation = sessionStorage.getItem("reservation");
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
  }, []);

  const state = {
    value:
      "http://localhost:3000/reservation/" +
      sessionStorage.getItem("reservation"),
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
            <h3 className="title">Réservation effectuée</h3>
            <h5 className="description">Voici votre code QR</h5>
            <center>
              <QRCodeSVG
                id="reservation"
                value={state.value}
                fgColor="#00FF00"
                size={220}
                includeMargin={true}
              />
              <Button
                onClick={download}
                className="btn-round"
                color="success"
                size="md"
              >
                Télécharger
              </Button>
            </center>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default QrCode;

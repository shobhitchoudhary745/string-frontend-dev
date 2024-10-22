import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export default function Footer() {
  const { token } = useSelector((state) => state.auth);
  const d = new Date();
  return (
    <>
      {token ? (
        <Container  fluid className="w-100 pt-1 pb-2 mt-auto">
          <hr/>
          <footer style={{color:"#98a6ad",fontSize:"14px"}} className="text-center">
            <strong >
              Copyright © 2014-{`${d.getFullYear()} `}
              <Link target="_blank" rel="noreferrer" style={{color:"#007bff"}} to="https://www.stringgeo.com/">String Geo</Link>.{" "}
            </strong>
            All rights reserved.
          </footer>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
}

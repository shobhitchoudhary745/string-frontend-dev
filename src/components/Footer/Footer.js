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
        <Container  fluid className="p-0 mt-auto">
          <footer className="text-center">
            <strong>
              Copyright © 2014-{`${d.getFullYear()} `}
              <Link to="/">String Geo</Link>.{" "}
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

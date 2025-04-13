// components/Converter.jsx

import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useExchangeTaux } from "../hooks/useExchangeTaux";
import { createExchangeTaux } from "../services/exchangeService";

const Converter = () => {
  const [eurValue, setEurValue] = useState(1);
  const [usdValue, setUsdValue] = useState(0);
  const [isEurToUsd, setIsEurToUsd] = useState(true);
  const [exchangeTaux, setExchangeTaux] = useState([]);

  const { tauxChange, tauxUser, setTauxUser } = useExchangeTaux();

  useEffect(() => {
    if (isEurToUsd) {
      setUsdValue((eurValue * tauxChange).toFixed(4));
    } else {
      setEurValue((usdValue / tauxChange).toFixed(4));
    }
  }, [eurValue, usdValue, isEurToUsd]);

  useEffect(() => {
    const newRequest = createExchangeTaux({
      isEurToUsd,
      tauxChange,
      eurValue,
      usdValue,
    });

    setExchangeTaux((prev) => [newRequest, ...prev.slice(0, 4)]);
  }, [tauxChange]);

  const handleEurChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setEurValue(value);
  };

  const handleUsdChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setUsdValue(value);
  };

  const toggleSwitch = () => {
    setIsEurToUsd((prev) => !prev);
  };

  const handleTauxChange = (value) => {
    setTauxUser(value);
  };

  const handleGoClick = () => {
    const tauxFixe = parseFloat(tauxUser);
    if (isNaN(tauxFixe) || tauxFixe <= 0) return;

    const difference = Math.abs(tauxFixe - tauxChange);
    const percentDiff = (difference / tauxChange) * 100;

    if (percentDiff <= 0.02) {
      console.log("Taux accepté :", tauxFixe);
      setTauxUser(true);
    } else {
      setTauxUser(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={12}>
          <Card>
            <Card.Body>
              <h3 className="text-center">Convertisseur EUR / USD</h3>
              <p className="text-center">
                Taux de change actuel :{" "}
                <span className="text-danger">{tauxChange.toFixed(4)}</span>
              </p>

              <Form.Group className="mb-2" style={{ width: "30%" }}>
                <InputGroup>
                  <Form.Control
                    type="number"
                    value={tauxUser}
                    onChange={(e) => handleTauxChange(e.target.value)}
                    placeholder="Saisir le taux fixe"
                    min="0"
                    step="0.01"
                  />
                  <Button variant="primary" onClick={handleGoClick}>
                    GO
                  </Button>
                </InputGroup>
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>
                        {isEurToUsd ? "EUR" : "USD"}
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        value={isEurToUsd ? eurValue : usdValue}
                        onChange={
                          isEurToUsd ? handleEurChange : handleUsdChange
                        }
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col className="d-flex align-items-center justify-content-center">
                  <Button variant="primary" onClick={toggleSwitch}>
                    ⇄
                  </Button>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <InputGroup>
                      <InputGroup.Text>
                        {!isEurToUsd ? "EUR" : "USD"}
                      </InputGroup.Text>
                      <Form.Control
                        type="number"
                        readOnly
                        value={isEurToUsd ? usdValue : eurValue}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="justify-content-center mt-4">
                <Col md={12}>
                  <Card>
                    <Card.Body>
                      <h4 className="text-center">
                        Historique des 5 dernières demandes
                      </h4>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Taux Réel</th>
                            <th>Taux Saisi</th>
                            <th>Valeur initiale</th>
                            <th>Devise</th>
                            <th>Valeur calculée</th>
                            <th>Devise</th>
                            <th>Taux appliqué</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {exchangeTaux.map((req, index) => (
                            <tr key={index}>
                              <td>{req.tauxChange.toFixed(4)}</td>
                              <td>
                                {req.tauxUser ? req.tauxUser.toFixed(4) : "-"}
                              </td>
                              <td>{req.amount}</td>
                              <td>{req.fromCurrency}</td>
                              <td>{req.convertedAmount.toFixed(4)}</td>
                              <td>{req.toCurrency}</td>
                              <td>{req.tauxActive.toFixed(4)}</td>
                              <td>{req.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Converter;

import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import { BsChevronUp, BsChevronDown } from "react-icons/bs";

const FAQ = () => {
  const [activeKey, setActiveKey] = useState("0");

  const handleAccordionChange = (index) => {
    setActiveKey(index);
  };

  const faqData = [
    {
      question: "Apa itu sharing live?",
      answer:
        "Sharing live adalah fitur berbagi akun showroom yang bertujuan untuk bisa menghemat harga tiket show premium live dengan harga murah",
    },
    {
      question: "Keuntungan join sharing live?",
      answer:
        "Fitur sharing live memudahkan kalian yang ga punya credit card untuk bisa beli tiket live streaming dengan harga yang lebih murah",
    },
    {
      question: "Gimana cara daftar sharing live?",
      answer:
        "Kalian bisa klik button buy ticket diatas dan isi form data, bila data sudah lengkap lalu klik register sharing live",
    },
    {
      question: "Sistem sharing livenya gimana min?",
      answer:
        "Admin akan menyediakan beberapa akun showroom yang sudah ada tiket premium live di show yang akan dibeli",
    },
    {
      question: "Cara nonton show premium live?",
      answer:
        "Jika sudah membeli tiket sharing live kalian bisa langsung nonton premium live via web JKT48 SHOWROOM dengan cara klik dulu user profile dan klik button sharing live yang warna hijau ",
    },
  ];

  return (
    <Accordion
      className="custom-accordion"
      activeKey={activeKey}
      onSelect={handleAccordionChange}
    >
      {faqData.map((faq, index) => (
        <Card className="custom-card" key={index}>
          <Card.Header className="custom-card-header">
            <Accordion.Toggle
              as={Card.Header}
              variant="link"
              eventKey={index.toString()}
            >
              <span role="button">
                <div className="d-flex justify-content-between cursor-pointer">
                  <span style={{ fontWeight: "600" }}>{faq.question}</span>
                  {activeKey === index.toString() ? (
                    <BsChevronUp />
                  ) : (
                    <BsChevronDown />
                  )}
                </div>
              </span>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={index.toString()}>
            <Card.Body className="custom-card-body">{faq.answer}</Card.Body>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default FAQ;

import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import classNames from "classnames";
import CountUp from "react-countup";

interface StatisticsProps {
  icon: string;
  variant: string;
  stats: string;
  desc: string;
  type: string;
}

const Cards = ({ icon, variant, stats, desc, type }: StatisticsProps) => {
  let rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  // Extracting the numeric value from the stats
  const numericValue = Number(stats);

  // Getting the currency symbol from the formatted currency
  const currencySymbol = rupee
    .format(numericValue)
    .replace(/\d+|[,.]/g, "")
    .trim();

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col>
              <div
                className={classNames(
                  "avatar-lg",
                  "rounded-circle",
                  "bg-" + variant
                )}
              >
                <i
                  className={classNames(
                    icon,
                    "font-22",
                    "avatar-title",
                    "text-white"
                  )}
                ></i>
              </div>
            </Col>
            <Col>
              <div className="text-end">
                <h3 className="text-dark mt-1">
                  <span>
                    {type == "price" && currencySymbol}
                    <CountUp
                      duration={1}
                      end={type == "price" ? numericValue : Number(stats)}
                      separator={type == "price" ? "," : ""}
                    />
                  </span>
                </h3>
                <p className="text-muted mb-1 text-truncate">{desc}</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Cards;

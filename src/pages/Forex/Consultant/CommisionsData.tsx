import { Card, Col, Row } from "react-bootstrap";
import { getStatusProperties } from "../../Tickets/List/data";
import classNames from "classnames";
import CountUp from "react-countup";
import { useLocation } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";

const Statistics = ({ icon, variant, stats, desc, counterOptions }: any) => {
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
                    <CountUp duration={1} end={stats} {...counterOptions} />
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

const CommisionsData = ({ commisionDetails }: any) => {

  const { pathname } = useLocation();

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Tickets", path: pathname },
          {
            label:
              pathname === "/apps/closed-tickets"
                ? "Closed Tickets"
                : "Tickets",
            path: pathname,
            active: true,
          },
        ]}
        title={"Commisions"}
      />
      <Row>
        {commisionDetails?.map((item: any) => (
          <Col md={4} xl={4} key={item?.status_name}>
            <Statistics
              // icon={getStatusProperties(item?.description).icon || "abc"}
              // variant={getStatusProperties(item?.description).variant || "cvb"}
              // stats={item.commision}
              // desc={item.description}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CommisionsData;

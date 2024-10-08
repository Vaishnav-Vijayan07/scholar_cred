
import PageTitle from "../../../components/PageTitle";
import { Col, Row } from "react-bootstrap";
import Statistics from "./Statistics";
import { getStatusProperties } from "./data";
import { useLocation } from "react-router-dom";

interface StatusData {
  status_id: number;
  status_name: string;
  status_count: string;
}

interface Componentprops {
  countDetails: StatusData[];
}

const TicketCounts = ({ countDetails }: Componentprops) => {
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
        title={"Ticket List"}
      />
      <Row>
        {countDetails.map((item: any) => (
          <Col md={6} xl={3} key={item.status_name}>
            <Statistics
              icon={getStatusProperties(item.status_name).icon}
              variant={getStatusProperties(item.status_name).variant}
              stats={item.status_count}
              desc={item.status_name}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TicketCounts;

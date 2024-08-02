import { Card } from "react-bootstrap";

const UserBox = ({ consultantDetails }: any) => {

  return (
    <Card className="text-center">
      <Card.Body>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}${consultantDetails?.image_url}`}
          width={150}
          className="img-thumbnai object-fit-cover"
          alt="logo"
        />
        <h4 className="mb-0">{consultantDetails?.company_name}</h4>
        <p className="text-muted">{consultantDetails?.email}</p>

        <div className="text-start mt-3">
          <h4 className="font-13 text-uppercase">Business Address :</h4>
          <p className="text-muted font-13 mb-3">
            {consultantDetails?.business_address}
          </p>
          <p className="text-muted mb-2 font-13">
            <strong>Company Name :</strong>
            <span className="ms-2">{consultantDetails?.company_name}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Mobile :</strong>
            <span className="ms-2">{consultantDetails?.phone}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Alternative Mobile :</strong>
            <span className="ms-2">{consultantDetails?.alternative_phone}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Email :</strong>
            <span className="ms-2 ">{consultantDetails?.email}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Location :</strong>
            <span className="ms-2">{consultantDetails?.location}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Pin Code :</strong>
            <span className="ms-2">{consultantDetails?.pin_code}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Forex Privilege :</strong>
            <span className="ms-2">
              {consultantDetails?.isforexenabled ? "Enabled" : "Not enabled"}
            </span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Commission Amount :</strong>
            <span className="ms-2">{consultantDetails?.commisionamount}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>Pin Code :</strong>
            <span className="ms-2">{consultantDetails?.pin_code}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>GST No :</strong>
            <span className="ms-2">{consultantDetails?.gst}</span>
          </p>

          <p className="text-muted mb-2 font-13">
            <strong>PAN Number :</strong>
            <span className="ms-2">{consultantDetails?.pan_no}</span>
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserBox;

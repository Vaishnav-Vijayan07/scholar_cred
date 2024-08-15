const DocsColumn = ({ row }: any) => {
  const documents = [
    { name: "Passport", url: row.original.passport_url },
    { name: "PAN Card", url: row.original.pan_card_url },
    { name: "Offer Letter", url: row.original.offer_letter_url },
    { name: "Form A2", url: row.original.form_a2_url },
  ];

  return (
    <div>
      {documents.map((doc, index) => (
        <a href={doc.url} target="_blank" rel="noopener noreferrer">
          <div
            key={index}
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              width: "100px",
              justifyContent: "",
            }}
          >
            <div className="d-flex justify-content-center align-items-center"></div>
            <div>{doc.name}</div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default DocsColumn;

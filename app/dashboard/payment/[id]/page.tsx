import React from "react";

interface PaymentsProps {
  params: {
    id: string;
  };
}

function Payments({ params }: PaymentsProps) {
  const { id } = params;

  return <p>Post: {id}</p>;
}

export default Payments;

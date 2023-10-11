import React from "react";

type CharsCounterProps = {
  text: string;
  limit: number;
};

const CharsCounter = ({ text, limit }: CharsCounterProps) => {
  // If the text length is equal to the limit, show message in blue:
  if (text.length === limit) {
    return (
      <div
        style={{
          fontSize: "16px",
          fontWeight: "normal",
          color: "blue",
        }}
      >
        Você atingiu o limite de caracteres!
      </div>
    );
  }
  // Else show message in green:
  else {
    return (
      <div
        style={{
          fontSize: "16px",
          fontWeight: "normal",
          color: "green",
        }}
      >
        Quantidade de caracteres disponíveis = {limit - text.length}
      </div>
    );
  }
};

export default React.memo(CharsCounter);

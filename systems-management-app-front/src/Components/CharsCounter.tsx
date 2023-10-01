type CharsCounterProps = {
  text: string;
  limit: number;
};

const CharsCounter = ({ text, limit }: CharsCounterProps) => {
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
};

export default CharsCounter;

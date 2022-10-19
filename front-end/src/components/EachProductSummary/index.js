const EachProductSummary = ({ pdtName, imageUrl }) => {
  return (
    <div>
      <div style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div>
        <h2>{pdtName}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default EachProductSummary;

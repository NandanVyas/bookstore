export default function BooksLoading() {
  return (
    <div className="catalogue-page shell" aria-busy="true" aria-label="Loading books">
      <div className="skeleton skeleton--heading" />
      <div className="skeleton skeleton--toolbar" />
      <div className="book-grid">{Array.from({ length: 8 }, (_, index) => <div className="skeleton skeleton--card" key={index} />)}</div>
    </div>
  );
}

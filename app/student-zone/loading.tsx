export default function Loading() {
  return (
    <main className="content ip szp" aria-busy="true">
      <section className="ip-section">
        <div className="container ip-narrow">
          <div className="szp-skeleton szp-skeleton-crumbs" />
          <div className="szp-skeleton szp-skeleton-title" />
          <div className="szp-skeleton szp-skeleton-line" />
          <div className="szp-skeleton szp-skeleton-line" />
          <div className="szp-skeleton szp-skeleton-line szp-skeleton-line-short" />
        </div>
      </section>
    </main>
  );
}

// Skeleton con la forma del hero mientras cargan los datos
const PageLoader = () => (
  <div className="container-page grid min-h-screen animate-pulse items-center gap-12 pt-28 pb-16 md:grid-cols-2" aria-busy="true" aria-label="Cargando">
    <div className="space-y-5">
      <div className="h-3 w-32 rounded-full bg-brand-100" />
      <div className="h-12 w-4/5 rounded-2xl bg-brand-100" />
      <div className="h-12 w-3/5 rounded-2xl bg-brand-100" />
      <div className="h-4 w-full rounded-full bg-sand" />
      <div className="h-4 w-5/6 rounded-full bg-sand" />
      <div className="flex gap-3 pt-4">
        <div className="h-12 w-40 rounded-full bg-brand-100" />
        <div className="h-12 w-36 rounded-full bg-sand" />
      </div>
    </div>
    <div className="frame-arch mx-auto aspect-[4/5] w-full max-w-md bg-brand-100" />
  </div>
);

export default PageLoader;

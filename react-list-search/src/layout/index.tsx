export const Main = ({ title, children }: { title: string; children: JSX.Element }) => {
  return (
    <>
      <main className="relative min-h-[100vh]">
        <div className="h-[20rem] bg-blue-950">
          <h1 className="container text-white font-bold text-2xl top-1/2 relative">{title}</h1>
        </div>

        <div className="container relative -top-[2rem]">{children}</div>
      </main>
      <footer></footer>
    </>
  );
};

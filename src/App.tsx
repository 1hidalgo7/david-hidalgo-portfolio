import MinimalistHeroDemo from './demo';

function App() {
  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Saltar al contenido principal
      </a>
      <MinimalistHeroDemo />
    </>
  );
}

export default App;

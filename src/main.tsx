import { StrictMode, lazy, Suspense, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/manrope/index.css";
import "./styles/index.css";
import App from "./App.tsx";

/**
 * Dev: `?demo=<nome>` abre `src/**\/_demo-<nome>.tsx` no lugar do App,
 * para os WPs verem componentes/seções isolados sem editar o App.
 * Removido pelo integrador na Fase 3.
 */
function resolveRoot(): ComponentType {
  const demo =
    import.meta.env.DEV && new URLSearchParams(location.search).get("demo");
  if (!demo) return App;
  const demos = import.meta.glob<{ default: ComponentType }>(
    "./**/_demo-*.tsx",
  );
  const entry = Object.entries(demos).find(([path]) =>
    path.endsWith(`/_demo-${demo}.tsx`),
  );
  if (!entry) return App;
  const Demo = lazy(entry[1]);
  return () => (
    <Suspense>
      <Demo />
    </Suspense>
  );
}

const Root = resolveRoot();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);

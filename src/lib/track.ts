/**
 * Tracking de eventos. Hoje é no-op (com `console.debug` em dev).
 * Pronto para plugar GA4 ou Vercel Analytics depois, sem mexer nos componentes.
 */
export type TrackEvent = "cta_whatsapp";
export type TrackProps = { origem: string } & Record<string, string | number>;

export function track(event: TrackEvent, props: TrackProps) {
  if (import.meta.env.DEV) console.debug("[track]", event, props);
}

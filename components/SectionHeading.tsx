export function SectionHeading({ eyebrow, title, body }: { eyebrow?: string; title: string; body?: string }) {
  return (
    <div className="sectionHeading">
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

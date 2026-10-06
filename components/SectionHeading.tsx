export function SectionHeading({
  eyebrow,
  title,
  body,
  level = "h2",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  level?: "h1" | "h2";
}) {
  const Heading = level;
  return (
    <div className="sectionHeading">
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <Heading>{title}</Heading>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

export default function AppCard({
  description,
  app,
  imgLink,
  href,
}: {
  description: string;
  app: string;
  imgLink: string;
  href: string;
}) {
  return (
    <a
      className="flex items-center justify-center gap-4 rounded-3xl bg-white px-8 py-4 shadow-md"
      href={href}
    >
      <img src={imgLink} alt={`${app} Logo`} />
      <div>
        <p className="text-sm text-slate-600">{description}</p>
        <p className="font-bold">{app}</p>
      </div>
    </a>
  );
}

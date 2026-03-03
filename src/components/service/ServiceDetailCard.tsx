import Image from "next/image";

export default function ServiceDetailCard(props: {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  icon: string;
}) {
  const { id, title, description, bullets, icon } = props;

  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
    >
      <div className="mb-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-300">
        Service
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/[0.03]">
          <Image src={icon} alt="" width={40} height={40} className="h-10 w-10 object-cover" />
        </div>
        <h3 className="text-2xl font-semibold text-white md:text-3xl">{title}</h3>
      </div>

      <p className="mt-3 max-w-3xl text-white/70">{description}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {bullets.map((bullet) => (
          <div
            key={bullet}
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white/85"
          >
            {bullet}
          </div>
        ))}
      </div>
    </section>
  );
}
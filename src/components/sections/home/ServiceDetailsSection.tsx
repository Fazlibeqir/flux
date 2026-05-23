import ServiceDetailCard from "@/components/service/ServiceDetailCard";
import type { PublicService } from "@/lib/data/site";

export default function ServiceDetailsSection({ services }: { services: PublicService[] }) {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-16 px-6 pt-10 pb-24 sm:pt-12 lg:px-10">
        {services.map((service) => (
          <ServiceDetailCard
            key={service.targetId}
            id={service.targetId}
            title={service.label}
            description={service.description}
            bullets={service.bullets}
            icon={service.icon}
          />
        ))}
      </div>
    </section>
  );
}

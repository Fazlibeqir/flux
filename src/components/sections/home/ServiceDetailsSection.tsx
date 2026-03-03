import { services } from "@/content/home";
import ServiceDetailCard from "@/components/service/ServiceDetailCard";

export default function ServiceDetailsSection() {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-8 pb-24 lg:px-10">
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
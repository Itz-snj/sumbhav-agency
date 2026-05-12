import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, Check } from "lucide-react";

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  projectType: z.string().min(1, "Select a project type"),
  description: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(2000),
});

const PROJECT_TYPES = [
  "Enterprise Web Platform",
  "Tally / TDL Integration",
  "Cross-Platform Mobile",
  "Cloud & DevOps",
  "Other",
];

export function EnquiryForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = enquirySchema.safeParse(raw);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path.join(".")] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setPending(true);
    setTimeout(() => {
      setPending(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <section id="enquiry" className="px-4 md:px-10 py-24 md:py-40 border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-foreground/60">
            ◍ /enquiry
          </div>
          <h2
            className="mt-6 font-black uppercase leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)" }}
          >
            <span className="text-gradient-warm">Direct line.</span>
          </h2>
          <p className="mt-6 max-w-md text-foreground/70">
            No funnels. No SDRs. Your enquiry lands with Neha. Typical reply within one UK
            business day.
          </p>
        </div>

        <div className="md:col-span-8">
          {submitted ? (
            <div className="border border-border rounded-md p-10 bg-card flex flex-col items-start gap-4">
              <div className="h-10 w-10 rounded-full border border-[color:var(--salmon)] flex items-center justify-center text-[color:var(--salmon)]">
                <Check size={18} />
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/60">
                Enquiry received
              </div>
              <div className="text-2xl font-bold uppercase tracking-tight">
                Thanks. We'll be in touch.
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
              <Field label="Name" name="name" error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
              <Field label="Company" name="company" error={errors.company} />
              <SelectField label="Project type" name="projectType" options={PROJECT_TYPES} error={errors.projectType} />
              <div className="md:col-span-2 bg-background p-6">
                <FieldLabel>Description</FieldLabel>
                <textarea
                  name="description"
                  rows={5}
                  maxLength={2000}
                  className="w-full bg-transparent border-0 outline-none resize-none text-foreground placeholder:text-foreground/30 text-base"
                  placeholder="Tell us about scope, timeline, and any constraints…"
                />
                {errors.description && <FieldError>{errors.description}</FieldError>}
              </div>
              <div className="md:col-span-2 bg-background p-6 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                  GDPR · Data stays in EU/UK regions
                </span>
                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] border border-border rounded-full px-6 py-3 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)] transition-colors disabled:opacity-50"
                >
                  {pending ? "Sending…" : "Send Enquiry"} <ArrowUpRight size={16} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/50 mb-3">
      {children}
    </div>
  );
}

function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--salmon)]">
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div className="bg-background p-6">
      <FieldLabel>{label}</FieldLabel>
      <input
        name={name}
        type={type}
        maxLength={255}
        className="w-full bg-transparent border-0 outline-none text-foreground placeholder:text-foreground/30 text-base"
        placeholder="—"
      />
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
}) {
  return (
    <div className="bg-background p-6">
      <FieldLabel>{label}</FieldLabel>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-transparent border-0 outline-none text-foreground text-base appearance-none"
      >
        <option value="" disabled className="bg-background">
          Select…
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="bg-background">
            {o}
          </option>
        ))}
      </select>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}
import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";

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
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

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

    try {
      const formData = new FormData();
      formData.append("access_key", "ec8fcb37-da18-48e4-b702-33e4aa9076a9");
      formData.append("name", parsed.data.name);
      formData.append("email", parsed.data.email);
      formData.append("company", parsed.data.company ?? "");
      formData.append("project_type", parsed.data.projectType);
      formData.append("message", parsed.data.description);
      formData.append("subject", `New Enquiry — ${parsed.data.name} (${parsed.data.projectType})`);
      formData.append("from_name", "SumBhav Enquiry Form");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please email us directly at office.snj.2005@gmail.com");
      }
    } catch {
      setSubmitError("Network error. Please email us directly at office.snj.2005@gmail.com");
    } finally {
      setPending(false);
    }
  };

  return (
    <section id="contact" className="px-4 md:px-10 py-24 md:py-40 border-t border-border">
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
            No funnels. No SDRs. Your enquiry lands directly in the studio inbox.
            Typical reply within one business day.
          </p>
          <div className="mt-6 font-mono text-xs text-foreground/40 space-y-1">
            <div>→ office.snj.2005@gmail.com</div>
            <div>→ Response within 24h</div>
          </div>
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
              <div className="md:col-span-2 bg-background p-6 flex flex-col gap-3">
                {submitError && (
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--salmon)]">
                    {submitError}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                    Sent directly to the studio inbox
                  </span>
                  <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.2em] border border-border rounded-full px-6 py-3 hover:border-[color:var(--salmon)] hover:text-[color:var(--salmon)] transition-colors disabled:opacity-50"
                  >
                    {pending ? "Sending…" : "Send Enquiry"} <ArrowUpRight size={16} />
                  </button>
                </div>
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
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          className="w-full bg-transparent border-0 outline-none text-foreground text-base appearance-none pr-8 cursor-pointer"
        >
          <option value="" disabled className="bg-background text-foreground/50">
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-background text-foreground">
              {o}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
          <ChevronDown size={16} className="text-foreground/50" />
        </div>
      </div>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
}
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactFormValues } from "@/lib/validations/forms";

export function ContactForm() {
  const [status, setStatus] = useState<string | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus(null);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const payload = (await response.json()) as { message?: string; error?: string };
    if (!response.ok) {
      setStatus(payload.error || "Could not send the message.");
      return;
    }
    setStatus(payload.message || "Message submitted.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <div className="bms-contact-name">
        <input placeholder="First Name" {...register("firstName")} />
        <input placeholder="Last Name" {...register("lastName")} />
      </div>
      {errors.firstName ? <p className="mt-2 text-sm text-red-700">{errors.firstName.message}</p> : null}
      {errors.lastName ? <p className="mt-2 text-sm text-red-700">{errors.lastName.message}</p> : null}
      <label className="mt-6">Email</label>
      <input placeholder="Your Email" type="email" {...register("email")} />
      {errors.email ? <p className="mt-2 text-sm text-red-700">{errors.email.message}</p> : null}
      <label className="mt-6">Message</label>
      <textarea placeholder="Your Message" {...register("message")} />
      {errors.message ? <p className="mt-2 text-sm text-red-700">{errors.message.message}</p> : null}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Submitting..." : "Submit"}
        <ArrowRight aria-hidden="true" size={20} strokeWidth={2.5} />
      </button>
      {status ? <p className="mt-4 rounded-xl bg-brand-pale p-4 font-semibold text-brand-dark">{status}</p> : null}
    </form>
  );
}

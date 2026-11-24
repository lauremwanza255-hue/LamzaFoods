'use client';

import Link from 'next/link';

type Common = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

/** Stable id derived from the field name, so the error summary can link to each field. */
export const fieldId = (name: string) => `field-${name.replace(/[^a-zA-Z0-9_-]/g, '-')}`;

function describedBy(id: string, hint?: string, error?: string) {
  return [hint ? `${id}-hint` : '', error ? `${id}-error` : ''].filter(Boolean).join(' ') || undefined;
}

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {label}
      {required ? (
        <span className="text-[#b42318]" aria-hidden="true">
          {' '}
          *
        </span>
      ) : (
        <span className="font-normal text-ink-2"> (optional)</span>
      )}
    </label>
  );
}

function Messages({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  return (
    <>
      {hint && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </>
  );
}

export function TextField({
  type = 'text',
  autoComplete,
  value,
  onChange,
  inputMode,
  ...p
}: Common & {
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  const id = fieldId(p.name);
  return (
    <div className={p.className}>
      <Label htmlFor={id} label={p.label} required={p.required} />
      <input
        id={id}
        name={p.name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        required={p.required}
        aria-required={p.required}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(id, p.hint, p.error)}
        className="field-control"
      />
      <Messages id={id} hint={p.hint} error={p.error} />
    </div>
  );
}

export function SelectField({
  options,
  value,
  onChange,
  placeholder = 'Choose an option',
  ...p
}: Common & { options: readonly string[]; value: string; onChange: (v: string) => void; placeholder?: string }) {
  const id = fieldId(p.name);
  return (
    <div className={p.className}>
      <Label htmlFor={id} label={p.label} required={p.required} />
      <select
        id={id}
        name={p.name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={p.required}
        aria-required={p.required}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(id, p.hint, p.error)}
        className="field-control"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Messages id={id} hint={p.hint} error={p.error} />
    </div>
  );
}

export function TextareaField({
  value,
  onChange,
  rows = 5,
  ...p
}: Common & { value: string; onChange: (v: string) => void; rows?: number }) {
  const id = fieldId(p.name);
  return (
    <div className={p.className}>
      <Label htmlFor={id} label={p.label} required={p.required} />
      <textarea
        id={id}
        name={p.name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={p.required}
        aria-required={p.required}
        aria-invalid={p.error ? true : undefined}
        aria-describedby={describedBy(id, p.hint, p.error)}
        className="field-control"
      />
      <Messages id={id} hint={p.hint} error={p.error} />
    </div>
  );
}

export function CheckboxGroup({
  options,
  value,
  onChange,
  ...p
}: Common & { options: readonly string[]; value: string[]; onChange: (v: string[]) => void }) {
  const id = fieldId(p.name);
  return (
    <fieldset
      className={p.className}
      aria-invalid={p.error ? true : undefined}
      aria-describedby={describedBy(id, p.hint, p.error)}
      id={id}
      tabIndex={-1}
      data-field={p.name}
    >
      <legend className="field-label">
        {p.label}
        {p.required && (
          <span className="text-[#b42318]" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>
      <Messages id={id} hint={p.hint} />
      <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((o) => {
          const checked = value.includes(o);
          return (
            <label
              key={o}
              className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-sm border px-3 py-2 text-[15px] transition-colors ${
                checked ? 'border-green bg-[#eef6ef]' : 'border-line-strong hover:border-[#b9bcc6]'
              }`}
            >
              <input
                type="checkbox"
                name={p.name}
                value={o}
                checked={checked}
                onChange={(e) => onChange(e.target.checked ? [...value, o] : value.filter((v) => v !== o))}
                className="size-[18px] shrink-0 accent-[var(--brand-green)]"
              />
              {o}
            </label>
          );
        })}
      </div>
      {p.error && (
        <p id={`${id}-error`} className="field-error">
          {p.error}
        </p>
      )}
    </fieldset>
  );
}

export function ConsentCheckbox({ checked, onChange, error }: { checked: boolean; onChange: (v: boolean) => void; error?: string }) {
  const id = fieldId('consent');
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[15px] leading-[1.5] text-navy">
        <input
          id={id}
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          aria-required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-[18px] shrink-0 accent-[var(--brand-green)]"
        />
        <span>
          I agree that Lamza Foods may use these details to reply to my inquiry, as described in the{' '}
          <Link href="/privacy-policy" className="prose-link" target="_blank">
            privacy policy
          </Link>
          .<span className="text-[#b42318]" aria-hidden="true"> *</span>
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

/** Honeypot: visually hidden and skipped by keyboard and assistive tech. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Company website
        <input
          type="text"
          name="company_website"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

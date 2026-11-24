'use client';

import { useEffect, useRef, useState } from 'react';
import type { z } from 'zod';
import { fieldErrors } from '@/lib/inquiry/schema';

export type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; reference: string }
  | { status: 'error'; message: string };

/**
 * Shared submit logic: client validation with the server's schema, one request at a
 * time, and success only when the API confirms receipt with a reference.
 */
export function useInquiry<S extends z.ZodTypeAny>(schema: S) {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState(0);
  /** The error summary appears only after a failed submit, never for on-blur checks. */
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => setStartedAt(Date.now()), []);

  useEffect(() => {
    if (state.status === 'success' || state.status === 'error') resultRef.current?.focus();
  }, [state]);

  async function submit(values: Record<string, unknown>) {
    if (state.status === 'submitting') return;
    setSubmitAttempted(true);
    const payload = { ...values, startedAt };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setState({ status: 'idle' });
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setErrors({});
    setState({ status: 'submitting' });
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        reference?: string;
        message?: string;
        fields?: Record<string, string>;
      };
      if (res.ok && data.ok && data.reference) {
        setState({ status: 'success', reference: data.reference });
        return;
      }
      if (data.fields) {
        setErrors(data.fields);
        setState({ status: 'idle' });
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      setState({ status: 'error', message: data.message || 'We could not send your inquiry. Please try again.' });
    } catch {
      setState({
        status: 'error',
        message: 'We could not reach the server. Check your internet connection and try again.',
      });
    }
  }

  /**
   * Validate one field when the user leaves it. Empty fields are only re-checked if they
   * already show an error, so tabbing through an untouched form does not raise errors.
   */
  function validateField(key: string, values: Record<string, unknown>) {
    const raw = key.split('.').reduce<unknown>((o, k) => (o == null ? o : (o as Record<string, unknown>)[k]), values);
    const empty = raw === undefined || raw === '' || raw === false || (Array.isArray(raw) && raw.length === 0);
    if (empty && !errors[key]) return;
    const parsed = schema.safeParse({ ...values, startedAt });
    const message = parsed.success ? undefined : fieldErrors(parsed.error)[key];
    setErrors((e) => {
      if (message === e[key]) return e;
      const n = { ...e };
      if (message) n[key] = message;
      else delete n[key];
      return n;
    });
  }

  const clearError = (key: string) =>
    setErrors((e) => {
      if (!e[key]) return e;
      const n = { ...e };
      delete n[key];
      return n;
    });

  const showSummary = submitAttempted && Object.keys(errors).length > 0;
  return { state, setState, errors, showSummary, clearError, validateField, submit, summaryRef, resultRef };
}

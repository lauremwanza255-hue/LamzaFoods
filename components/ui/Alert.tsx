import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

const styles = {
  success: { box: 'border-green/40 bg-[#eef6ef] text-navy', Icon: CheckCircle2, icon: 'text-green' },
  error: { box: 'border-[#b42318]/40 bg-[#fdf1f0] text-navy', Icon: AlertCircle, icon: 'text-[#b42318]' },
  info: { box: 'border-line-strong bg-gray-soft/60 text-navy', Icon: Info, icon: 'text-navy' },
} as const;

export function Alert({
  tone,
  title,
  children,
  id,
}: {
  tone: keyof typeof styles;
  title: string;
  children?: React.ReactNode;
  id?: string;
}) {
  const s = styles[tone];
  return (
    <div id={id} className={`flex gap-3 rounded-md border p-4 ${s.box}`} role={tone === 'error' ? 'alert' : 'status'}>
      <s.Icon aria-hidden="true" className={`mt-0.5 size-5 shrink-0 ${s.icon}`} />
      <div className="text-[15px] leading-[1.55]">
        <p className="font-semibold">{title}</p>
        {children && <div className="mt-1">{children}</div>}
      </div>
    </div>
  );
}

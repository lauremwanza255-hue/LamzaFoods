import {
  Award,
  BadgeCheck,
  Boxes,
  Briefcase,
  ClipboardCheck,
  Factory,
  FileText,
  Globe,
  HandHeart,
  Handshake,
  Leaf,
  Microscope,
  Package,
  PackageCheck,
  ShieldCheck,
  Ship,
  Sprout,
  Store,
  Tractor,
  Truck,
  Users,
  Warehouse,
  Wheat,
  type LucideProps,
} from 'lucide-react';
import type { IconName } from '@/types/content';

const map = {
  sprout: Sprout,
  leaf: Leaf,
  'shield-check': ShieldCheck,
  globe: Globe,
  truck: Truck,
  handshake: Handshake,
  'hand-heart': HandHeart,
  'badge-check': BadgeCheck,
  package: Package,
  users: Users,
  award: Award,
  wheat: Wheat,
  'clipboard-check': ClipboardCheck,
  microscope: Microscope,
  factory: Factory,
  'package-check': PackageCheck,
  warehouse: Warehouse,
  ship: Ship,
  store: Store,
  tractor: Tractor,
  boxes: Boxes,
  briefcase: Briefcase,
  'file-text': FileText,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" focusable="false" strokeWidth={1.4} {...props} />;
}

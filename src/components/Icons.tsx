import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size = 18, sw = 2): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
});

export const ArrowRight = ({ size, ...p }: P) => <svg {...base(size)} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const ArrowLeft = ({ size, ...p }: P) => <svg {...base(size)} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>;
export const ArrowDown = ({ size, ...p }: P) => <svg {...base(size)} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>;
export const ExternalArrow = ({ size = 14, ...p }: P) => <svg {...base(size, 2.2)} {...p}><path d="M7 17L17 7M8 7h9v9" /></svg>;
export const Chevron = ({ size = 20, ...p }: P) => <svg {...base(size)} {...p}><path d="M6 9l6 6 6-6" /></svg>;
export const Check = ({ size = 20, ...p }: P) => <svg {...base(size, 2.5)} {...p}><path d="M5 12l5 5L20 7" /></svg>;
export const CalendarIcon = ({ size = 16, ...p }: P) => <svg {...base(size)} {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>;
export const ClockIcon = ({ size = 16, ...p }: P) => <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const PinIcon = ({ size = 16, ...p }: P) => <svg {...base(size)} {...p}><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>;
export const LinkedInIcon = ({ size = 18, ...p }: P) => <svg {...base(size)} {...p}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;
export const InstagramIcon = ({ size = 18, ...p }: P) => <svg {...base(size)} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" /></svg>;
export const PhoneIcon = ({ size = 18, ...p }: P) => <svg {...base(size)} {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>;
export const MailIcon = ({ size = 18, ...p }: P) => <svg {...base(size)} {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>;
export const CloseIcon = ({ size = 20, ...p }: P) => <svg {...base(size, 2.2)} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>;
export const MenuIcon = ({ size = 22, ...p }: P) => <svg {...base(size, 2.2)} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const PresentationIcon = ({ size = 30, ...p }: P) => <svg {...base(size)} {...p}><rect x="3" y="4" width="18" height="12" rx="1.5" /><path d="M12 16v3M8 21l4-2 4 2" /></svg>;
export const VideoIcon = ({ size = 12, ...p }: P) => <svg {...base(size, 2.4)} {...p}><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3" /></svg>;

export const QuoteMark = ({ size = 36 }: { size?: number }) => (
  <svg aria-hidden="true" width={size} height={(size * 28) / 36} viewBox="0 0 36 28" fill="#F26A1B">
    <path d="M0 28V16C0 7 5 1 14 0v6c-4 1-6 4-6 8h6v14zm20 0V16c0-9 5-15 14-16v6c-4 1-6 4-6 8h6v14z" />
  </svg>
);

/* Nest icons (48 grid) */
const nestBase = { width: 36, height: 36, viewBox: "0 0 48 48", fill: "none", stroke: "#111827", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
export const NestIcon = () => <svg {...nestBase}><path d="M6 30c8 10 28 10 36 0" /><path d="M10 26c6 6 22 6 28 0" /><path d="M8 34l10-6M40 34l-10-6M16 38l16-8" /></svg>;
export const EggIcon = () => <svg {...nestBase}><path d="M12 26c0-10 5-20 12-20s12 10 12 20c0 8-5 14-12 14s-12-6-12-14z" /><path d="M13 24l6 4 5-5 5 5 6-4" /></svg>;
export const WingIcon = () => <svg {...nestBase}><path d="M6 30c8-14 22-20 36-18-6 4-9 8-10 13 4-1 7 0 9 2-8 2-13 6-17 11-6-6-12-8-18-8z" /></svg>;
export const UsersIcon = ({ size = 16, ...p }: P) => <svg {...base(size)} {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.2.7 3.5 2.8 3.5 5.7" /></svg>;

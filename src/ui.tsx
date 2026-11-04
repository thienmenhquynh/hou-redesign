import {
  useEffect,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react"
import { Link, type LinkProps } from "react-router"

export const container = "mx-auto max-w-hou px-4 sm:px-8"
export function Heading({
  children,
  level = 2,
  className = "",
}: {
  children: ReactNode
  level?: 1 | 2 | 3
  className?: string
}) {
  const Element = `h${level}` as "h1" | "h2" | "h3"
  return (
    <Element
      className={`${
        level === 1 ? "inner-title" : level === 2 ? "section-title" : "text-xl"
      } font-bold ${className}`}
    >
      {children}
    </Element>
  )
}
export function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
export function ExternalIcon() {
  return (
    <svg className="external-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 6h10v10M18 6 6 18" />
    </svg>
  )
}
export function UpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 10 6-6 6 6M12 4v16" />
    </svg>
  )
}
export function TextLink({
  children,
  className = "",
  light = false,
  ...props
}: LinkProps & { light?: boolean }) {
  return (
    <Link
      {...props}
      className={`inline-flex min-h-11 items-center gap-2 text-sm font-semibold ${
        light
          ? "text-on-primary-muted hover:text-on-primary"
          : "text-primary hover:text-primary-hover"
      } ${className}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  )
}
export function ActionLink({
  children,
  className = "",
  tone = "primary",
  ...props
}: LinkProps & { tone?: "primary" | "accent" | "ghost" }) {
  const colors = {
    primary: "bg-primary text-on-primary",
    accent: "bg-accent text-on-accent",
    ghost: "border border-on-primary-muted bg-transparent text-on-primary",
  }
  return (
    <Link
      {...props}
      className={`btn inline-flex min-h-11 items-center justify-center gap-3 rounded-full px-6 py-3 font-semibold hover:brightness-110 ${colors[tone]} ${className}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  )
}
export function Button({
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-control-border px-5 py-2 text-sm font-semibold enabled:hover:border-primary enabled:hover:text-primary disabled:cursor-not-allowed disabled:border-hairline disabled:bg-disabled-bg disabled:text-disabled-text ${className}`}
    >
      {children}
    </button>
  )
}
export function Field(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`min-h-11 w-full rounded-full border border-control-border bg-surface px-5 py-3 text-sm ${props.className || ""}`}
    />
  )
}
export function SelectField({
  label,
  options,
  value,
  onChange,
  emptyLabel = "Tất cả",
}: {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  emptyLabel?: string
}) {
  return (
    <label className="grid gap-2 text-xs font-semibold text-ink-muted">
      {label}
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-11 w-full rounded-full border border-control-border bg-surface px-4 py-3 text-sm font-normal text-ink"
      >
        <option value="">{emptyLabel}</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-tint-primary px-3 py-1 text-xs font-semibold text-primary">
      {children}
    </span>
  )
}
export function Notice({
  children = "Bản giao diện minh họa. Ngành học, văn bản và thông tin tuyển sinh cần được đối chiếu với công bố chính thức của nhà trường.",
}: {
  children?: ReactNode
}) {
  return (
    <p className="demo-notice border-l-2 border-primary bg-tint-primary px-5 py-4 text-sm text-primary">
      {children}
    </p>
  )
}
export function PageHero({
  title,
  description,
  section,
  parent,
}: {
  title: string
  description?: string
  section?: string
  parent?: {
    title: string
    to: string
  }
}) {
  useEffect(() => {
    document.title = `${title} | Đại học Mở Hà Nội`
  }, [title])
  return (
    <section className="sub-hero dark">
      <img src="/images/lecture-hall.jpg" alt="" className="sub-hero-photo" />
      <div className="sub-hero-overlay" />
      <div className={`${container} sub-hero-inner`}>
        <nav aria-label="Đường dẫn" className="sub-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span aria-hidden="true">/</span>
          {parent && (<><Link to={parent.to}>{parent.title}</Link><span aria-hidden="true">/</span></>)}
          <span aria-current="page">{title}</span>
        </nav>
        <p className="ref-hero-badge"><span />{section || "Hanoi Open University"}</p>
        <Heading level={1} className="sub-hero-title">{title}</Heading>
        {description && <p className="sub-hero-lead">{description}</p>}
      </div>
    </section>
  )
}
export function Card({
  title,
  description,
  to,
  number,
}: {
  title: string
  description: string
  to: string
  number?: string
}) {
  return (
    <Link
      to={to}
      className="content-card sub-card group flex h-full flex-col"
    >
      {number && (
        <span className="mb-6 text-xs font-semibold tracking-widest text-primary">
          {number}
        </span>
      )}
      <Heading level={3}>{title}</Heading>
      <p className="mb-6 mt-3 text-sm text-ink-muted">{description}</p>
      <span className="sub-card-link">
        Khám phá
        <ArrowIcon />
      </span>
    </Link>
  )
}
export function Empty({
  title = "Chưa tìm thấy kết quả phù hợp.",
  children,
}: {
  title?: string
  children?: ReactNode
}) {
  return (
    <div className="rounded-2xl border border-dashed border-control-border bg-surface p-10 text-center">
      <Heading level={3}>{title}</Heading>
      <div className="mt-4 text-sm text-ink-muted">
        {children || "Thử thay đổi từ khóa hoặc xóa bớt bộ lọc."}
      </div>
    </div>
  )
}
export function InfoTable({ rows }: { rows: [string, ReactNode][] }) {
  return (
    <dl className="divide-y divide-hairline">
      {rows.map(([title, value]) => (
        <div key={title} className="grid gap-2 py-4 sm:grid-cols-3">
          <dt className="text-sm text-ink-muted">{title}</dt>
          <dd className="font-medium sm:col-span-2">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

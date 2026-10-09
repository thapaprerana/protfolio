"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent, ReactNode } from "react";

const skillGroups = [
  {
    title: "Frontend",
    note: "Interfaces that are fast, responsive and easy to use.",
    items: ["JavaSwing","Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    note: "APIs, authentication and business logic.",
    items: ["NestJS"],
  },
  {
    title: "Data & tools",
    note: "Storing data reliably and working cleanly with a team.",
    items: ["PostgreSQL", "Prisma", "Git","Xampp"],
  },
];

const projects = [
  {
    title: "Tackled Task",
    summary: "Desktop based Application",
    description:
      "A Centralized platform to manage a person task.",
    features: [
      "Manage task.",
      "Track the task.",
    ],
    image: "/images/tackled.png",
    tech: ["Java", "JavaSwing", "JDBC", "Xampp"],
    github: "https://github.com/thapaprerana/Tackled-task",
  },
  {
    title: "Student Information System",
    summary: "Academic and enrollment records, searchable",
    description:
      "A web-based system for managing student academic and enrollment information. It replaces scattered records with one place where staff can store, search and look up student details quickly.",
    features: [
      "Central records for academic and enrollment data",
      "Fast search across students",
      "Typed, structured data model backed by PostgreSQL",
      "Clean, form-driven interface for staff",
    ],
    image: "/images/student-system.png",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    github: "https://github.com/thapaprerana/abc-project",
  },
  {
    title: "Student Information List",
    summary: "Student Basic Information",
    description:
      "A web-based platform where we can see the student data.",
    features: [
      "See information on student of different faculties",
    ],
    image: "/images/student-info.png",
    tech: ["Next.js", "TypeScript"],
    github: "https://github.com/thapaprerana/student-information-project",
  },
  {
    title: "NestJS Authentication",
    summary: "Full-stack registration and login",
    description:
      "A full-stack authentication application with user registration and login. A NestJS API handles the logic, Prisma manages the PostgreSQL database, and a React frontend gives users the sign-up and sign-in flow.",
    features: [
      "User registration and login",
      "NestJS REST API with a clear module structure",
      "Prisma schema and migrations on PostgreSQL",
      "React frontend connected to the API",
    ],
    image: "/images/authentication.png",
    tech: ["React", "NestJS", "Prisma", "PostgreSQL"],
    github: "https://github.com/thapaprerana/nest-login",
  },
];

const navItems = [
  ["About", "about"],
  ["Skills", "skills"],
  ["Projects", "projects"],
  ["Contact", "contact"],
];

const roles = ["Full-stack developer", "Next.js builder", "Always learning"];

const totalSkills = skillGroups.reduce((sum, g) => sum + g.items.length, 0);

/* ---------- Small animation helpers ---------- */

// Observes an outer wrapper that never moves, and animates an inner element.
// It toggles both ways, so the animation replays when you scroll back up.
function Reveal({
  children,
  className = "",
  innerClassName = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      <div
        style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
        className={`reveal reveal-${direction} h-full ${
          visible ? "is-visible" : ""
        } ${innerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);

        if (!entry.isIntersecting) {
          setValue(reduce ? to : 0);
          return;
        }

        if (reduce) {
          setValue(to);
          return;
        }

        const start = performance.now();
        const duration = 1200;

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return <span ref={ref}>{value}</span>;
}

// Profile photo: floats on its own, and tilts / shifts in layers with the pointer
function TiltPhoto() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
    setActive(true);
  };

  const handleLeave = () => {
    setPos({ x: 0, y: 0 });
    setActive(false);
  };

  const ease = active
    ? "transform 0.15s ease-out"
    : "transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1)";

  return (
    <div
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
      className="relative p-8"
    >
      <div className="animate-photo-float relative">
        {/* Decorative ring, moves further than the photo */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-8"
          style={{
            transform: `translate3d(${pos.x * 34}px, ${pos.y * 34}px, 0)`,
            transition: ease,
          }}
        >
          <div className="animate-spin-slow h-24 w-24 rounded-full border-2 border-dashed border-plum/30" />
        </div>

        {/* Small dot, moves the opposite way */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-6 top-10"
          style={{
            transform: `translate3d(${pos.x * -26}px, ${pos.y * -26}px, 0)`,
            transition: ease,
          }}
        >
          <div className="h-9 w-9 rounded-full bg-brand/25" />
        </div>

        {/* Photo */}
        <div
          className="rounded-[2rem] bg-gradient-to-br from-brand/70 to-plum/60 p-1.5 shadow-xl shadow-brand/15"
          style={{
            transform: `perspective(900px) rotateX(${-pos.y * 14}deg) rotateY(${
              pos.x * 14
            }deg) scale(${active ? 1.03 : 1})`,
            transition: ease,
          }}
        >
          <div className="rounded-[1.7rem] bg-white p-2">
            <div className="overflow-hidden rounded-[1.4rem]">
              <Image
                src="/images/profile.jpg"
                alt="Prerana Thapa"
                width={420}
                height={420}
                priority
                className="h-64 w-64 object-cover sm:h-80 sm:w-80"
                style={{
                  transform: `scale(1.08) translate3d(${pos.x * -12}px, ${
                    pos.y * -12
                  }px, 0)`,
                  transition: ease,
                }}
              />
            </div>
          </div>
        </div>

        {/* Learning card, floats in front of the photo */}
        <div
          className="absolute -bottom-5 -left-4"
          style={{
            transform: `translate3d(${pos.x * -20}px, ${pos.y * -20}px, 0)`,
            transition: ease,
          }}
        >
          <div className="animate-bob rounded-2xl border border-brand/10 bg-white px-5 py-3.5 shadow-lg shadow-brand/10">
            <p className="text-xs text-muted">Currently learning</p>
            <p className="text-sm font-bold text-ink">Next.js + NestJS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [heroIn, setHeroIn] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  const closeMenu = () => setMenuOpen(false);

  // Scroll progress, navbar shadow, back-to-top visibility
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 10);
      setShowTop(y > 120);
      setProgress(max > 0 ? y / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    navItems.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Replay the hero entrance whenever you scroll back up to it
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroIn(entry.isIntersecting),
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rotate the role text in the hero
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      2800,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-paper text-muted">
      {/* SCROLL PROGRESS */}
      <div
        aria-hidden
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-brand"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 z-50 w-full border-b border-brand/10 bg-paper/85 backdrop-blur-lg transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-brand/5" : ""
        }`}
      >
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          <a
            href="#"
            onClick={closeMenu}
            className="text-lg font-bold tracking-tight text-ink"
          >
            Prerana<span className="text-brand">.</span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map(([name, id]) => (
              <a
                key={name}
                href={`#${id}`}
                className={`relative text-sm font-medium transition-colors hover:text-brand after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-brand after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  active === id
                    ? "text-brand after:scale-x-100"
                    : "text-muted after:scale-x-0"
                }`}
              >
                {name}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-lg hover:shadow-brand/25 active:translate-y-0 active:scale-95"
            >
              Get in touch
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-xl border border-brand/15 bg-brand-soft p-2.5 text-brand transition active:scale-90 md:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-current transition ${
                  menuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-current transition ${
                  menuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`overflow-hidden border-t border-brand/10 bg-paper transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col px-6 py-4">
            {navItems.map(([name, id], i) => (
              <a
                key={name}
                href={`#${id}`}
                onClick={closeMenu}
                style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                className={`border-b border-brand/10 py-4 font-medium transition duration-300 hover:pl-2 hover:text-brand ${
                  menuOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                } ${active === id ? "text-brand" : "text-ink"}`}
              >
                {name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-4 rounded-full bg-brand px-5 py-3 text-center font-semibold text-white transition active:scale-95"
            >
              Get in touch
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        ref={heroRef}
        data-hero={heroIn ? "in" : "out"}
        className="relative flex min-h-screen items-center px-6 pt-20"
      >
        <div className="animate-drift pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full bg-brand-soft blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p
              className="animate-fade-up inline-flex items-center gap-2.5 rounded-full border border-brand/20 bg-white px-4 py-2 text-sm font-medium text-brand-deep"
              style={{ animationDelay: "0ms" }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              Open to internships and collaborations
            </p>

            <h1
              className="animate-fade-up mt-7 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "120ms" }}
            >
              Hi, I&apos;m Prerana Thapa.
            </h1>

            <h2
              className="animate-fade-up mt-4 h-8 overflow-hidden text-xl font-semibold text-plum sm:h-9 sm:text-2xl"
              style={{ animationDelay: "240ms" }}
            >
              <span key={roleIndex} className="animate-swap block">
                {roles[roleIndex]}
              </span>
            </h2>

            <p
              className="animate-fade-up mt-6 max-w-xl text-base leading-8 sm:text-lg"
              style={{ animationDelay: "360ms" }}
            >
              I build modern web applications with Next.js, NestJS and
              PostgreSQL, and I like turning everyday problems into software
              people can actually use.
            </p>

            <div
              className="animate-fade-up mt-9 flex flex-wrap gap-4"
              style={{ animationDelay: "480ms" }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-brand-deep hover:shadow-lg hover:shadow-brand/25 active:translate-y-0 active:scale-95"
              >
                View my projects
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
              <a
                href="#contact"
                className="rounded-full border border-ink/15 bg-white px-7 py-3.5 font-semibold text-ink transition duration-200 hover:-translate-y-1 hover:border-brand hover:text-brand active:translate-y-0 active:scale-95"
              >
                Contact me
              </a>
            </div>
          </div>

          <div
            className="animate-fade-up flex justify-center md:justify-end"
            style={{ animationDelay: "300ms" }}
          >
            <TiltPhoto />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-16 border-t border-brand/10 bg-white px-6 py-24"
      >
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal direction="left">
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              A developer who loves learning
            </h2>
          </Reveal>

          <Reveal delay={150} innerClassName="space-y-5 leading-8">
            <p>
              I&apos;m an ICT student and aspiring full-stack developer. I like
              building practical software that solves real problems, from
              local service marketplaces to record-keeping systems.
            </p>
            <p>
              Right now I&apos;m focused on getting better at modern frontend
              frameworks, backend development, databases and AI-powered
              applications, and on writing code that is clean and easy to
              maintain.
            </p>

            <dl className="grid grid-cols-3 gap-4 pt-4">
              <div className="rounded-2xl border border-brand/10 bg-paper p-4 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md hover:shadow-brand/10">
                <dt className="text-xl font-bold text-ink sm:text-2xl">
                  <CountUp to={projects.length} />
                </dt>
                <dd className="mt-1 text-xs sm:text-sm">Projects built</dd>
              </div>
              <div className="rounded-2xl border border-brand/10 bg-paper p-4 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md hover:shadow-brand/10">
                <dt className="text-xl font-bold text-ink sm:text-2xl">
                  <CountUp to={totalSkills} />
                </dt>
                <dd className="mt-1 text-xs sm:text-sm">Technologies</dd>
              </div>
              <div className="rounded-2xl border border-brand/10 bg-paper p-4 transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-md hover:shadow-brand/10">
                <dt className="text-xl font-bold text-ink sm:text-2xl">
                  Full-stack
                </dt>
                <dd className="mt-1 text-xs sm:text-sm">Frontend to database</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="scroll-mt-16 bg-paper px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Technologies I work with
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {skillGroups.map((group, groupIndex) => (
              <Reveal key={group.title} delay={groupIndex * 120}>
                <div className="h-full rounded-3xl border border-brand/10 bg-white p-7 transition duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/10">
                  <h3 className="text-lg font-bold text-ink">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6">{group.note}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item, i) => (
                      <span
                        key={item}
                        style={{ "--i": i } as CSSProperties}
                        className="stagger-item cursor-default rounded-full bg-brand-soft px-3.5 py-1.5 text-sm font-medium text-brand-deep transition duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="scroll-mt-16 border-t border-brand/10 bg-white px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Things I&apos;ve built
            </h2>
          </Reveal>

          <div className="mt-14 space-y-20">
            {projects.map((project, index) => {
              const flip = index % 2 === 1;

              return (
                <article
                  key={project.title}
                  className="grid items-center gap-10 md:grid-cols-2"
                >
                  <Reveal
                    direction={flip ? "right" : "left"}
                    className={flip ? "md:order-2" : ""}
                  >
                    <div className="group relative aspect-video overflow-hidden rounded-3xl border border-brand/10 bg-brand-soft shadow-lg shadow-brand/10 transition duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/20">
                      <Image
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                    </div>
                  </Reveal>

                  <Reveal direction={flip ? "left" : "right"} delay={150}>
                    <div>
                      <p className="text-sm font-semibold text-brand-deep">
                        {project.summary}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 leading-7">{project.description}</p>

                      <ul className="mt-5 space-y-2.5">
                        {project.features.map((feature, i) => (
                          <li
                            key={feature}
                            style={{ "--i": i } as CSSProperties}
                            className="stagger-item flex gap-3 text-sm leading-6"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tech.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-plum/10 px-3 py-1 text-xs font-semibold text-plum transition duration-200 hover:bg-plum hover:text-white"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-7 inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold text-ink transition duration-200 hover:border-brand hover:bg-brand hover:text-white active:scale-95"
                      >
                        View on GitHub
                        <span
                          aria-hidden
                          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        >
                          ↗
                        </span>
                      </a>
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="scroll-mt-16 bg-brand-soft/60 px-6 py-24"
      >
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Let&apos;s build something useful.
          </h2>
          <p className="mx-auto mt-6 max-w-xl leading-8">
            Have an idea, project or opportunity in mind? Send me a message and
            I&apos;ll get back to you.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=preranathapa14@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
              className="rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition duration-200 hover:-translate-y-1 hover:bg-brand-deep hover:shadow-lg hover:shadow-brand/25 active:translate-y-0 active:scale-95"
            >
              Email me
            </a>
            
            <a
              href="https://github.com/thapaprerana"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 bg-white px-7 py-3.5 font-semibold text-ink transition duration-200 hover:-translate-y-1 hover:border-brand hover:text-brand active:translate-y-0 active:scale-95"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/prerana-thapa-054491301/?isSelfProfile=true"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-ink/15 bg-white px-7 py-3.5 font-semibold text-ink transition duration-200 hover:-translate-y-1 hover:border-brand hover:text-brand active:translate-y-0 active:scale-95"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-brand/10 bg-white px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm sm:flex-row">
          <p>© {new Date().getFullYear()} Prerana Thapa</p>
          <p>
            Built with <span className="text-brand">♥</span> and Next.js
          </p>
        </div>
      </footer>

      {/* BACK TO TOP */}
      <button
        type="button"
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          })
        }
        className={`group fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/30 transition duration-300 hover:-translate-y-1 hover:bg-brand-deep active:scale-90 ${
          showTop
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-6 scale-75 opacity-0"
        }`}
      >
        <svg
          aria-hidden
          viewBox="0 0 48 48"
          className="absolute inset-0 -rotate-90"
        >
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          <circle
            cx="24"
            cy="24"
            r="21"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={132}
            strokeDashoffset={132 * (1 - progress)}
          />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </main>
  );
}
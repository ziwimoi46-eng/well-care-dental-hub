import { useEffect, useRef, useState } from "react";
import "./index.css";

// ===================== UTILITY HOOKS =====================
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

// ===================== NAVBAR =====================
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#why-us", label: "Why Us" },
    { href: "#gallery", label: "Gallery" },
    { href: "#reviews", label: "Reviews" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#hero" style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span className="font-display" style={{ fontSize: "20px", fontWeight: 600, color: "var(--charcoal)", letterSpacing: "0.02em" }}>Welcare</span>
          <span style={{ fontSize: "10px", fontWeight: 500, letterSpacing: "0.22em", color: "var(--gold-dark)", textTransform: "uppercase" }}>Dental Hub</span>
        </a>

        {/* Desktop Links */}
        <div className="hide-mobile" style={{ display: "flex", gap: "36px", alignItems: "center" }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                textDecoration: "none",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--warm-dark)",
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--warm-dark)")}
            >
              {l.label}
            </a>
          ))}
          <a href="#booking" className="btn-gold" style={{ padding: "10px 24px", fontSize: "13px" }}>
            Book Now
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="hide-desktop hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="hide-desktop" style={{
          background: "rgba(253,250,246,0.98)",
          backdropFilter: "blur(20px)",
          padding: "20px 28px 28px",
          borderTop: "1px solid var(--beige-mid)",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ textDecoration: "none", fontSize: "15px", fontWeight: 500, color: "var(--warm-dark)", padding: "8px 0", borderBottom: "1px solid var(--beige-mid)" }}
            >
              {l.label}
            </a>
          ))}
          <a href="#booking" className="btn-gold" style={{ textAlign: "center", marginTop: "8px" }} onClick={() => setMenuOpen(false)}>
            Book Appointment
          </a>
        </div>
      )}
    </nav>
  );
}

// ===================== HERO =====================
function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, var(--ivory) 0%, var(--ivory-deep) 40%, var(--beige) 70%, var(--beige-mid) 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "100px",
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: "10%", right: "-5%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "5%", left: "-8%", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "5%", width: "1px", height: "200px", background: "linear-gradient(to bottom, transparent, var(--beige-deep), transparent)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}
        className="hero-grid">
        {/* Text */}
        <div style={{ animationDelay: "0.1s" }} className="animate-fadeInUp">
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
            <span className="gold-line" />
            <span className="section-label">Chhatrapati Sambhajinagar, Maharashtra</span>
          </div>
          <h1 className="font-display" style={{
            fontSize: "clamp(42px, 5vw, 68px)",
            fontWeight: 600,
            lineHeight: 1.08,
            color: "var(--charcoal)",
            marginBottom: "24px",
            letterSpacing: "-0.01em"
          }}>
            Premium Dental Care<br />
            <span style={{ color: "var(--gold-dark)", fontStyle: "italic" }}>with a Personal Touch</span>
          </h1>
          <p style={{ fontSize: "16px", lineHeight: 1.75, color: "var(--brown-mid)", maxWidth: "460px", marginBottom: "40px", fontWeight: 300 }}>
            Experience world-class dental care in an environment designed for your comfort. At Welcare Dental Hub, every smile is crafted with precision, warmth, and artistry.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#booking" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              Book Appointment
            </a>
            <a href="https://wa.me/918103161214" target="_blank" rel="noopener noreferrer" className="btn-gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              WhatsApp Now
            </a>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: "40px", marginTop: "52px", paddingTop: "40px", borderTop: "1px solid var(--beige-mid)" }}>
            {[
              { number: "10+", label: "Years Experience" },
              { number: "5000+", label: "Happy Patients" },
              { number: "8", label: "Specializations" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display" style={{ fontSize: "32px", fontWeight: 600, color: "var(--charcoal)", lineHeight: 1 }}>{stat.number}</div>
                <div style={{ fontSize: "12px", color: "var(--brown-mid)", marginTop: "4px", fontWeight: 400, letterSpacing: "0.04em" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div style={{ position: "relative", animationDelay: "0.3s" }} className="animate-fadeIn hide-mobile">
          <div style={{
            width: "100%",
            aspectRatio: "4/5",
            borderRadius: "24px 80px 24px 80px",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(60,40,20,0.18)",
            position: "relative"
          }}>
            <img src="/dental-procedure.jpg" alt="Premium Dental Care" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(44,37,32,0.2) 0%, transparent 50%)" }} />
          </div>
          {/* Floating badge */}
          <div className="animate-float" style={{
            position: "absolute",
            bottom: "32px",
            left: "-28px",
            background: "white",
            borderRadius: "16px",
            padding: "16px 20px",
            boxShadow: "0 12px 40px rgba(60,40,20,0.15)",
            border: "1px solid var(--beige-mid)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--charcoal)" }}>Certified Clinic</div>
              <div style={{ fontSize: "11px", color: "var(--brown-mid)", marginTop: "2px" }}>Modern Equipment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", opacity: 0.5 }}>
        <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--brown-mid)" }}>Scroll</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--brown-mid), transparent)" }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

// ===================== ABOUT DOCTOR =====================
function AboutDoctor() {
  return (
    <section id="about" style={{ padding: "100px 0", background: "var(--ivory-deep)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }} className="about-grid">
          {/* Image side */}
          <div className="reveal-left" style={{ position: "relative" }}>
            <div style={{
              width: "100%",
              aspectRatio: "3/4",
              borderRadius: "80px 24px 80px 24px",
              overflow: "hidden",
              boxShadow: "0 20px 70px rgba(60,40,20,0.15)",
            }}>
              <img src="/doctor-photo.jpg" alt="Dr. Ziauddin Qazi" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
            </div>
            {/* Experience badge */}
            <div style={{
              position: "absolute",
              bottom: "40px",
              right: "-20px",
              background: "linear-gradient(135deg, var(--charcoal), var(--warm-dark))",
              color: "white",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 12px 40px rgba(44,37,32,0.3)",
              textAlign: "center",
            }}>
              <div className="font-display" style={{ fontSize: "40px", fontWeight: 700, lineHeight: 1, color: "var(--gold)" }}>10+</div>
              <div style={{ fontSize: "12px", letterSpacing: "0.1em", marginTop: "4px", color: "rgba(255,255,255,0.8)" }}>Years of<br />Excellence</div>
            </div>
            {/* Gold accent line */}
            <div style={{ position: "absolute", top: "20px", left: "-12px", width: "4px", height: "80px", background: "linear-gradient(to bottom, var(--gold), transparent)", borderRadius: "2px" }} />
          </div>

          {/* Content side */}
          <div className="reveal-right">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span className="gold-line" />
              <span className="section-label">Meet Your Doctor</span>
            </div>
            <h2 className="font-display" style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 600, color: "var(--charcoal)", lineHeight: 1.1, marginBottom: "8px" }}>
              Dr. Ziauddin Qazi
            </h2>
            <p style={{ fontSize: "14px", fontWeight: 500, color: "var(--gold-dark)", letterSpacing: "0.08em", marginBottom: "24px", textTransform: "uppercase" }}>
              BDS — Chief Dental Surgeon
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "var(--brown-mid)", marginBottom: "20px", fontWeight: 300 }}>
              With over a decade of dedicated practice, Dr. Ziauddin Qazi brings together scientific precision and genuine compassion. He believes that exceptional dental care begins with listening — understanding each patient's unique needs and anxieties before recommending a treatment path.
            </p>
            <p style={{ fontSize: "15px", lineHeight: 1.85, color: "var(--brown-mid)", marginBottom: "36px", fontWeight: 300 }}>
              His approach blends the latest modern techniques with a deeply personal touch, ensuring every visit feels comfortable, transparent, and reassuring. From routine check-ups to complex restorative work, Dr. Qazi's commitment to excellence is unwavering.
            </p>

            {/* Qualifications */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
              {[
                "BDS Graduate — Modern Dental Sciences",
                "Specialist in Cosmetic & Restorative Dentistry",
                "Advanced Training in Implantology & Orthodontics",
                "Certified in Pain-Free Dental Procedures",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg, var(--gold-dark), var(--gold))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span style={{ fontSize: "14px", color: "var(--warm-dark)", fontWeight: 400 }}>{item}</span>
                </div>
              ))}
            </div>

            <a href="#booking" className="btn-primary">Schedule a Consultation</a>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}

// ===================== SERVICES =====================
const services = [
  { icon: "🦷", name: "Root Canal Treatment", desc: "Pain-free, precision root canal therapy using rotary endodontics to preserve your natural tooth." },
  { icon: "✨", name: "Teeth Cleaning", desc: "Professional scaling and polishing to remove tartar, leaving your teeth brilliantly clean." },
  { icon: "🔧", name: "Tooth Extraction", desc: "Gentle extractions performed with minimal discomfort and maximum care for faster recovery." },
  { icon: "🏆", name: "Dental Implants", desc: "Titanium implants that look, feel, and function like your natural teeth — a permanent solution." },
  { icon: "⚡", name: "Braces & Orthodontics", desc: "Metal, ceramic, and clear aligner options to craft a perfectly aligned, confident smile." },
  { icon: "💎", name: "Crowns & Bridges", desc: "Custom-crafted porcelain crowns and bridges that restore beauty and full function." },
  { icon: "🌟", name: "Cosmetic Dentistry", desc: "Smile makeovers combining veneers, bonding, and contouring for a life-changing transformation." },
  { icon: "☀️", name: "Teeth Whitening", desc: "Professional whitening that lifts stains several shades in a single comfortable session." },
];

function Services() {
  return (
    <section id="services" style={{ padding: "100px 0", background: "var(--ivory)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span className="gold-line" />
            <span className="section-label">Our Services</span>
            <span className="gold-line" />
          </div>
          <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, color: "var(--charcoal)", marginBottom: "16px" }}>
            Comprehensive Dental Excellence
          </h2>
          <p className="reveal" style={{ fontSize: "15px", color: "var(--brown-mid)", maxWidth: "520px", margin: "0 auto", lineHeight: 1.75, fontWeight: 300 }}>
            Every treatment we offer is performed with meticulous attention to detail, modern technology, and a genuine commitment to your comfort.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {services.map((service, i) => (
            <div key={service.name} className={`service-card reveal delay-${((i % 4) + 1) * 100}`}>
              <div className="service-icon-wrap">
                <span style={{ fontSize: "24px" }}>{service.icon}</span>
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "10px", letterSpacing: "0.01em" }}>{service.name}</h3>
              <p style={{ fontSize: "13.5px", color: "var(--brown-mid)", lineHeight: 1.7, fontWeight: 300 }}>{service.desc}</p>
              <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "6px", color: "var(--gold-dark)", fontSize: "13px", fontWeight: 500 }}>
                <span>Learn more</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== WHY CHOOSE US =====================
function WhyChooseUs() {
  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
      ),
      title: "Advanced Technology",
      desc: "We invest in the latest dental equipment — digital X-rays, rotary endodontics, and modern sterilization systems — so your treatment is precise, safe, and efficient."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
      ),
      title: "Patient-First Philosophy",
      desc: "Every decision we make puts your comfort and wellbeing first. We take time to explain every procedure, address your concerns, and never rush a treatment."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
      ),
      title: "Flexible Scheduling",
      desc: "We respect your time. Flexible appointment slots, minimal waiting, and the option to book instantly via WhatsApp make it easy to fit dental care into your life."
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
      ),
      title: "Transparent Pricing",
      desc: "Clear, honest pricing with no hidden fees. We walk you through all costs before treatment begins, and offer flexible payment guidance to suit your needs."
    },
  ];

  return (
    <section id="why-us" style={{ padding: "100px 0", background: "linear-gradient(160deg, var(--ivory-deep) 0%, var(--beige) 100%)", position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span className="gold-line" />
            <span className="section-label">Why Choose Welcare</span>
            <span className="gold-line" />
          </div>
          <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, color: "var(--charcoal)", marginBottom: "16px" }}>
            The Welcare Difference
          </h2>
          <p className="reveal" style={{ fontSize: "15px", color: "var(--brown-mid)", maxWidth: "500px", margin: "0 auto", lineHeight: 1.75, fontWeight: 300 }}>
            We don't just treat teeth — we build lasting relationships built on trust, transparency, and exceptional outcomes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {features.map((f, i) => (
            <div key={f.title} className={`feature-block reveal delay-${((i % 4) + 1) * 100}`}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, var(--ivory), var(--beige-mid))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: "var(--gold-dark)",
                border: "1px solid var(--beige-mid)",
              }}>
                {f.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--charcoal)", marginBottom: "10px" }}>{f.title}</h3>
                <p style={{ fontSize: "13.5px", color: "var(--brown-mid)", lineHeight: 1.75, fontWeight: 300 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== GALLERY =====================
function Gallery() {
  const images = [
    { src: "/clinic-interior.jpg", label: "Modern Treatment Room", size: "large" },
    { src: "/dental-procedure.jpg", label: "Expert Care", size: "normal" },
    { src: "/doctor-photo.jpg", label: "Dr. Ziauddin Qazi", size: "normal" },
    { src: "/clinic-exterior.jpg", label: "Welcare Dental Hub", size: "large" },
  ];

  return (
    <section id="gallery" style={{ padding: "100px 0", background: "var(--ivory)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span className="gold-line" />
            <span className="section-label">Gallery</span>
            <span className="gold-line" />
          </div>
          <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, color: "var(--charcoal)", marginBottom: "16px" }}>
            A Glimpse Inside
          </h2>
          <p className="reveal" style={{ fontSize: "15px", color: "var(--brown-mid)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.75, fontWeight: 300 }}>
            Our clinic is designed to make you feel at ease from the moment you walk in — clean, modern, and welcoming.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "280px 280px", gap: "16px" }} className="gallery-grid reveal">
          <div className="gallery-item" style={{ gridRow: "1 / 3", gridColumn: "1 / 2" }}>
            <img src="/clinic-interior.jpg" alt="Modern Treatment Room" />
            <div className="overlay">
              <div style={{ position: "absolute", bottom: "20px", left: "20px", color: "white" }}>
                <div style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Cormorant Garamond, serif" }}>Modern Treatment Room</div>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ gridRow: "1 / 2", gridColumn: "2 / 3" }}>
            <img src="/dental-procedure.jpg" alt="Expert Care" />
            <div className="overlay">
              <div style={{ position: "absolute", bottom: "16px", left: "16px", color: "white" }}>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>Expert Care</div>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ gridRow: "1 / 2", gridColumn: "3 / 4" }}>
            <img src="/doctor-photo.jpg" alt="Dr. Ziauddin Qazi" style={{ objectPosition: "center top" }} />
            <div className="overlay">
              <div style={{ position: "absolute", bottom: "16px", left: "16px", color: "white" }}>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>Dr. Ziauddin Qazi</div>
              </div>
            </div>
          </div>
          <div className="gallery-item" style={{ gridRow: "2 / 3", gridColumn: "2 / 4" }}>
            <img src="/clinic-exterior.jpg" alt="Welcare Dental Hub" />
            <div className="overlay">
              <div style={{ position: "absolute", bottom: "16px", left: "16px", color: "white" }}>
                <div style={{ fontSize: "16px", fontWeight: 600, fontFamily: "Cormorant Garamond, serif" }}>Welcare Dental Hub — Our Clinic</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: 1fr 1fr !important; grid-template-rows: 200px 200px 200px !important; }
          .gallery-grid > *:first-child { grid-row: auto !important; grid-column: auto !important; }
          .gallery-grid > *:last-child { grid-row: auto !important; grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}

// ===================== REVIEWS =====================
const reviews = [
  { name: "Priya Sharma", role: "Patient since 2021", text: "Dr. Qazi is exceptional. I had been avoiding the dentist for years due to anxiety, but his calm and gentle approach completely changed my experience. The clinic feels more like a luxury spa than a dental office.", stars: 5 },
  { name: "Rohit Deshmukh", role: "Patient since 2022", text: "Had my dental implants done here and the results are remarkable. Everything looks and feels completely natural. The entire process was explained clearly and the aftercare has been outstanding.", stars: 5 },
  { name: "Ayesha Khan", role: "Patient since 2023", text: "The teeth whitening treatment gave me incredible results in just one session. The staff is warm, professional, and genuinely caring. I wouldn't go anywhere else for dental care.", stars: 5 },
  { name: "Suresh Patil", role: "Patient since 2020", text: "Root canal treatment done painlessly — I was amazed. Dr. Qazi's expertise is evident in everything he does. The clinic is spotlessly clean and the environment is genuinely relaxing.", stars: 5 },
  { name: "Meera Joshi", role: "Patient since 2022", text: "My entire family comes here. From braces for my daughter to a crown for myself — every treatment has been handled with precision and care. Truly a premium clinic.", stars: 5 },
];

function Reviews() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" style={{ padding: "100px 0", background: "var(--ivory-deep)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span className="gold-line" />
            <span className="section-label">Patient Reviews</span>
            <span className="gold-line" />
          </div>
          <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, color: "var(--charcoal)", marginBottom: "16px" }}>
            What Our Patients Say
          </h2>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            ))}
            <span style={{ marginLeft: "8px", fontSize: "14px", color: "var(--brown-mid)", fontWeight: 500 }}>5.0 — 200+ Reviews</span>
          </div>
        </div>

        {/* Featured review */}
        <div className="reveal" style={{ maxWidth: "680px", margin: "0 auto 48px", position: "relative" }}>
          <div className="testimonial-card" style={{ textAlign: "center", padding: "48px 40px" }}>
            <div style={{ fontSize: "64px", color: "var(--gold)", opacity: 0.3, fontFamily: "Georgia, serif", lineHeight: 0.8, marginBottom: "24px" }}>"</div>
            <p style={{ fontSize: "17px", lineHeight: 1.8, color: "var(--warm-dark)", marginBottom: "32px", fontStyle: "italic", fontWeight: 300, fontFamily: "Cormorant Garamond, serif" }}>
              {reviews[current].text}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", marginBottom: "16px" }}>
              {[...Array(reviews[current].stars)].map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              ))}
            </div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--charcoal)" }}>{reviews[current].name}</div>
            <div style={{ fontSize: "12px", color: "var(--brown-light)", marginTop: "4px", letterSpacing: "0.06em" }}>{reviews[current].role}</div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: i === current ? "var(--gold)" : "var(--beige-mid)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Cards row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className={`testimonial-card reveal delay-${((i % 3) + 1) * 100}`}
              onClick={() => setCurrent(i)}
              style={{ cursor: "pointer", borderColor: i === current ? "rgba(212,175,55,0.4)" : undefined }}
            >
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[...Array(r.stars)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                ))}
              </div>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--brown-mid)", marginBottom: "20px", fontWeight: 300, fontStyle: "italic" }}>"{r.text}"</p>
              <div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--charcoal)" }}>{r.name}</div>
                <div style={{ fontSize: "12px", color: "var(--brown-light)", marginTop: "2px" }}>{r.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== WHATSAPP BOOKING =====================
function WhatsAppBooking() {
  const [form, setForm] = useState({ name: "", phone: "", address: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Welcare Dental Hub, I want to book an appointment.\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nMessage: ${form.message}`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/918103161214?text=${encoded}`, "_blank");
  };

  return (
    <section id="booking" style={{
      padding: "100px 0",
      background: "linear-gradient(160deg, var(--beige) 0%, var(--ivory-deep) 50%, var(--beige-mid) 100%)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative blobs */}
      <div style={{ position: "absolute", top: "-120px", left: "-120px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span className="gold-line" />
            <span className="section-label">Book Your Visit</span>
            <span className="gold-line" />
          </div>
          <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, color: "var(--charcoal)", marginBottom: "16px" }}>
            Book via WhatsApp
          </h2>
          <p className="reveal" style={{ fontSize: "15px", color: "var(--brown-mid)", lineHeight: 1.75, fontWeight: 300 }}>
            Fill in your details below and we'll connect with you directly on WhatsApp to confirm your appointment.
          </p>
        </div>

        <div className="glass-card reveal" style={{ padding: "clamp(28px, 5vw, 56px)" }}>
          {/* WhatsApp icon header */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "40px", paddingBottom: "32px", borderBottom: "1px solid rgba(212,175,55,0.2)" }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 24px rgba(37,211,102,0.3)",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </div>
            <div>
              <div style={{ fontSize: "16px", fontWeight: 600, color: "var(--charcoal)" }}>WhatsApp Appointment</div>
              <div style={{ fontSize: "13px", color: "var(--brown-mid)", marginTop: "2px" }}>+91 81031 61214 · Instant Confirmation</div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }} className="form-grid">
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--brown-mid)", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  placeholder="Your full name"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--brown-mid)", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setFocused("phone")}
                  onBlur={() => setFocused(null)}
                  placeholder="Your phone number"
                  required
                  className="form-input"
                />
              </div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--brown-mid)", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                onFocus={() => setFocused("address")}
                onBlur={() => setFocused(null)}
                placeholder="Your address"
                className="form-input"
              />
            </div>
            <div style={{ marginBottom: "32px" }}>
              <label style={{ fontSize: "12px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--brown-mid)", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>
                Message / Treatment Needed
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                placeholder="Tell us what treatment you're looking for, or any concerns..."
                rows={4}
                className="form-input"
                style={{ resize: "vertical", minHeight: "100px" }}
              />
            </div>
            <button type="submit" style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "15px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "0 8px 30px rgba(37,211,102,0.3)",
              transition: "all 0.3s ease",
              fontFamily: "Inter, sans-serif",
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,211,102,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.3)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Send via WhatsApp
            </button>

            <p style={{ textAlign: "center", fontSize: "12px", color: "var(--brown-light)", marginTop: "16px", lineHeight: 1.6 }}>
              Clicking above will open WhatsApp with your details pre-filled. We'll confirm your appointment shortly.
            </p>
          </form>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ===================== CONTACT =====================
function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 0", background: "var(--ivory)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span className="gold-line" />
            <span className="section-label">Find Us</span>
            <span className="gold-line" />
          </div>
          <h2 className="reveal font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 600, color: "var(--charcoal)", marginBottom: "16px" }}>
            Visit Our Clinic
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "48px", alignItems: "start" }} className="contact-grid">
          {/* Info */}
          <div className="reveal-left">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>,
                label: "Address",
                value: "TV Centre, Majnu Hill Rd, near Icon Hospital, Chhatrapati Sambhajinagar, Maharashtra"
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 5.54 5.54l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
                label: "Phone",
                value: "+91 81031 61214"
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
                label: "Hours",
                value: "Monday – Saturday: 10am – 8pm\nSunday: By Appointment"
              },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "16px", marginBottom: "28px", padding: "20px", background: "white", borderRadius: "14px", border: "1px solid var(--beige-mid)", boxShadow: "var(--shadow-soft)" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: "linear-gradient(135deg, var(--ivory-deep), var(--beige))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "var(--gold-dark)", border: "1px solid var(--beige-mid)" }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "var(--gold-dark)", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</div>
                  <div style={{ fontSize: "14px", color: "var(--warm-dark)", lineHeight: 1.6, whiteSpace: "pre-line" }}>{item.value}</div>
                </div>
              </div>
            ))}

            <a href="https://wa.me/918103161214" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="reveal-right" style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "var(--shadow-card)", border: "1px solid var(--beige-mid)" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3752.1573624386!2d75.32742!3d19.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdba326c74df80b%3A0xa0b7adf17e8059d6!2sWelcare%20Dental%20Hub!5e0!3m2!1sen!2sin!4v1712000000000!5m2!1sen!2sin"
              width="100%"
              height="420"
              style={{ border: "none", display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Welcare Dental Hub Location"
            />
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ===================== FOOTER =====================
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: "var(--charcoal)", color: "rgba(255,255,255,0.7)", padding: "64px 0 32px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "60px", marginBottom: "56px" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <span className="font-display" style={{ fontSize: "24px", fontWeight: 600, color: "white", letterSpacing: "0.02em", display: "block" }}>Welcare</span>
              <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.22em", color: "var(--gold)", textTransform: "uppercase" }}>Dental Hub</span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", maxWidth: "280px", fontWeight: 300 }}>
              Premium dental care with a personal touch. Serving Chhatrapati Sambhajinagar with excellence, warmth, and clinical precision.
            </p>
            <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <a href="https://wa.me/918103161214" target="_blank" rel="noopener noreferrer" style={{
                width: "40px", height: "40px", borderRadius: "10px",
                background: "rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.7)",
                transition: "all 0.3s",
                textDecoration: "none",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,55,0.15)"; e.currentTarget.style.color = "var(--gold)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                ["#about", "About Doctor"],
                ["#services", "Services"],
                ["#gallery", "Gallery"],
                ["#reviews", "Reviews"],
                ["#booking", "Book Appointment"],
                ["#contact", "Contact"],
              ].map(([href, label]) => (
                <li key={label}>
                  <a href={href} style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
                  >{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "20px" }}>Services</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {["Root Canal Treatment", "Teeth Cleaning", "Dental Implants", "Braces & Orthodontics", "Cosmetic Dentistry", "Teeth Whitening"].map((s) => (
                <li key={s}>
                  <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)" }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
            © {year} Welcare Dental Hub. All rights reserved.
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
            TV Centre, Majnu Hill Rd, Chhatrapati Sambhajinagar
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </footer>
  );
}

// ===================== FLOATING WHATSAPP BUTTON =====================
function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918103161214"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #25D366, #128C7E)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 8px 30px rgba(37,211,102,0.4)",
        zIndex: 999,
        transition: "all 0.3s ease",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,211,102,0.5)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.4)"; }}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      {/* Pulse ring */}
      <span style={{
        position: "absolute",
        inset: "-4px",
        borderRadius: "50%",
        border: "2px solid rgba(37,211,102,0.5)",
        animation: "pulse-ring 2s ease-out infinite",
      }} />
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </a>
  );
}

// ===================== APP =====================
export default function App() {
  useReveal();

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <main>
        <Hero />
        <AboutDoctor />
        <Services />
        <WhyChooseUs />
        <Gallery />
        <Reviews />
        <WhatsAppBooking />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

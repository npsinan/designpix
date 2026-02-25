import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)

const services = [
  {
    title: 'Signage and Outdoor Branding',
    description:
      'Shop signs, facade branding, and wayfinding solutions built for high visibility.',
  },
  {
    title: 'Digital and Offset Printing',
    description:
      'Brochures, catalogs, flyers, and premium stationery produced with sharp color control.',
  },
  {
    title: 'Vehicle Graphics',
    description:
      'Fleet wraps and decals designed to turn every vehicle into a moving brand asset.',
  },
  {
    title: 'Exhibition and Event Displays',
    description:
      'Custom booths, backdrops, and branded counters tailored for events and activations.',
  },
  {
    title: 'Corporate Gifts and Packaging',
    description:
      'Branded merchandise, gift kits, and packaging that elevate customer touchpoints.',
  },
  {
    title: 'Uniform and Apparel Branding',
    description:
      'Heat transfer, embroidery, and screen print services for teams and promotions.',
  },
]

const processSteps = [
  {
    title: 'Discovery',
    detail: 'We align on your goals, audience, timeline, and budget.',
  },
  {
    title: 'Design',
    detail: 'Our creative team builds concepts that match your brand voice.',
  },
  {
    title: 'Production',
    detail: 'Materials are produced in-house with strict quality checks.',
  },
  {
    title: 'Installation',
    detail: 'Our team delivers, installs, and signs off with your team onsite.',
  },
]

const portfolio = [
  'Retail Store Rebrand',
  'Restaurant Menu and Signage',
  'Corporate Office Wayfinding',
  'Fleet Vehicle Wrap Series',
  'Expo Booth Visual System',
  'Seasonal Campaign Collateral',
]

function App() {
  const year = new Date().getFullYear()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const getOffset = () => (window.innerWidth <= 640 ? 94 : 108)

    const scrollToHash = (hash, updateUrl = false) => {
      const target = document.querySelector(hash)
      if (!target) {
        return
      }

      gsap.to(window, {
        duration: prefersReducedMotion ? 0 : 1.05,
        ease: 'power3.out',
        overwrite: 'auto',
        scrollTo: {
          y: target,
          offsetY: getOffset(),
        },
      })

      if (updateUrl) {
        window.history.replaceState(null, '', hash)
      }
    }

    const handleAnchorClick = (event) => {
      const href = event.currentTarget.getAttribute('href')
      if (!href || !href.startsWith('#') || href.length < 2) {
        return
      }

      const section = document.querySelector(href)
      if (!section) {
        return
      }

      event.preventDefault()
      scrollToHash(href, true)
    }

    const links = Array.from(document.querySelectorAll('a[href^="#"]'))
    links.forEach((link) => link.addEventListener('click', handleAnchorClick))

    const revealItems = gsap.utils.toArray('.reveal')
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(revealItems, { autoAlpha: 1, y: 0 })
        return
      }

      revealItems.forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 86%',
              once: true,
            },
          },
        )
      })
    })

    const normalizer = prefersReducedMotion
      ? null
      : ScrollTrigger.normalizeScroll({
          allowNestedScroll: true,
          momentum: (self) => Math.min(2.6, self.velocityY / 1000),
        })

    if (window.location.hash) {
      window.requestAnimationFrame(() => {
        scrollToHash(window.location.hash, false)
      })
    }

    return () => {
      links.forEach((link) =>
        link.removeEventListener('click', handleAnchorClick),
      )
      if (normalizer) {
        normalizer.kill()
      }
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="brand-block">
          <a className="brand" href="#home">
            <span className="brand-red">DESIGN</span>
            <span className="brand-dark">PRIX</span>
          </a>
          <p className="tagline">Advertising | Brand it your way</p>
        </div>
        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#portfolio">Work</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy reveal" style={{ animationDelay: '0.08s' }}>
            <p className="eyebrow">Creative Print and Branding Studio</p>
            <h1>
              Powerful visual branding for companies that want to stand out.
            </h1>
            <p className="lead">
              Design Prix delivers print, signage, and advertising solutions
              from concept to installation. We help businesses launch faster and
              look sharper across every touchpoint.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#contact">
                Start Your Project
              </a>
              <a className="btn btn-outline" href="#portfolio">
                View Recent Work
              </a>
            </div>
          </div>

          <aside className="hero-panel reveal" style={{ animationDelay: '0.2s' }}>
            <h2>Why Design Prix</h2>
            <ul className="metric-list">
              <li>
                <strong>12+</strong>
                <span>Years in branding and print production</span>
              </li>
              <li>
                <strong>1800+</strong>
                <span>Completed projects across industries</span>
              </li>
              <li>
                <strong>48hr</strong>
                <span>Fast-track delivery for urgent campaigns</span>
              </li>
              <li>
                <strong>In-house</strong>
                <span>Design, print, fabrication, and installation team</span>
              </li>
            </ul>
          </aside>
        </section>

        <section className="section" id="services">
          <div className="section-head reveal" style={{ animationDelay: '0.08s' }}>
            <p className="eyebrow">What We Do</p>
            <h2>Services built for growth-focused brands</h2>
          </div>
          <div className="service-grid">
            {services.map((item, index) => (
              <article
                className="service-card reveal"
                key={item.title}
                style={{ animationDelay: `${0.12 + index * 0.07}s` }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section process" id="process">
          <div className="section-head reveal" style={{ animationDelay: '0.08s' }}>
            <p className="eyebrow">Our Workflow</p>
            <h2>Simple, transparent, and deadline-driven</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article
                className="process-card reveal"
                key={step.title}
                style={{ animationDelay: `${0.15 + index * 0.08}s` }}
              >
                <span className="step-id">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="portfolio">
          <div className="section-head reveal" style={{ animationDelay: '0.08s' }}>
            <p className="eyebrow">Recent Projects</p>
            <h2>Selected work from our production floor</h2>
          </div>
          <div className="portfolio-grid">
            {portfolio.map((name, index) => (
              <article
                className="portfolio-card reveal"
                key={name}
                style={{ animationDelay: `${0.14 + index * 0.07}s` }}
              >
                <span className="project-number">Project {index + 1}</span>
                <h3>{name}</h3>
                <p>
                  End-to-end design, print production, and onsite finishing with
                  strict brand consistency.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-band reveal section" style={{ animationDelay: '0.08s' }}>
          <h2>Need branding support for your next campaign?</h2>
          <p>
            Tell us your timeline and budget. We will propose the right mix of
            design, print, and installation services.
          </p>
          <a className="btn btn-primary" href="#contact">
            Get a Quick Quote
          </a>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-info reveal" style={{ animationDelay: '0.12s' }}>
            <p className="eyebrow">Contact</p>
            <h2>Let us build your next brand moment</h2>
            <p>
              Share your requirements and our team will reply with options,
              pricing, and a production timeline.
            </p>
            <ul>
              <li>
                <span>Phone</span>
                <a href="tel:+971500000000">+971 50 000 0000</a>
              </li>
              <li>
                <span>Email</span>
                <a href="mailto:hello@designprix.ae">hello@designprix.ae</a>
              </li>
              <li>
                <span>Address</span>
                <p>Industrial Zone, Sharjah, UAE</p>
              </li>
            </ul>
          </div>
          <form className="contact-form reveal" style={{ animationDelay: '0.2s' }}>
            <label>
              Name
              <input type="text" name="name" placeholder="Your name" />
            </label>
            <label>
              Phone
              <input type="tel" name="phone" placeholder="Your phone number" />
            </label>
            <label>
              Service Needed
              <input
                type="text"
                name="service"
                placeholder="e.g. signboard, brochures, vehicle wrap"
              />
            </label>
            <label>
              Project Details
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us your quantity, size, and deadline"
              />
            </label>
            <button type="button" className="btn btn-primary">
              Send Inquiry
            </button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>(c) {year} Design Prix Advertising. All rights reserved.</p>
      </footer>

      <a className="floating-contact" href="#contact">
        Contact Us
      </a>
    </div>
  )
}

export default App


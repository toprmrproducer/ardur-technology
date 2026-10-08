# Ardur Technology website

Static single-page site for Ardur Technology (client of RapidXAI), rebuilt on the Korben Webflow template as the backbone. Plain HTML/CSS/JS, no build step.

## Structure
- `index.html` - the whole site. Sections marked with `<!-- ## NAME ## -->` banners (NAV, HERO, MISSION / EXPERTISE, SERVICES, PROCESS, TESTIMONIALS / WHY ARDUR, TESTIMONIAL CARDS, STATS BAND, FAQ, CTA / CONTACT, FOOTER, FOOTER BOTTOM). Jump by banner, never re-read the file.
- `assets/css/ardur.webflow.css` - the template's compiled stylesheet (all breakpoints, do not hand-edit).
- `assets/js/` - jquery, webflow runtime, gsap, ScrollTrigger, lenis. The template's interactions (tabs, FAQ, nav, scroll reveals) run on these; elements with `move_apr`/`data-reveal` are ix3-animated.
- `assets/media/` - template images + the CTA background video, all downloaded from the template CDN.
- `assets/favicon.png` / `assets/logo.png` - Ardur logo mark (works on dark) and dark-on-light wordmark.

## Rules
- Content = Ardur Technology's five service lines: US mortgage appraisal, records management, airline record management, KPO, non-voice BPO.
- Services tabs are the template's ix3 component; it is class-generic so extra `.home_tab` + `.w-dyn-list` panels keep working.
- Contact CTAs use mailto:info@ardurtechnology.com / tel:+17028092713 (static host, no form backend).
- The original template demo: korben.webflow.io. Zero Korben/ Webflow branding may remain in visible copy.

## Deploy
GitHub Pages, repo `toprmrproducer/ardur-technology`, branch `main`, root. Live: https://toprmrproducer.github.io/ardur-technology/ . Push to main = deploy. Verify the live URL after pushing.

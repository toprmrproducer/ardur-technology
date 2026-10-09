# Ardur Technology website

Static single-page site for Ardur Technology (client of RapidXAI), rebuilt on the Korben Webflow template as the backbone. Plain HTML/CSS/JS, no build step.

## Structure (multi-page, 19 pages)
- `index.html` - homepage. Sections marked with `<!-- ## NAME ## -->` banners (NAV, HERO, MISSION / EXPERTISE, SERVICES, PROCESS, TESTIMONIALS / WHY ARDUR, TESTIMONIAL CARDS, STATS BAND, FAQ, CTA / CONTACT, FOOTER, FOOTER BOTTOM). Jump by banner, never re-read the file.
- `about-us/` - about page: hero video, expertise, company timeline, delivery-floor quote, team (role cards, scene imagery), careers CTA.
- `services/` - listing with the five sticky scroll cards; `services/<slug>/` for mortgage-appraisal, records-management, airline-records, kpo, non-voice-bpo (detail pages).
- `case-studies/` - listing + 3 anonymized case studies (no invented client names, role-attributed quotes only).
- `blog/` - listing + 3 posts (article layout reuses the case-detail backbone).
- `terms-conditions/`, `privacy-policy/`, `404.html`.
- Every page shares the generated Ardur nav/footer (relative prefixes per depth: `../` one level, `../../` two). Subfolder pages use `folder/index.html` so GitHub Pages serves clean URLs.
- `assets/css/ardur.webflow.css` - the template's compiled stylesheet (all breakpoints, do not hand-edit).
- `assets/js/` - jquery, webflow runtime, gsap, ScrollTrigger, lenis. The template's interactions (tabs, FAQ, nav, scroll reveals) run on these; elements with `move_apr`/`data-reveal` are ix3-animated.
- `assets/media/` - template images + the CTA background video, all downloaded from the template CDN.
- `assets/favicon.png` / `assets/logo.png` - Ardur logo mark (works on dark) and dark-on-light wordmark.

## Rules
- Brand is exactly "Ardur Technology" - no Korben anywhere: not as text, not as the SVG wordmark (the vector logo hides from text greps; check `viewBox="0 0 106 28"` / `viewBox="0 0 120 32"`).
- No fabricated people: no invented team members, testimonials or client names. Quotes are role-attributed or capability statements; photos are working scenes, not portraits.
- Content = Ardur Technology's five service lines: US mortgage appraisal, records management, airline record management, KPO, non-voice BPO.
- Services tabs are the template's ix3 component; it is class-generic so extra `.home_tab` + `.w-dyn-list` panels keep working.
- Contact CTAs use mailto:info@ardurtechnology.com / tel:+17028092713 (static host, no form backend).
- The original template demo: korben.webflow.io. Zero Korben/ Webflow branding may remain in visible copy.

## Deploy
GitHub Pages, repo `toprmrproducer/ardur-technology`, branch `main`, root. Live: https://toprmrproducer.github.io/ardur-technology/ . Push to main = deploy. Verify the live URL after pushing.

/**
 * Smoke Test Suite — beta.stylework.city
 *
 * Purpose : Verify that the most critical user-visible journeys are alive
 *           after every deployment. Not a full regression; only "is it on fire?" checks.
 *
 * Run     : npx cypress run --spec "cypress/e2e/stylework.smoke.cy.ts"
 * Env var : STYLEWORK_BASE_URL  (defaults to https://beta.stylework.city)
 */

const BASE_URL = Cypress.env('STYLEWORK_BASE_URL') ?? 'https://beta.stylework.city';

// ─── helpers ──────────────────────────────────────────────────────────────────

/** Visit a path and assert the page loaded without a 4xx / 5xx */
function visit(path: string) {
  cy.visit(`${BASE_URL}${path}`, { failOnStatusCode: true });
}

/** Confirm the <title> contains the expected fragment (case-insensitive) */
function hasTitle(fragment: string) {
  cy.title().should('match', new RegExp(fragment, 'i'));
}

// ─── suite ────────────────────────────────────────────────────────────────────

describe('Stylework — Smoke Tests', () => {
  // ── 1. Homepage ─────────────────────────────────────────────────────────────
  describe('Homepage', () => {
    beforeEach(() => visit('/'));

    it('loads with the correct page title', () => {
      hasTitle('Stylework');
    });

    it('renders the Stylework logo', () => {
      cy.get('img[alt="stylework"], img[alt="Stylework"]').should('be.visible');
    });

    it('displays the hero headline', () => {
      cy.contains(/Workspaces at Your Fingertips/i).should('be.visible');
    });

    it('shows the workspace-type tabs (Meeting Room, Day Pass, etc.)', () => {
      const tabs = ['Meeting Room', 'Dedicated Desk', 'Private Cabin', 'Day Pass'];
      tabs.forEach((tab) => cy.contains(tab).should('exist'));
    });

    it('has a city search input and a "View Workspace" CTA', () => {
      cy.contains(/View Workspace/i).should('be.visible');
    });

    it('shows the key stats section (4000+ Spaces)', () => {
      cy.contains(/4000\+/i).should('be.visible');
      cy.contains(/Spaces/i).should('be.visible');
    });

    it('renders "Our Offerings" product cards', () => {
      const offerings = ['Day Pass', 'Meeting Room', 'Dedicated Desk', 'Private Cabin', 'Virtual Office'];
      offerings.forEach((o) => cy.contains(o).should('exist'));
    });

    it('renders the FlexBoard section', () => {
      cy.contains(/FlexBoard/i).should('be.visible');
    });

    it('shows the FAQ accordion with at least one answer', () => {
      cy.contains(/What is Coworking/i).should('be.visible');
    });

    it('renders footer links (About Us, Contact Us, Privacy Policy)', () => {
      cy.get('footer, [class*="footer"]').within(() => {
        cy.contains(/About Us/i).should('exist');
        cy.contains(/Privacy Policy/i).should('exist');
        cy.contains(/Terms/i).should('exist');
      });
    });

    it('shows app-store download buttons', () => {
      cy.get('a[href*="ios"], a[href*="android"]').should('have.length.gte', 1);
    });
  });

  // ── 2. Navigation — primary links ───────────────────────────────────────────
  describe('Primary Navigation', () => {
    beforeEach(() => visit('/'));

    it('navigates to Virtual Office page', () => {
      cy.get('a[href*="virtual-office"]').first().click();
      cy.url().should('include', 'virtual-office');
      hasTitle('Virtual Office');
    });

    it('navigates to List Your Space page', () => {
      cy.get('a[href*="list-your-space"]').first().click();
      cy.url().should('include', 'list-your-space');
    });

    it('navigates to Private Cabin / Private Office page', () => {
      cy.get('a[href*="private"]').first().click();
      cy.url().should('match', /private/i);
    });
  });

  // ── 3. Key static / informational pages ─────────────────────────────────────
  describe('Static Pages', () => {
    it('About Us page loads', () => {
      visit('/about-us');
      hasTitle('About');
      cy.contains(/Stylework/i).should('be.visible');
    });

    it('Contact Us page loads and shows contact form', () => {
      visit('/contact-us');
      cy.contains(/Contact/i).should('be.visible');
      // form fields
      cy.get('input[type="text"], input[type="email"], input[type="tel"]')
        .should('have.length.gte', 3);
    });

    it('Careers page loads', () => {
      visit('/career');
      cy.contains(/Career/i).should('be.visible');
    });

    it('Terms & Conditions page loads', () => {
      visit('/terms-and-condition');
      cy.contains(/Terms/i).should('be.visible');
    });

    it('Privacy Policy page loads', () => {
      visit('/privacy-policy');
      cy.contains(/Privacy/i).should('be.visible');
    });

    it('FAQ page loads', () => {
      visit('/faq');
      cy.contains(/FAQ|Frequently Asked/i).should('be.visible');
    });

    it('Enterprise page loads', () => {
      visit('/enterprise');
      cy.contains(/Enterprise/i).should('be.visible');
    });
  });

  // ── 4. Product / listing pages ───────────────────────────────────────────────
  describe('Product Pages', () => {
    it('Fixed Plans page loads', () => {
      visit('/coworking-fixed-membership');
      cy.contains(/Fixed|Membership/i).should('be.visible');
    });

    it('Multi-location Plans page loads', () => {
      visit('/coworking-multilocation-membership');
      cy.contains(/Multi|Multilocation/i).should('be.visible');
    });

    it('Managed Office page loads', () => {
      visit('/managed-office-space/gurgaon');
      cy.contains(/Managed Office/i).should('be.visible');
    });

    it('Virtual Office Gurgaon page loads', () => {
      visit('/virtual-office/gurgaon');
      cy.contains(/Virtual Office/i).should('be.visible');
    });

    it('Private Office Cabins Gurgaon page loads', () => {
      visit('/private-office-cabins/gurgaon');
      cy.contains(/Private/i).should('be.visible');
    });

    it('Name Your Own Price Virtual Office page loads', () => {
      visit('/name-your-own-price-virtual-office');
      cy.contains(/Virtual Office|Name Your/i).should('be.visible');
    });
  });

  // ── 5. "Request a Call Back" modal ──────────────────────────────────────────
  describe('"Request a Call Back" Modal', () => {
    beforeEach(() => visit('/'));

    it('opens the modal when CTA is clicked', () => {
      cy.contains(/Request a Call Back/i).first().click();
      cy.contains(/Your Full Name/i).should('be.visible');
      cy.contains(/Your Contact No/i).should('be.visible');
      cy.contains(/Your Email/i).should('be.visible');
    });

    it('closes the modal via the close icon', () => {
      cy.contains(/Request a Call Back/i).first().click();
      cy.contains(/Your Full Name/i).should('be.visible');
      // close button (SVG or button with close/cross)
      cy.get('img[alt*="Close"], img[alt*="close"], button[aria-label*="close"], button[aria-label*="Close"]')
        .first()
        .click({ force: true });
      cy.contains(/Your Full Name/i).should('not.be.visible');
    });

    it('shows a validation error when form is submitted empty', () => {
      cy.contains(/Request a Call Back/i).first().click();
      cy.contains(/Submit/i).click();
      // Browser native validation or custom error — at least one required field fires
      cy.get('input:invalid, [class*="error"], [class*="Error"]')
        .should('exist');
    });
  });

  // ── 6. Homepage Contact Form ─────────────────────────────────────────────────
  describe('Homepage Contact Form', () => {
    beforeEach(() => visit('/'));

    it('renders all required fields', () => {
      const labels = ['First Name', 'Last Name', 'Contact No', 'Email', 'Company Name'];
      labels.forEach((label) => cy.contains(new RegExp(label, 'i')).should('exist'));
    });

    it('shows validation when "Connect me" is submitted empty', () => {
      cy.contains(/Connect me/i).click();
      cy.get('input:invalid, [class*="error"]').should('exist');
    });
  });

  // ── 7. FAQ Accordion ─────────────────────────────────────────────────────────
  describe('Homepage FAQ Accordion', () => {
    beforeEach(() => visit('/'));

    it('expands a closed FAQ item on click', () => {
      // "Why is Stylework a Trusted Choice" starts closed
      cy.contains(/Why is Stylework a Trusted Choice/i)
        .click()
        .parents('[class*="accordion"], [class*="faq"], li')
        .first()
        .find('p, div')
        .should('be.visible');
    });
  });

  // ── 8. SEO / Meta ────────────────────────────────────────────────────────────
  describe('SEO & Meta Tags', () => {
    beforeEach(() => visit('/'));

    it('has a canonical link tag pointing to the site', () => {
      cy.get('link[rel="canonical"]')
        .should('have.attr', 'href')
        .and('include', 'stylework.city');
    });

    it('has an og:title meta tag', () => {
      cy.get('meta[property="og:title"]').should('exist');
    });

    it('has a meta description', () => {
      cy.get('meta[name="description"]')
        .should('have.attr', 'content')
        .and('include', 'Stylework');
    });

    it('has a Twitter card meta tag', () => {
      cy.get('meta[name="twitter:card"]').should('exist');
    });
  });

  // ── 9. External links ───────────────────────────────────────────────────────
  describe('External / Social Links', () => {
    beforeEach(() => visit('/'));

    it('LinkedIn link points to the correct domain', () => {
      cy.get('a[href*="linkedin.com"]').should('have.attr', 'href').and('include', 'linkedin.com');
    });

    it('Instagram link exists', () => {
      cy.get('a[href*="instagram.com"]').should('exist');
    });

    it('iOS App Store link exists', () => {
      cy.get('a[href*="ios"], a[href*="app.link"]').should('exist');
    });

    it('Android / Play Store link exists', () => {
      cy.get('a[href*="android"], a[href*="play"]').should('exist');
    });
  });

  // ── 10. Newsletter subscription ─────────────────────────────────────────────
  describe('Newsletter Subscription (footer)', () => {
    beforeEach(() => visit('/'));

    it('shows a newsletter input in the footer', () => {
      cy.get('footer input[type="email"], footer input[type="text"], [class*="newsletter"] input')
        .should('exist');
    });

    it('has a Subscribe button', () => {
      cy.contains(/Subscribe/i).should('exist');
    });
  });
});
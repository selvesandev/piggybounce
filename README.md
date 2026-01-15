# Piggybounce

[Piggy Bounce](https://piggybounce.com) is a powerful Node.js SDK and collaboration platform for capturing website screenshots, generating PDFs, and annotating images at scale. It is designed for developers, QA teams, designers, and product teams who need automated visual capture, markup, and real-time collaboration.


[Piggy Bounce](https://piggybounce.com) helps you:

* Capture screenshots of any URL in standard device sizes (desktop, tablet, mobile)
* Generate PDFs from URLs or raw HTML in standard paper sizes
* Receive outputs as Base64, Blob, or hosted file URLs
* Annotate images with notes, labels, and coordinates
* Extract structured JSON metadata (x/y positions, labels, comments)
* Collaborate with team members in real time

## Key Features

### Website Screenshot Capture (Node.js)

Capture high-quality screenshots of any public or authenticated URL.

**Supported device presets:**
* 🖥️ Large screen (Desktop)
* 💻 Medium screen (Laptop / Tablet)
* 📱 Small screen (Mobile)

**Use cases:**

* Visual regression testing
* UI/UX reviews
* Website previews
* SEO audits
* QA automation


### PDF Generation (URL or HTML)

**Generate PDFs from:**

* Live URLs
* Raw HTML files or strings
* Supported PDF sizes:
* A4, A3, Letter, Legal
* Custom dimensions

**Output options:**

* Base64-encoded string
* Binary Blob
* Secure hosted URL


### Image Annotation & Markup

**Annotate images that are:**
* Uploaded directly to [Piggy Bounce](https://piggybounce.com)
* Captured automatically from a URL  

**Annotation features:**
* Draw boxes, highlights, and markers
* Attach notes and comments to annotated areas
* Label specific regions on the image


### Annotation Metadata (JSON Export)
Every annotation can be exported as structured JSON, including:

```json
{
    "label": "CTA Button",
    "note": "Increase contrast for accessibility",
    "x": 245,
    "y": 312,
    "width": 120,
    "height": 40
}
```
Perfect for:

* Design feedback systems
* Automated QA pipelines
* AI/ML training datasets
* Issue tracking tools




### Real-Time Team Collaboration
[Piggy Bounce](https://piggybounce.com) is not just a library — it’s a collaborative platform.

* Share annotated assets with team members
* Add threaded comments
* Collaborate in real time
* Track feedback history

Ideal for remote teams, agencies, and product teams.


## Typical Use Cases

* ✅ Automated website screenshots (Node.js)
* ✅ PDF invoice or report generation
* ✅ Design review and UI feedback
* ✅ QA bug reporting with visual context
* ✅ SEO and performance audits
* ✅ Client approvals and collaboration


## Node.js SDK Capabilities

* Capture screenshots from URLs
* Generate PDFs from HTML or URLs
* Upload and annotate images
* Fetch annotation metadata as JSON
* Secure file hosting and sharing




## Usage

### Installation
```bash
npm install piggybounce # NPM 
pnpm install piggybounce # PNPM
yarn add piggybounce # YARN
```

### Quick Start Example

```javascript

mport { PiggyBounce } from "piggybounce";

const piggybounce = new PiggyBounce({
  baseURL: "https://api.yourdomain.com",
  token: process.env.PIGGYBOUNCE_TOKEN!,
});

const cus = await piggybounce.capture.url({ url: "https://example.com" });

```
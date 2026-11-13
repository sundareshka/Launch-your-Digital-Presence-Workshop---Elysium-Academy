export interface SeoAuditResult {
  titleText: string;
  titleLength: number;
  titleStatus: 'optimal' | 'short' | 'long' | 'default';
  metaDescription: string;
  metaLength: number;
  metaStatus: 'optimal' | 'short' | 'long' | 'missing';
  h1Count: number;
  h2Count: number;
  headingValid: boolean;
  imagesCount: number;
  imagesMissingAlt: number;
  altValid: boolean;
  remainingPlaceholders: string[];
  hasCssLink: boolean;
  hasDoctype: boolean;
  passedChecks: number;
  totalChecks: number;
}

const SVG_AVATAR_DATA_URI =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="80" fill="#E8ECEE"/><circle cx="80" cy="60" r="28" fill="#37474F"/><path d="M32 140c6-26 26-42 48-42s42 16 48 42" fill="#37474F"/><circle cx="122" cy="122" r="14" fill="#F9A91E"/></svg>`
  );

export function buildLivePreviewDoc(html: string, css: string, includeCss = true): string {
  // Replace local photo.jpg references inside the sandboxed preview with an inline vector portrait
  // so learners see a clean avatar preview without broken file links.
  let processedHtml = html.replace(/src=["']photo\.jpg["']/gi, `src="${SVG_AVATAR_DATA_URI}"`);

  // Strip the external style.css link tag in the iframe and inject live CSS directly into <head>
  processedHtml = processedHtml.replace(
    /<link\s+rel=["']stylesheet["']\s+href=["']style\.css["']\s*\/?>/gi,
    ''
  );

  if (includeCss) {
    const styleBlock = `<style>\n${css}\n</style>`;
    if (/<\/head>/i.test(processedHtml)) {
      processedHtml = processedHtml.replace(/<\/head>/i, `${styleBlock}\n</head>`);
    } else {
      processedHtml = `${styleBlock}\n${processedHtml}`;
    }
  }

  return processedHtml;
}

export function auditHtmlDocument(html: string): SeoAuditResult {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const titleText = titleMatch ? titleMatch[1].trim() : '';
  const titleLength = titleText.length;

  let titleStatus: SeoAuditResult['titleStatus'] = 'optimal';
  if (!titleText || titleText === 'My Website' || titleText.includes('[')) {
    titleStatus = 'default';
  } else if (titleLength < 30) {
    titleStatus = 'short';
  } else if (titleLength > 65) {
    titleStatus = 'long';
  }

  const metaMatch =
    html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i) ||
    html.match(/<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']\s*\/?>/i);
  const metaDescription = metaMatch ? metaMatch[1].trim() : '';
  const metaLength = metaDescription.length;

  let metaStatus: SeoAuditResult['metaStatus'] = 'optimal';
  if (!metaDescription || metaDescription.includes('[')) {
    metaStatus = 'missing';
  } else if (metaLength < 90) {
    metaStatus = 'short';
  } else if (metaLength > 170) {
    metaStatus = 'long';
  }

  const h1Matches = html.match(/<h1[\s>]/gi) || [];
  const h2Matches = html.match(/<h2[\s>]/gi) || [];
  const h1Count = h1Matches.length;
  const h2Count = h2Matches.length;
  const headingValid = h1Count === 1 && h2Count >= 1;

  const imgTags = html.match(/<img\b[^>]*>/gi) || [];
  const imagesCount = imgTags.length;
  let imagesMissingAlt = 0;
  for (const tag of imgTags) {
    const altMatch = tag.match(/\balt=["']([^"']*)["']/i);
    if (!altMatch || altMatch[1].trim().length === 0 || altMatch[1].includes('[')) {
      imagesMissingAlt += 1;
    }
  }
  const altValid = imagesCount === 0 || imagesMissingAlt === 0;

  const bracketMatches = html.match(/\[[^\]]{2,45}\]/g) || [];
  const remainingPlaceholders = Array.from(new Set(bracketMatches));

  const hasCssLink = /<link\s+rel=["']stylesheet["']\s+href=["']style\.css["']\s*\/?>/i.test(html);
  const hasDoctype = /<!DOCTYPE\s+html>/i.test(html);

  const checks = [
    titleStatus === 'optimal' || (titleLength >= 20 && !titleText.includes('[') && titleText !== 'My Website'),
    metaStatus === 'optimal' || (metaLength >= 60 && !metaDescription.includes('[')),
    headingValid,
    altValid,
  ];
  const passedChecks = checks.filter(Boolean).length;

  return {
    titleText,
    titleLength,
    titleStatus,
    metaDescription,
    metaLength,
    metaStatus,
    h1Count,
    h2Count,
    headingValid,
    imagesCount,
    imagesMissingAlt,
    altValid,
    remainingPlaceholders,
    hasCssLink,
    hasDoctype,
    passedChecks,
    totalChecks: 4,
  };
}

export function updateHeadSeoTags(html: string, newTitle: string, newDescription: string): string {
  let updated = html;

  if (/<title>[\s\S]*?<\/title>/i.test(updated)) {
    updated = updated.replace(/<title>[\s\S]*?<\/title>/i, `<title>${newTitle}</title>`);
  } else if (/<\/head>/i.test(updated)) {
    updated = updated.replace(/<\/head>/i, `  <title>${newTitle}</title>\n</head>`);
  }

  const metaTag = `<meta name="description" content="${newDescription.replace(/"/g, '&quot;')}">`;
  const hasMeta =
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i.test(updated) ||
    /<meta\s+content=["'][\s\S]*?["']\s+name=["']description["']\s*\/?>/i.test(updated);

  if (hasMeta) {
    updated = updated
      .replace(/<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i, metaTag)
      .replace(/<meta\s+content=["'][\s\S]*?["']\s+name=["']description["']\s*\/?>/i, metaTag);
  } else if (/<\/title>/i.test(updated)) {
    updated = updated.replace(/<\/title>/i, `</title>\n  ${metaTag}`);
  } else if (/<\/head>/i.test(updated)) {
    updated = updated.replace(/<\/head>/i, `  ${metaTag}\n</head>`);
  }

  return updated;
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * External addresses. There is no microos.org domain yet: everything is
 * published on GitHub Pages under TurboSosiska304. When the domain exists,
 * change the four constants below to https://microos.org/ and
 * https://wiki.microos.org/ (and Vite's base to "/"). Nothing else should
 * need to move.
 */
export const GITHUB_USER = "TurboSosiska304";
export const GITHUB_HOST = "turbososiska304.github.io";

export const SITE_BASE = "/microos-site/";
export const SITE_ORIGIN = `https://${GITHUB_HOST}`;
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`;
export const SITE_LASTMOD = "2026-11-21";

export const WIKI_URL = `https://${GITHUB_HOST}/Micro_OS/`;
export const WIKI_DEV_URL = `${WIKI_URL}dev/`;

export const REPO_URL = `https://github.com/${GITHUB_USER}/Micro_OS`;
export const SITE_REPO_URL = `https://github.com/${GITHUB_USER}/microos-site`;
export const RELEASES_URL = `${REPO_URL}/releases`;
export const DOCS_URL = `${REPO_URL}/tree/mainline/docs`;
export const LICENSE_URL = `${REPO_URL}/blob/mainline/LICENSE`;

export const RELEASE_TAG = "v0.9.0-rc1";
export const RELEASE_URL = `${REPO_URL}/releases/tag/${RELEASE_TAG}`;
export const DOWNLOAD_URL = `${REPO_URL}/releases/download/${RELEASE_TAG}/MicroOS-0.9.0-rc1.bin`;
export const X86_URL = `${REPO_URL}/releases/download/${RELEASE_TAG}/MicroOS-x86_64-0.9.0-rc1.tar.gz`;

export const OG_IMAGE_URL = `${SITE_URL}og.png`;

export const version = "0.9.0-rc1";
export const stableVersion = "0.8.0";
export const releaseDate = "21 Nov 2026";
export const kernelContract = "1.8";

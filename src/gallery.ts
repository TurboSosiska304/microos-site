/**
 * The versions of Micro OS and the works that name them. This is the single
 * source of the gallery: names and painters come from docs/release-names.md of
 * the Micro_OS tree, and no date is invented for a release that has no tag.
 */

export type VersionArt = "kandinsky";

export type VersionEntry = {
  version: string;
  name: string;
  status: "stable" | "plan";
  painter?: string;
  artwork?: string;
  year?: string;
  artNote?: string;
  date?: string;
  art?: VersionArt;
};

export const versions: VersionEntry[] = [
  {
    version: "2.0.0",
    name: "Composition",
    status: "stable",
    painter: "Wassily Kandinsky",
    artwork: "Composition VII",
    year: "1913",
    artNote: "Public Domain · Artist: Wassily Kandinsky",
    date: "25 November 2026",
    art: "kandinsky",
  },
  {
    version: "1.9.0",
    name: "",
    status: "stable",
    date: "24 November 2026",
  },
  {
    version: "1.8.0",
    name: "",
    status: "stable",
    date: "24 November 2026",
  },
  {
    version: "2.1",
    name: "Rooks",
    status: "plan",
    painter: "Savrasov",
    artwork: "The Rooks Have Come",
    year: "1871",
  },
  {
    version: "2.2",
    name: "Eternal Peace",
    status: "plan",
    painter: "Levitan",
    artwork: "Above the Eternal Peace",
    year: "1894",
  },
  {
    version: "2.3",
    name: "Pompeii",
    status: "plan",
    painter: "Bryullov",
    artwork: "The Last Day of Pompeii",
    year: "1833",
  },
  {
    version: "2.4",
    name: "Peaches",
    status: "plan",
    painter: "Serov",
    artwork: "Girl with Peaches",
    year: "1887",
  },
  {
    version: "3.0",
    name: "Ninth Wave",
    status: "plan",
    painter: "Aivazovsky",
    artwork: "The Ninth Wave",
    year: "1850",
  },
  {
    version: "4.0",
    name: "Black Square",
    status: "plan",
    painter: "Malevich",
    artwork: "Black Square",
    year: "1915",
  },
];

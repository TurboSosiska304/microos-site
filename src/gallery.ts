/**
 * The versions of Micro OS and the works that name them. This is the single
 * source of the gallery: names and painters come from docs/release-names.md of
 * the Micro_OS tree, and no date is invented for a release that has no tag.
 * Summaries say only what the tree says: the shipped major from its release
 * notes, the planned ones from the naming document and the roadmap, with
 * "plan without a date" where the tree has no content yet.
 */

export type VersionArt = "kandinsky";

export type VersionEntry = {
  version: string;
  name: string;
  status: "stable" | "plan";
  summary: { en: string; ru: string };
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
    summary: {
      en: "The machine of its user: an MMU policy the hardware enforces (SMEP and SMAP, a stack that grows on fault, no writable executable page), a fork that copies the pages instead of re-running the program (64 MiB in 0.6 ms), a group and a setuid bit, a desktop that starts with the machine, DHCP on the wire, and a stick whose second partition keeps a file through a power cut.",
      ru: "Машина своего пользователя: политику MMU держит железо (SMEP и SMAP, стек растёт по фолту, page table нельзя делать одновременно writable и executable), fork копирует страницы, а не перезапускает программу (64 МиБ за 0.6 мс), у файла есть группа, у программы — бит setuid, рабочий стол стартует вместе с машиной, DHCP даёт адрес проводу, а флешка сохраняет файл на втором разделе после отключения питания.",
    },
    painter: "Wassily Kandinsky",
    artwork: "Composition VII",
    year: "1913",
    artNote: "Public Domain · Artist: Wassily Kandinsky",
    date: "25 November 2026",
    art: "kandinsky",
  },
  {
    version: "2.1",
    name: "Rooks",
    status: "plan",
    summary: {
      en: "A plan without a date: the thaw after the major — the defects it left, the debts of docs/debts.md, and the first release a stranger runs for a month.",
      ru: "План без даты: оттепель после мажора — дефекты, которые он оставил, долги docs/debts.md и первый релиз, который посторонний держит месяц.",
    },
    painter: "Savrasov",
    artwork: "The Rooks Have Come",
    year: "1871",
  },
  {
    version: "2.2",
    name: "Eternal Peace",
    status: "plan",
    summary: {
      en: "A plan without a date: durability — a page cache a program can share, the second half of the journal and fsync, a machine left alone for years.",
      ru: "План без даты: долговечность — page cache, которым делится программа, вторая половина журнала и fsync; машина, оставленная на годы.",
    },
    painter: "Levitan",
    artwork: "Above the Eternal Peace",
    year: "1894",
  },
  {
    version: "2.3",
    name: "Pompeii",
    status: "plan",
    summary: {
      en: "A plan without a date: there is no content for this release in the roadmap yet.",
      ru: "План без даты: в роадмапе для этого релиза пока нет содержания.",
    },
    painter: "Bryullov",
    artwork: "The Last Day of Pompeii",
    year: "1833",
  },
  {
    version: "2.4",
    name: "Peaches",
    status: "plan",
    summary: {
      en: "A plan without a date: there is no content for this release in the roadmap yet.",
      ru: "План без даты: в роадмапе для этого релиза пока нет содержания.",
    },
    painter: "Serov",
    artwork: "Girl with Peaches",
    year: "1887",
  },
  {
    version: "3.0",
    name: "Ninth Wave",
    status: "plan",
    summary: {
      en: "A plan without a date: the major of the stranger — an upgrade that keeps the data and rolls back, measured compatibility, a night of fuzzing, reproducible signed images and an install a stranger can follow in ten minutes. Base applications and a named list of BSD and Linux programs arrive as packages; a beginning of a GPU is expected, not promised.",
      ru: "План без даты: мажор постороннего — обновление, которое сохраняет данные и умеет откатываться, измеренная совместимость, ночь фузинга, воспроизводимые подписанные образы и установка, по которой посторонний пройдёт за десять минут. Базовые приложения и названный список программ BSD и Linux приходят пакетами; начало GPU ожидается, но не обещано.",
    },
    painter: "Aivazovsky",
    artwork: "The Ninth Wave",
    year: "1850",
  },
  {
    version: "4.0",
    name: "Black Square",
    status: "plan",
    summary: {
      en: "A plan without a date: a reserved name for the release that ends the oldest promise — the ESP32 board, which a machine of 2.0 no longer needs. The decision is the owner's.",
      ru: "План без даты: зарезервированное имя для релиза, который закроет старейшее обещание — плату ESP32, которая машине 2.0 больше не нужна. Решение за владельцем.",
    },
    painter: "Malevich",
    artwork: "Black Square",
    year: "1915",
  },
];

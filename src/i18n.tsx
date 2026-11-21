import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "ru";

const STORAGE_KEY = "microos-lang";

const en = {
  meta: {
    title: "Micro OS — a kernel for small machines",
    description:
      "A portable C11 kernel for small machines: scheduler, syscall ABI, VFS, MicroFS and a shell on ESP32, bare metal x86-64 in QEMU and as a Linux process. Latest: v0.9.0-rc1.",
    ogTitle: "Micro OS — a kernel for small machines",
    ogDescription:
      "One portable C11 kernel. The same scheduler, VFS and shell on an ESP32 board, on bare-metal x86-64 and in a Linux process.",
    ogLocale: "en_US",
  },
  nav: {
    philosophy: "Philosophy",
    machines: "Kernel",
    architectures: "Architectures",
    timeline: "Path",
    release: "Release",
    wiki: "Wiki",
    download: "Get",
    menu: "Sections",
  },
  ui: {
    skip: "Skip to content",
    langLabel: "Language",
    themeToLight: "Switch to the light theme",
    themeToDark: "Switch to the dark theme",
    boardAlt: "Stylised drawing of the M5Stack StickC Plus2 board",
    stackLabel: "Three ports of one kernel: ESP32, x86-64 and host",
  },
  hero: {
    statusPre: "pre-release",
    statusStable: "stable",
    statusLicense: "MIT",
    titleA: "A kernel",
    titlePrefix: "for",
    titleAccent: "small",
    titleB: "machines.",
    lead: "One portable C11 kernel — scheduler, syscall ABI, VFS, MicroFS and shell — running as firmware on a board, bare metal in QEMU and as a Linux process.",
    download: "Download",
    wiki: "Read the wiki",
    facts: [
      { label: "ports", value: "4" },
      { label: "syscall contract", value: "1.8" },
      { label: "language", value: "C11" },
    ],
    stack: {
      kicker: "one kernel",
      ports: "ESP32 · x86-64 · host",
      sub: "the same scheduler, VFS and shell",
      counter: "03/04",
      ring: "ring 3",
      exec: "MOX1 · execve",
      bare: "C11 · no libc",
    },
  },
  marquee: [
    "one kernel",
    "four ports",
    "MOX1",
    "ring 3",
    "MicroFS",
    "FAT32",
    "copy-on-write fork",
    "C11",
    "telnet :23",
  ],
  philosophy: {
    kicker: "01 — philosophy",
    titleA: "Small is not",
    titleB: "a compromise.",
    lead: "A Linux-like kernel for a machine with about 100 KB of SRAM cannot be Linux. It can keep the shape of Linux — the calls, the filesystem, the shell — and leave out everything that needs a server.",
    cards: [
      {
        index: "01",
        title: "Hardware is one port",
        body: "The board is one port of several, not the project. The kernel lives above kernel/port/*.h; a second machine, x86-64 in QEMU, is the proof that it travels.",
      },
      {
        index: "02",
        title: "Plain C11 above the port",
        body: "No ESP-IDF, no FreeRTOS and no libc inside components/kernel/. A platform header or a k_port_* call above the boundary fails make integrity.",
      },
      {
        index: "03",
        title: "Small is a feature",
        body: "Compile-time flags (KERNEL_PSRAM, KERNEL_EXEC, MICRO_OS_*), slabs for small blocks, ~100 KB of internal SRAM on the board and 48 KB kept away from applications.",
      },
      {
        index: "04",
        title: "A test that needs hardware is a leak",
        body: "Kernel behaviour is tested in a Linux process, inside a real kernel task. If a kernel test needs a board, platform and portable code have been mixed.",
      },
    ],
  },
  claim: {
    kicker: "02 — the claim",
    titleA: "One kernel.",
    titleB: "Three machines.",
    lead: "The same scheduler, syscall ABI, VFS, MicroFS and shell build for a board, for bare metal and for a Linux process. Only the port changes.",
    diagram: {
      kernel: "portable kernel",
      kernelSub: "plain C11 · contract 1.8",
      kernelBody: "boot · sched · ksys · VFS · MicroFS · libc",
      boundary: "kernel/port/*.h",
      portsTitle: "one contract, three backends",
      portSubs: ["ESP-IDF · FreeRTOS", "own loader · ring 3", "Linux process"],
      footnote: "plus port_null — not a machine at all: the checks link against it.",
      checked: "checked by make integrity",
    },
  },
  architectures: {
    kicker: "03 — architectures",
    titleA: "The same core,",
    titleB: "three different machines.",
    lead: "What sits under the kernel differs. What the kernel promises does not. Each card says what works now and what is still missing, without rounding up.",
    works: "works now",
    limits: "honest limits",
    cards: [
      {
        id: "esp32",
        name: "ESP32",
        machine: "M5Stack StickC Plus2",
        stack: "ESP-IDF 5.3 · FreeRTOS · lwIP · NVS",
        specs: ["ESP32-PICO-V3-02", "240 MHz", "2 MB PSRAM", "8 MB flash", "135×240 ST7789v2"],
        works: [
          "UART and TFT console, the drivers and the hardware doctor",
          "MicroFS on the 5.75 MB partition, /etc and the init scripts",
          "Xtensa .mox images from /bin in two fixed 8 KiB windows",
          "WiFi, telnet on :23, HTTP, NTP, MQTT",
          "NVS, the RTC, the IMU and the microphone",
        ],
        limits: [
          "no MMU: fork() shares the parent's memory",
          "no protection for a .mox: a fault takes the board down",
          "text in 8 KiB IRAM and data in 8 KiB DRAM; flash itself is not executable",
          "~100 KB of internal SRAM is the real budget (factory 2 MB + MicroFS 5.75 MB of 8 MB)",
          "no OTA, IR, sound detector or enclosure modes yet",
        ],
      },
      {
        id: "x86_64",
        name: "x86-64",
        machine: "bare metal in QEMU",
        stack: "own loader · no libc under the kernel",
        specs: [
          "own 32-bit loader",
          "ring 3",
          "page tables",
          "virtio-net",
          "ATA + MBR/GPT",
          "NX / W^X",
          "smoke test",
        ],
        works: [
          "IDT/PIT, VGA text, PS/2 and COM1",
          "MicroFS on a disk that survives a reset",
          "execve, page tables, copy-on-write fork and EFAULT",
          "NX/W^X: text RX, data and stacks NX",
          "ten C programs in /bin from the disk image, with a libc",
          "ARP/IPv4/ICMP/UDP/TCP, a DNS cache and httpd",
        ],
        limits: [
          "no higher half, SMEP/SMAP or PCID yet",
          "no SMP/APIC: one core for now",
          "no TLS: LAN only",
          "the kernel has no libc under it, by design",
        ],
      },
      {
        id: "host",
        name: "host",
        machine: "a Linux process",
        stack: "unit tests · simulator · sanitizers",
        specs: ["ktest", "make sim", "ASan / TSan", "make test-minimal"],
        works: [
          "unit tests inside a real kernel task (ktest)",
          "the whole system as a process, on a 512 KB volume in a file",
          "ASan and TSan, and the smoke test of the simulator",
          "the development loop without a board, ESP-IDF or QEMU",
        ],
        limits: [
          "no hardware and no real radio",
          "execve answers ENOSYS by design",
          "the host cannot reproduce preemption; TSan is the race check",
          "not a product machine",
        ],
      },
    ],
  },
  timeline: {
    kicker: "04 — the path",
    titleA: "No dates.",
    titleB: "Tags.",
    lead: "The tags are the milestones; the tree is the source of truth. This is not a calendar.",
    items: [
      {
        version: "0.1",
        title: "The skeleton",
        body: "Boot levels, the log, panic, the description of the board and the first version of the port boundary.",
        tag: "shipped",
        planned: false,
      },
      {
        version: "0.3",
        title: "The second machine",
        body: "The contract is split by subject and versioned; x86-64 boots in QEMU with its own loader, interrupts and a shell on COM1.",
        tag: "shipped",
        planned: false,
      },
      {
        version: "0.4",
        title: "Programs",
        body: "MOX1, execve and the permissions of a file; the stable tag for programs.",
        tag: "stable",
        planned: false,
      },
      {
        version: "0.5",
        title: "The edge and the flags",
        body: "copy_from_user and EFAULT, a read-only FAT reader, compile-time flags and the wiki.",
        tag: "shipped",
        planned: false,
      },
      {
        version: "0.6",
        title: "Files and networks",
        body: "MicroFS timestamps, writable FAT12/16/32, mount and fstab, the network on x86-64.",
        tag: "shipped",
        planned: false,
      },
      {
        version: "0.7",
        title: "Pipes and signals",
        body: "pipes and dup2, signals with Ctrl+C, envp at the entry, a libc and ten programs in /bin, pipes and redirects (|, >, >>, <, 2>), ls -l with dates and tree.",
        tag: "stable",
        planned: false,
      },
      {
        version: "0.8",
        title: "Programs on disk",
        body: "programs from the disk, /proc and /etc on x86-64, fsck fat -y, ext2 read-only, NX/W^X and Xtensa .mox on the ESP32.",
        tag: "stable",
        planned: false,
      },
      {
        version: "0.9",
        title: "Frozen and measured",
        body: "higher half, MicroFS fsck -y, task limits, ABI/MOX1/port contract frozen, a reproducible image and 82% coverage, board sleep/IR/sound/factory reset, and a 600-second soak.",
        tag: "pre-release",
        planned: false,
      },
      {
        version: "1.0",
        title: "The gate",
        body: "Plan: an image signature checked by the boot, the higher half, a correct single-core kernel and four weeks of soak; migration of 0.x volumes and /etc. After 1.0: a safe update with rollback, SMP, progs and mmap on the ESP32.",
        tag: "plan",
        planned: true,
      },
    ],
  },
  features: {
    kicker: "05 — what is inside",
    titleA: "Small machine.",
    titleB: "Full system.",
    note: "shipped: in the tree, covered by tests. next: designed and planned — not shipped.",
    items: [
      {
        index: "01",
        title: "Tasks and a scheduler",
        body: "Priorities, a time slice, sleep, block and unblock, parents and children, waiting. /proc reads the task table from the same structures the scheduler runs on.",
        tag: "shipped",
        planned: false,
      },
      {
        index: "02",
        title: "A syscall ABI, frozen",
        body: "kernel/ksys.h is the only door into the kernel and its numbers are never reused. Every argument is checked at the edge — EFAULT is an answer, not a crash.",
        tag: "shipped",
        planned: false,
      },
      {
        index: "03",
        title: "MicroFS",
        body: "A filesystem of its own on a block device: the flash partition on the board, a file in the simulator. 0.6 keeps the times of a change and statx reports them; version 1 volumes still mount.",
        tag: "shipped",
        planned: false,
      },
      {
        index: "04",
        title: "MOX1, execve, ring 3, fork",
        body: "A program is a file: MOX1 v2 names its machine. On x86-64 execve builds page tables and enters ring 3 with argv and envp — a fault kills the program, not the shell. On the ESP32 a Xtensa image runs in two 8 KiB windows without an MMU, where a fault takes the board down.",
        tag: "0.8",
        planned: false,
      },
      {
        index: "05",
        title: "Features behind flags",
        body: "KERNEL_PSRAM, KERNEL_EXEC and the MICRO_OS_* switches decide what is compiled, per machine: the default x86-64 image has no network and no PSRAM; the board copies a program into IRAM because its flash is not executable. make test-minimal keeps the small build honest.",
        tag: "shipped",
        planned: false,
      },
      {
        index: "06",
        title: "Network on both machines",
        body: "HTTP client and the httpd page, NTP, MQTT publish, the shell over telnet on port 23. The board goes through lwIP and WiFi; x86-64 brings its own IPv4/TCP over virtio-net.",
        tag: "shipped",
        planned: false,
      },
      {
        index: "07",
        title: "FAT12/16/32, read and written",
        body: "Long names, files and directories, mount and umount at the console, /etc/fstab at boot. MicroFS stays the root; a FAT volume is the second filesystem, not a replacement.",
        tag: "0.6",
        planned: false,
      },
      {
        index: "08",
        title: "Many cores",
        body: "After 1.0: a run queue per core, the allocator, VFS and console safe under two cores, x86-64 AP bring-up, KERNEL_SMP. Planned, not claimed: the design is ADR 0012.",
        tag: "next",
        planned: true,
      },
    ],
  },
  console: {
    kicker: "06 — at the console",
    titleA: "A program",
    titleB: "is a file.",
    titleC: "Ring 3 is real.",
    body: "On x86-64, execve reads a MOX1 image through the VFS, builds page tables and enters ring 3. A bad pointer is EFAULT, and a fault kills the program, not the shell.",
    chips: ["MOX1", "32-byte header", "copy-on-write", "vector 14"],
    source: "Source: docs/wiki/programs.md · x86-64 in QEMU",
  },
  next: {
    kicker: "07 — what is next",
    titleA: "Now, next,",
    titleB: "and not promised.",
    lead: "A tag is cut when the tree is ready. There are no release dates on this page, and no features are promised before they pass their checks.",
    cards: [
      {
        phase: "now",
        title: "v0.9.0-rc1",
        body: "The release candidate: MicroFS fsck -y, task limits, frozen ABI/MOX1, a reproducible image and 82% coverage, board sleep/IR/sound/factory reset, and a 600-second soak. Last stable: 0.8.0.",
        status: "pre-release",
        current: true,
      },
      {
        phase: "next",
        title: "0.9.0 final",
        body: "Fixes found by the candidate, then the final of 0.9 if the checks agree. No new promises, no dates.",
        status: "plan",
        current: false,
      },
      {
        phase: "1.0",
        title: "1.0.0",
        body: "An image signature the boot checks, the higher half, a correct single-core kernel, and four weeks of soak; migration of 0.x volumes and /etc. After 1.0: a safe update with rollback, SMP, the progs partition and mmap on the ESP32. Planned, no dates.",
        status: "plan",
        current: false,
      },
    ],
  },
  docs: {
    kicker: "documentation",
    title: "The user guide is a wiki.",
    body: "Build, shell, files, programs, ports, the syscall ABI and troubleshooting. The wiki is published from the Micro_OS repository: the latest stable at the root, the development line under /dev/.",
    stable: "Wiki — latest stable",
    dev: "Wiki — dev",
    source: "Docs in the repository",
    note: "No invented pages: the links go to the root of the guide and its development line.",
  },
  release: {
    kicker: "08 — the release",
    date: "21 Nov 2026",
    pre: "pre-release",
    lastStable: "last stable",
    lead: "The first candidate of 0.9. One image for the board, one bundle for QEMU — the kernel is the same in both.",
    notes: [
      "MicroFS fsck -y repairs a broken volume; task limits cap memory, CPU and descriptors per task.",
      "The ABI, MOX1 and the port contract are written down and frozen by tests; the image reproduces byte-for-byte, and kernel coverage is 82%.",
      "The board sleeps to an alarm and wakes, has an IR transmitter and a sound detector, and a factory reset that writes the defaults of /etc back.",
      "A 600-second soak on x86-64, the ESP32 and the host (under TSan): zero errors.",
    ],
    download: "Download .bin",
    github: "GitHub release",
    assets: [
      { name: "MicroOS-0.9.0-rc1.bin", note: "the board, one image at 0x0", size: "1021 KiB" },
      { name: "MicroOS-x86_64-0.9.0-rc1.tar.gz", note: "the kernel and loader for QEMU", size: "100 KiB" },
      { name: "micro_os.bin", note: "the application image alone", size: "957 KiB" },
      { name: "flash.sh", note: "writes the image; NVS and MicroFS stay", size: "2.3 KiB" },
      { name: "checksums.txt", note: "SHA-256 of every binary", size: "334 B" },
    ],
    flash:
      "flash.sh writes the image at 0x0; NVS and MicroFS stay. The release keeps no executable bit — chmod +x first.",
    license: "license",
  },
  footer: {
    tagline:
      "A Linux-like kernel for small machines. One portable core, a port per machine, and a boundary the build checks.",
    project: "Project",
    read: "Read",
    github: "GitHub",
    releases: "Releases",
    docs: "Documentation",
    wikiStable: "Wiki — stable",
    wikiDev: "Wiki — dev",
    license: "MIT license",
    contract: "contract",
    built: "micro os — built for small machines",
    back: "back to top",
    copyright: "© 2026 Micro OS contributors",
  },
};

export type Dictionary = typeof en;

const ru: Dictionary = {
  meta: {
    title: "Micro OS — ядро для малых машин",
    description:
      "Портируемое ядро на C11 для малых машин: планировщик, ABI системных вызовов, VFS, MicroFS и shell на ESP32, на голом x86-64 в QEMU и в процессе Linux. Актуальное: v0.9.0-rc1.",
    ogTitle: "Micro OS — ядро для малых машин",
    ogDescription:
      "Одно портируемое ядро на C11. Тот же планировщик, VFS и shell на плате ESP32, на голом x86-64 и в процессе Linux.",
    ogLocale: "ru_RU",
  },
  nav: {
    philosophy: "Философия",
    machines: "Ядро",
    architectures: "Архитектуры",
    timeline: "Путь",
    release: "Релиз",
    wiki: "Вики",
    download: "Скачать",
    menu: "Разделы",
  },
  ui: {
    skip: "Перейти к содержанию",
    langLabel: "Язык",
    themeToLight: "Включить светлую тему",
    themeToDark: "Включить тёмную тему",
    boardAlt: "Стилизованный рисунок платы M5Stack StickC Plus2",
    stackLabel: "Три порта одного ядра: ESP32, x86-64 и host",
  },
  hero: {
    statusPre: "пре-релиз",
    statusStable: "стабильный",
    statusLicense: "MIT",
    titleA: "Ядро для",
    titlePrefix: "",
    titleAccent: "малых",
    titleB: "машин.",
    lead: "Одно портируемое ядро на C11 — планировщик, ABI системных вызовов, VFS, MicroFS и shell — в прошивке платы, на голом металле в QEMU и в процессе Linux.",
    download: "Скачать",
    wiki: "Открыть вики",
    facts: [
      { label: "порта", value: "4" },
      { label: "контракт syscall", value: "1.8" },
      { label: "язык", value: "C11" },
    ],
    stack: {
      kicker: "одно ядро",
      ports: "ESP32 · x86-64 · host",
      sub: "тот же планировщик, VFS и shell",
      counter: "03/04",
      ring: "ring 3",
      exec: "MOX1 · execve",
      bare: "C11 · без libc",
    },
  },
  marquee: [
    "одно ядро",
    "четыре порта",
    "MOX1",
    "ring 3",
    "MicroFS",
    "FAT32",
    "fork с copy-on-write",
    "C11",
    "telnet :23",
  ],
  philosophy: {
    kicker: "01 — философия",
    titleA: "Малый размер —",
    titleB: "не компромисс.",
    lead: "Ядро для машины с примерно 100 КБ SRAM не может быть Linux. Оно может сохранить форму Linux — вызовы, файловую систему, shell — и выбросить всё, чему нужен сервер.",
    cards: [
      {
        index: "01",
        title: "Железо — это порт",
        body: "Плата — один из портов, а не проект. Ядро живёт над kernel/port/*.h; вторая машина, x86-64 в QEMU, доказывает, что оно переносится.",
      },
      {
        index: "02",
        title: "Чистый C11 над портом",
        body: "Внутри components/kernel/ нет ESP-IDF, FreeRTOS и libc. Платформенный заголовок или вызов k_port_* выше границы валит make integrity.",
      },
      {
        index: "03",
        title: "Малый размер — фича",
        body: "Флаги сборки (KERNEL_PSRAM, KERNEL_EXEC, MICRO_OS_*), слабы для мелких блоков, около 100 КБ внутренней SRAM на плате и 48 КБ, которые не отдают приложениям.",
      },
      {
        index: "04",
        title: "Тест, которому нужно железо, — утечка",
        body: "Поведение ядра проверяется в процессе Linux, внутри настоящей задачи ядра. Если тесту ядра нужна плата, платформенный и портируемый код смешались.",
      },
    ],
  },
  claim: {
    kicker: "02 — утверждение",
    titleA: "Одно ядро.",
    titleB: "Три машины.",
    lead: "Тот же планировщик, ABI системных вызовов, VFS, MicroFS и shell собираются для платы, для голого металла и для процесса Linux. Меняется только порт.",
    diagram: {
      kernel: "портируемое ядро",
      kernelSub: "чистый C11 · контракт 1.8",
      kernelBody: "boot · sched · ksys · VFS · MicroFS · libc",
      boundary: "kernel/port/*.h",
      portsTitle: "один контракт, три бэкенда",
      portSubs: ["ESP-IDF · FreeRTOS", "свой загрузчик · ring 3", "процесс Linux"],
      footnote: "плюс port_null — вообще не машина: против него линкуются проверки.",
      checked: "проверяется make integrity",
    },
  },
  architectures: {
    kicker: "03 — архитектуры",
    titleA: "Одно ядро,",
    titleB: "три разные машины.",
    lead: "Под ядром всё разное. Обещания ядра — нет. В каждой карточке честно написано, что уже работает и чего ещё нет.",
    works: "уже работает",
    limits: "честные ограничения",
    cards: [
      {
        id: "esp32",
        name: "ESP32",
        machine: "M5Stack StickC Plus2",
        stack: "ESP-IDF 5.3 · FreeRTOS · lwIP · NVS",
        specs: ["ESP32-PICO-V3-02", "240 МГц", "2 МБ PSRAM", "8 МБ flash", "135×240 ST7789v2"],
        works: [
          "консоль на UART и TFT, драйверы и hardware doctor",
          "MicroFS на разделе 5.75 МБ, /etc и скрипты init",
          "Xtensa-образы .mox из /bin в двух фиксированных окнах по 8 КиБ",
          "Wi-Fi, telnet на :23, HTTP, NTP, MQTT",
          "NVS, RTC, IMU и микрофон",
        ],
        limits: [
          "нет MMU: fork() делит память с родителем",
          "у .mox нет защиты: падение программы валит плату",
          "text в 8 КиБ IRAM, data в 8 КиБ DRAM; сам flash не исполняемый",
          "около 100 КБ внутренней SRAM — реальный бюджет (factory 2 МБ + MicroFS 5.75 МБ из 8 МБ)",
          "пока нет OTA, ИК, детектора звука и режимов корпуса",
        ],
      },
      {
        id: "x86_64",
        name: "x86-64",
        machine: "голый металл в QEMU",
        stack: "свой загрузчик · без libc под ядром",
        specs: [
          "свой 32-битный загрузчик",
          "ring 3",
          "page tables",
          "virtio-net",
          "ATA + MBR/GPT",
          "NX / W^X",
          "smoke-тест",
        ],
        works: [
          "IDT/PIT, текстовый VGA, PS/2 и COM1",
          "MicroFS на диске, который переживает reset",
          "execve, свои page tables, fork с copy-on-write и EFAULT",
          "NX/W^X: text RX, data и стеки NX",
          "десять программ на C в /bin с диска, со своей libc",
          "ARP/IPv4/ICMP/UDP/TCP, кэш DNS и httpd",
        ],
        limits: [
          "пока нет higher half, SMEP/SMAP и PCID",
          "нет SMP/APIC: пока одно ядро",
          "нет TLS: только LAN",
          "под ядром нет libc — так задумано",
        ],
      },
      {
        id: "host",
        name: "host",
        machine: "процесс Linux",
        stack: "юнит-тесты · симулятор · санитайзеры",
        specs: ["ktest", "make sim", "ASan / TSan", "make test-minimal"],
        works: [
          "юнит-тесты внутри настоящей задачи ядра (ktest)",
          "вся система процессом, на томе 512 КБ в файле",
          "ASan и TSan, а также smoke-тест симулятора",
          "цикл разработки без платы, ESP-IDF и QEMU",
        ],
        limits: [
          "нет железа и настоящего радио",
          "execve отвечает ENOSYS — так задумано",
          "хост не воспроизводит вытеснение; гонки ловит TSan",
          "это не продуктовая машина",
        ],
      },
    ],
  },
  timeline: {
    kicker: "04 — путь",
    titleA: "Без дат.",
    titleB: "Теги.",
    lead: "Теги — это вехи, а истина — дерево. Это не календарь.",
    items: [
      {
        version: "0.1",
        title: "Скелет",
        body: "Уровни загрузки, лог, panic, описание платы и первая версия границы порта.",
        tag: "в дереве",
        planned: false,
      },
      {
        version: "0.3",
        title: "Вторая машина",
        body: "Контракт разбит по темам и версионирован; x86-64 загружается в QEMU со своим загрузчиком, прерываниями и shell на COM1.",
        tag: "в дереве",
        planned: false,
      },
      {
        version: "0.4",
        title: "Программы",
        body: "MOX1, execve и права файла; стабильный тег с программами.",
        tag: "стабильный",
        planned: false,
      },
      {
        version: "0.5",
        title: "Граница и флаги",
        body: "copy_from_user и EFAULT, FAT только на чтение, флаги сборки и вики.",
        tag: "в дереве",
        planned: false,
      },
      {
        version: "0.6",
        title: "Файлы и сети",
        body: "Метки времени MicroFS, запись FAT12/16/32, mount и fstab, сеть на x86-64.",
        tag: "в дереве",
        planned: false,
      },
      {
        version: "0.7",
        title: "Пайпы и сигналы",
        body: "pipes и dup2, сигналы с Ctrl+C, envp на входе, libc и десять программ в /bin, пайпы и редиректы (|, >, >>, <, 2>), ls -l с датами и tree.",
        tag: "stable",
        planned: false,
      },
      {
        version: "0.8",
        title: "Программы на диске",
        body: "программы с диска, /proc и /etc на x86-64, fsck fat -y, ext2 только на чтение, NX/W^X и Xtensa .mox на ESP32.",
        tag: "стабильный",
        planned: false,
      },
      {
        version: "0.9",
        title: "Заморожено и измерено",
        body: "higher half, MicroFS fsck -y, лимиты задач, заморозка ABI/MOX1/контракта порта, воспроизводимый образ и покрытие 82 %, сон/ИК/звук/factory reset на плате и 600-секундная кампания.",
        tag: "пре-релиз",
        planned: false,
      },
      {
        version: "1.0",
        title: "Ворота",
        body: "План: подпись образа, которую проверяет boot, higher half, корректное одноядерное ядро и четыре недели обкатки; миграция томов 0.x и /etc. После 1.0: безопасное обновление с rollback, SMP, раздел progs и mmap на ESP32.",
        tag: "план",
        planned: true,
      },
    ],
  },
  features: {
    kicker: "05 — что внутри",
    titleA: "Малая машина.",
    titleB: "Целая система.",
    note: "«в дереве» — есть и покрыто тестами. «дальше» — спроектировано и запланировано, но не выпущено.",
    items: [
      {
        index: "01",
        title: "Задачи и планировщик",
        body: "Приоритеты, квант времени, sleep, block и unblock, родители и дети, ожидание. /proc читает таблицу задач из тех же структур, на которых работает планировщик.",
        tag: "в дереве",
        planned: false,
      },
      {
        index: "02",
        title: "ABI системных вызовов, заморожен",
        body: "kernel/ksys.h — единственная дверь в ядро, и его номера не переиспользуются. Каждый аргумент проверяется на границе: EFAULT — это ответ, а не падение.",
        tag: "в дереве",
        planned: false,
      },
      {
        index: "03",
        title: "MicroFS",
        body: "Своя файловая система на блочном устройстве: раздел flash на плате, файл в симуляторе. В 0.6 MicroFS хранит метки времени изменения, statx их отдаёт, а тома версии 1 всё ещё монтируются.",
        tag: "в дереве",
        planned: false,
      },
      {
        index: "04",
        title: "MOX1, execve, ring 3, fork",
        body: "Программа — это файл: MOX1 v2 называет свою машину. На x86-64 execve строит page tables и входит в ring 3 с argv и envp — падение убивает программу, а не shell. На ESP32 Xtensa-образ идёт в двух окнах по 8 КиБ без MMU, и там падение валит плату.",
        tag: "0.8",
        planned: false,
      },
      {
        index: "05",
        title: "Фичи за флагами сборки",
        body: "KERNEL_PSRAM, KERNEL_EXEC и переключатели MICRO_OS_* решают, что компилируется, для каждой машины: в образе x86-64 по умолчанию нет сети и PSRAM, плата копирует программу в IRAM, потому что её flash не исполняемый. make test-minimal держит малую сборку честной.",
        tag: "в дереве",
        planned: false,
      },
      {
        index: "06",
        title: "Сеть на обеих машинах",
        body: "HTTP-клиент и страница httpd, NTP, публикация в MQTT, shell по telnet на порту 23. Плата идёт через lwIP и Wi-Fi; x86-64 приносит свой IPv4/TCP поверх virtio-net.",
        tag: "в дереве",
        planned: false,
      },
      {
        index: "07",
        title: "FAT12/16/32: чтение и запись",
        body: "Длинные имена, файлы и каталоги, mount и umount в консоли, /etc/fstab при загрузке. Корень остаётся на MicroFS; том FAT — вторая файловая система, а не замена.",
        tag: "0.6",
        planned: false,
      },
      {
        index: "08",
        title: "Много ядер",
        body: "После 1.0: очередь на каждое ядро, аллокатор, VFS и консоль, безопасные под двумя ядрами, AP bring-up на x86-64, KERNEL_SMP. Запланировано, а не заявлено: дизайн в ADR 0012.",
        tag: "дальше",
        planned: true,
      },
    ],
  },
  console: {
    kicker: "06 — в консоли",
    titleA: "Программа",
    titleB: "это файл.",
    titleC: "Ring 3 настоящий.",
    body: "На x86-64 execve читает образ MOX1 через VFS, строит page tables и входит в ring 3. Плохой указатель — это EFAULT, а падение убивает программу, а не shell.",
    chips: ["MOX1", "заголовок 32 байта", "copy-on-write", "vector 14"],
    source: "Источник: docs/wiki/programs.md · x86-64 в QEMU",
  },
  next: {
    kicker: "07 — что дальше",
    titleA: "Сейчас, дальше —",
    titleB: "и без обещаний.",
    lead: "Тег ставится, когда дерево готово. На этой странице нет дат релизов и нет фич, обещанных до того, как они прошли проверки.",
    cards: [
      {
        phase: "сейчас",
        title: "v0.9.0-rc1",
        body: "Кандидат релиза: MicroFS fsck -y, лимиты задач, заморозка ABI/MOX1, воспроизводимый образ и покрытие 82 %, сон/ИК/звук/factory reset на плате и 600-секундная кампания. Последний стабильный — 0.8.0.",
        status: "пре-релиз",
        current: true,
      },
      {
        phase: "дальше",
        title: "0.9.0 final",
        body: "Исправления, которые найдёт кандидат, затем финал 0.9, если проверки согласятся. Без новых обещаний и без дат.",
        status: "план",
        current: false,
      },
      {
        phase: "1.0",
        title: "1.0.0",
        body: "Подпись образа, которую проверяет boot, higher half, корректное одноядерное ядро и четыре недели обкатки; миграция томов 0.x и /etc. После 1.0: безопасное обновление с rollback, SMP, раздел progs и mmap на ESP32. План, без дат.",
        status: "план",
        current: false,
      },
    ],
  },
  docs: {
    kicker: "документация",
    title: "Руководство — это вики.",
    body: "Сборка, shell, файлы, программы, порты, ABI системных вызовов и разбор ошибок. Вики публикуется из репозитория Micro_OS: последняя стабильная версия в корне, линия разработки — в /dev/.",
    stable: "Вики — последняя стабильная",
    dev: "Вики — dev",
    source: "Документация в репозитории",
    note: "Без выдуманных страниц: ссылки ведут в корень руководства и на линию разработки.",
  },
  release: {
    kicker: "08 — релиз",
    date: "21 ноя 2026",
    pre: "пре-релиз",
    lastStable: "последний стабильный релиз",
    lead: "Первый кандидат 0.9. Один образ для платы, один архив для QEMU — ядро в них одно и то же.",
    notes: [
      "MicroFS fsck -y чинит сломанный том; лимиты задач ограничивают память, CPU и дескрипторы на задачу.",
      "ABI, MOX1 и контракт порта записаны и заморожены тестами; образ воспроизводится байт-в-байт, покрытие ядра — 82 %.",
      "Плата засыпает до будильника и просыпается, у неё есть ИК-передатчик и детектор звука, а factory reset возвращает значения /etc по умолчанию.",
      "600-секундная кампания на x86-64, ESP32 и host (под TSan): ноль ошибок.",
    ],
    download: "Скачать .bin",
    github: "Релиз на GitHub",
    assets: [
      { name: "MicroOS-0.9.0-rc1.bin", note: "плата, один образ по адресу 0x0", size: "1021 КиБ" },
      { name: "MicroOS-x86_64-0.9.0-rc1.tar.gz", note: "ядро и загрузчик для QEMU", size: "100 КиБ" },
      { name: "micro_os.bin", note: "образ приложения отдельно", size: "957 КиБ" },
      { name: "flash.sh", note: "пишет образ; NVS и MicroFS остаются", size: "2.3 КиБ" },
      { name: "checksums.txt", note: "SHA-256 каждого бинарника", size: "334 Б" },
    ],
    flash:
      "flash.sh пишет образ по адресу 0x0; NVS и MicroFS остаются. В релизе нет бита исполнения — сначала chmod +x.",
    license: "лицензия",
  },
  footer: {
    tagline:
      "Linux-подобное ядро для малых машин. Одно портируемое ядро, порт на каждую машину и граница, которую проверяет сборка.",
    project: "Проект",
    read: "Читать",
    github: "GitHub",
    releases: "Релизы",
    docs: "Документация",
    wikiStable: "Вики — стабильная",
    wikiDev: "Вики — dev",
    license: "Лицензия MIT",
    contract: "контракт",
    built: "micro os — сделано для малых машин",
    back: "наверх",
    copyright: "© 2026 Участники Micro OS",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ru };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function preferredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ru" || saved === "en") return saved;
  } catch {
    // Private mode can refuse storage; English is the project default.
  }
  // English is the project's first language. A Russian browser does not
  // change that: only an explicit choice in the switch does.
  return "en";
}

function setMeta(name: string, value: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = value;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(preferredLocale);
  const t = dictionaries[locale];

  useLayoutEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dataset.lang = locale;
    document.title = t.meta.title;
    setMeta("description", t.meta.description);
    setMeta("og:title", t.meta.ogTitle, true);
    setMeta("og:description", t.meta.ogDescription, true);
    setMeta("og:locale", t.meta.ogLocale, true);
    setMeta("twitter:title", t.meta.ogTitle);
    setMeta("twitter:description", t.meta.ogDescription);
  }, [locale, t]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice still applies for this visit.
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ru" : "en");
  }, [locale, setLocale]);

  const value = useMemo(
    () => ({ locale, setLocale, toggleLocale, t }),
    [locale, setLocale, toggleLocale, t],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

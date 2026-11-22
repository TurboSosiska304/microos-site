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
      "A portable C11 kernel for small machines: scheduler, syscall ABI, VFS, MicroFS and a shell on ESP32 and bare-metal x86-64, with a Linux-process test substrate. Latest: v1.2.0.",
    ogTitle: "Micro OS — a kernel for small machines",
    ogDescription:
      "One portable C11 kernel. The same scheduler, VFS and shell on an ESP32 board and bare-metal x86-64; the Linux process is the test substrate.",
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
    stackLabel: "Two machines and a test substrate: ESP32, x86-64, host",
  },
  hero: {
    statusStable: "stable",
    statusLicense: "MIT",
    titleA: "A kernel",
    titlePrefix: "for",
    titleAccent: "small",
    titleB: "machines.",
    lead: "One portable C11 kernel — scheduler, syscall ABI, VFS, MicroFS and shell — on two machines: firmware on a board, bare metal in QEMU. The Linux process is the test substrate.",
    download: "Download",
    wiki: "Read the wiki",
    facts: [
      { label: "machines", value: "2" },
      { label: "syscall contract", value: "1.9" },
      { label: "test substrate", value: "host" },
    ],
    stack: {
      kicker: "one kernel",
      ports: "ESP32 · x86-64",
      sub: "two machines · one test substrate",
      counter: "02 + host",
      ring: "ring 3",
      exec: "MOX1 · execve",
      bare: "C11 · no libc",
    },
  },
  marquee: [
    "one kernel",
    "two machines",
    "host substrate",
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
        title: "Hardware is one machine",
        body: "The board is one of two machines, not the project. The kernel lives above kernel/port/*.h; x86-64 in QEMU is the proof that it travels.",
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
    titleB: "Two machines.",
    lead: "The same scheduler, syscall ABI, VFS, MicroFS and shell build for a board and for bare metal. The Linux process is not a third machine: it is the host substrate where the tests and the simulator run. Only the port changes.",
    diagram: {
      kernel: "portable kernel",
      kernelSub: "plain C11 · contract 1.9",
      kernelBody: "boot · sched · ksys · VFS · MicroFS · libc",
      boundary: "kernel/port/*.h",
      portsTitle: "one contract, two machines + host",
      portSubs: ["ESP-IDF · FreeRTOS", "own loader · ring 3", "host · test substrate"],
      footnote: "plus port_null — not a machine at all: the checks link against it.",
      checked: "checked by make integrity",
    },
  },
  architectures: {
    kicker: "03 — architectures",
    titleA: "The same core,",
    titleB: "two machines and a test substrate.",
    lead: "What sits under the kernel differs. ESP32 and x86-64 are the machines; the host is the Linux process where the tests, simulator, sanitizers and coverage run. The third card is the test substrate, not a product target.",
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
          "IDT/PIT, a 1280x800 framebuffer, PS/2 and COM1",
          "higher half at 0xFFFFFFFF80000000",
          "MicroFS on a disk that survives a reset",
          "execve, page tables, copy-on-write fork and EFAULT",
          "NX/W^X: text RX, data and stacks NX",
          "programs in /bin from the disk, with a libc, zlib, sbase, PCRE2 and Lua",
          "ARP/IPv4/ICMP/UDP/TCP, a DNS cache, httpd, wget over TLS and pkg",
        ],
        limits: [
          "no SMEP/SMAP or PCID yet",
          "one core: the AP bring-up is 1.3.0",
          "mbedTLS is a client: no server, no CRL or client certificate",
          "the kernel has no libc under it, by design",
        ],
      },
      {
        id: "host",
        name: "host — the test substrate",
        machine: "a Linux process · not a machine",
        stack: "unit tests · simulator · sanitizers",
        specs: ["ktest", "make sim", "ASan / TSan / valgrind", "coverage"],
        works: [
          "unit tests inside a real kernel task (ktest)",
          "the whole system as a process, on a 512 KB volume in a file",
          "ASan, TSan and valgrind; line coverage of the kernel",
          "the development loop without a board, ESP-IDF or QEMU",
        ],
        limits: [
          "not a machine and not a product target",
          "no hardware and no real radio",
          "execve answers ENOSYS by design",
          "the host cannot reproduce preemption; TSan is the race check",
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
        title: "The first major",
        body: "Contracts frozen, two machines, signed images with SHA-256 and Ed25519, and 600-second sessions on x86-64, the board and the host.",
        tag: "stable",
        planned: false,
      },
      {
        version: "1.1",
        title: "The board, set by a person",
        body: "The settings of /etc, /bin as a programs partition, an update over USB with a rollback, and the first phase of many cores.",
        tag: "stable",
        planned: false,
      },
      {
        version: "1.2",
        title: "Seen and fed",
        body: "A real screen on x86-64, a stream and HTTPS, pkg and signed packages, a BIOS ISO, a tar that is the machine, sbase as the canonical /bin, and zlib, PCRE2, Lua and bc/dc.",
        tag: "stable",
        planned: false,
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
        body: "HTTP client and the httpd page, NTP, MQTT publish, the shell over telnet on port 23. The board goes through lwIP and WiFi; x86-64 brings its own IPv4/TCP over virtio-net, a streaming wget, mbedTLS with HTTPS and pkg over a signed index.",
        tag: "1.2",
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
        body: "The first phase is in the tree: a run queue per core, the host on two cores under TSan, and the processor list of the ACPI on x86-64. The AP bring-up is 1.3.0, not claimed before it passes.",
        tag: "next",
        planned: true,
      },
      {
        index: "09",
        title: "A real screen",
        body: "x86-64 draws into a linear framebuffer of 1280x800: 160x50 cells of an 8x16 font, a colour per cell, SGR sequences and the colours of /etc/console. A machine without the interface keeps the text mode of the VGA.",
        tag: "1.2",
        planned: false,
      },
      {
        index: "10",
        title: "The commands of the machine",
        body: "The tools of sbase are /bin/cat, grep, head, ls, tail, wc, sort, find, xargs and sed under their own names, and the shell looks a bare name in PATH first; ls --color paints a directory blue and an executable green. bc and dc calculate, Lua runs, and microos-progs publishes them with a signed index.",
        tag: "1.2",
        planned: false,
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
        title: "v1.2.0",
        body: "A real screen on x86-64, a stream and HTTPS, pkg with signed packages, a BIOS ISO, a tar that is the whole machine, and zlib, sbase, PCRE2 and Lua in /bin. The shell fixes of 1.1.2 are inside.",
        status: "stable",
        current: true,
      },
      {
        phase: "next",
        title: "1.3",
        body: "The second core: the AP bring-up of x86-64, the local APIC timer, the I/O APIC and the locks of the allocator, the VFS and the console under two cores (ADR 0012), and the ports that wait for it: SQLite, zstd, file and awk. Planned, no dates.",
        status: "plan",
        current: false,
      },
      {
        phase: "2.0",
        title: "A user-managed machine",
        body: "The next major belongs to its user. Planned, no dates.",
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
    date: "23 Nov 2026",
    lead: "A real screen on x86-64, a stream and an installer of signed programs, a bootable ISO, a tar that is the whole machine, and the first ports of other people's programs.",
    notes: [
      "The screen: a linear framebuffer of 1280x800 with 160x50 cells of an 8x16 font, font.line_gap of /etc/font, a colour per cell and the SGR sequences of a terminal; a machine without the interface keeps the text mode of 80x25 (ADR 0023).",
      "The network: a streaming wget with Range resume, pkg over a signed index with an atomic rename, and mbedTLS 3.6.2 with HTTPS, the roots of /etc/ssl/certs.pem and the clock of NTP as part of the trust (ADR 0024).",
      "A BIOS ISO (El Torito) with the root image as a read-only module, and make x86-user: the release tar is unpacked and started, so the artifact a person downloads is the machine that runs (ADR 0026).",
      "The ports: the ten tools of sbase are the canonical /bin/cat, grep, head, ls, tail, wc, sort, find, xargs and sed (PATH-first, ls --color), with zlib's /bin/zcat, PCRE2's /bin/pcre2grep, Lua 5.4.7 as /bin/lua and bc/dc 7.2.0 as /bin/bc and /bin/dc; an image of a program is now up to 8 MiB.",
      "The programs are published in microos-progs, a public repository with a signed index and the key microos-progs.pub. The shell fixes of 1.1.2 are inside. The board stays the compatibility port of ADR 0018; the second core and SQLite, zstd, file and awk are 1.3.0, not this release.",
    ],
    download: "Download .bin",
    github: "GitHub release",
    progs: "Programs repository",
    // The sizes are placeholders: they are filled from `make bundle` of the
    // 1.2.0 tree, together with the final `dist/` of the release.
    assets: [
      { name: "MicroOS-1.2.0.bin", note: "the board, one image at 0x0", size: "TBD" },
      { name: "MicroOS-x86_64-1.2.0.tar.gz", note: "the whole x86-64 machine: kernel, loader, disk and run.sh", size: "TBD" },
      { name: "micro_os.bin", note: "the application image alone", size: "TBD" },
      { name: "progs.bin", note: "the programs of /bin, a partition", size: "TBD" },
      { name: "ota_usb.py", note: "an update into the other slot, with a rollback", size: "TBD" },
      { name: "MicroOS-1.2.0.bin.sig", note: "Ed25519 signature of the board image", size: "TBD" },
      { name: "microos-sign.pub", note: "the public key", size: "TBD" },
      { name: "flash.sh", note: "writes the image; the NVS stays", size: "TBD" },
      { name: "checksums.txt", note: "SHA-256 of every binary", size: "TBD" },
    ],
    flash:
      "flash.sh writes the image at 0x0; the NVS stays. A board of 1.0 loses its MicroFS volume once at the move: back it up, then use --erase-volume or mkfs -y. The x86-64 tar carries the disk and run.sh; the ISO is built with make x86-iso. The release keeps no executable bit — chmod +x first.",
    license: "license",
  },
  footer: {
    tagline:
      "A Linux-like kernel for small machines. One portable core, two machines, a test substrate, and a boundary the build checks.",
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
      "Портируемое ядро на C11 для малых машин: планировщик, ABI системных вызовов, VFS, MicroFS и shell на ESP32 и на голом x86-64; процесс Linux — тестовый субстрат. Актуальное: v1.2.0.",
    ogTitle: "Micro OS — ядро для малых машин",
    ogDescription:
      "Одно портируемое ядро на C11. Тот же планировщик, VFS и shell на плате ESP32 и на голом x86-64; процесс Linux — субстрат тестов.",
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
    stackLabel: "Две машины и субстрат тестов: ESP32, x86-64, host",
  },
  hero: {
    statusStable: "стабильный",
    statusLicense: "MIT",
    titleA: "Ядро для",
    titlePrefix: "",
    titleAccent: "малых",
    titleB: "машин.",
    lead: "Одно портируемое ядро на C11 — планировщик, ABI системных вызовов, VFS, MicroFS и shell — на двух машинах: прошивка платы и голый металл в QEMU. Процесс Linux — субстрат тестов.",
    download: "Скачать",
    wiki: "Открыть вики",
    facts: [
      { label: "машины", value: "2" },
      { label: "контракт syscall", value: "1.9" },
      { label: "субстрат тестов", value: "host" },
    ],
    stack: {
      kicker: "одно ядро",
      ports: "ESP32 · x86-64",
      sub: "две машины · один субстрат тестов",
      counter: "02 + host",
      ring: "ring 3",
      exec: "MOX1 · execve",
      bare: "C11 · без libc",
    },
  },
  marquee: [
    "одно ядро",
    "две машины",
    "субстрат тестов",
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
        title: "Железо — одна машина",
        body: "Плата — одна из двух машин, а не проект. Ядро живёт над kernel/port/*.h; x86-64 в QEMU доказывает, что оно переносится.",
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
    titleB: "Две машины.",
    lead: "Тот же планировщик, ABI системных вызовов, VFS, MicroFS и shell собираются для платы и для голого металла. Процесс Linux — не третья машина, а host-субстрат для тестов и симулятора. Меняется только порт.",
    diagram: {
      kernel: "портируемое ядро",
      kernelSub: "чистый C11 · контракт 1.9",
      kernelBody: "boot · sched · ksys · VFS · MicroFS · libc",
      boundary: "kernel/port/*.h",
      portsTitle: "один контракт, две машины + host",
      portSubs: ["ESP-IDF · FreeRTOS", "свой загрузчик · ring 3", "host · субстрат тестов"],
      footnote: "плюс port_null — вообще не машина: против него линкуются проверки.",
      checked: "проверяется make integrity",
    },
  },
  architectures: {
    kicker: "03 — архитектуры",
    titleA: "Одно ядро,",
    titleB: "две машины и субстрат тестов.",
    lead: "Под ядром всё разное. ESP32 и x86-64 — машины; host — процесс Linux, где идут тесты, симулятор, санитайзеры и coverage. Третья карточка — субстрат тестов, а не продуктовая цель.",
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
          "IDT/PIT, framebuffer 1280x800, PS/2 и COM1",
          "higher half по адресу 0xFFFFFFFF80000000",
          "MicroFS на диске, который переживает reset",
          "execve, свои page tables, fork с copy-on-write и EFAULT",
          "NX/W^X: text RX, data и стеки NX",
          "программы в /bin с диска: своя libc, zlib, sbase, PCRE2 и Lua",
          "ARP/IPv4/ICMP/UDP/TCP, кэш DNS, httpd, wget по TLS и pkg",
        ],
        limits: [
          "пока нет SMEP/SMAP и PCID",
          "одно ядро: AP bring-up — это 1.3.0",
          "mbedTLS — клиент: нет сервера, CRL и клиентского сертификата",
          "под ядром нет libc — так задумано",
        ],
      },
      {
        id: "host",
        name: "host — субстрат тестов",
        machine: "процесс Linux · не машина",
        stack: "юнит-тесты · симулятор · санитайзеры",
        specs: ["ktest", "make sim", "ASan / TSan / valgrind", "coverage"],
        works: [
          "юнит-тесты внутри настоящей задачи ядра (ktest)",
          "вся система процессом, на томе 512 КБ в файле",
          "ASan, TSan и valgrind; покрытие строк ядра",
          "цикл разработки без платы, ESP-IDF и QEMU",
        ],
        limits: [
          "не машина и не продуктовая цель",
          "нет железа и настоящего радио",
          "execve отвечает ENOSYS — так задумано",
          "хост не воспроизводит вытеснение; гонки ловит TSan",
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
        title: "Первый мажор",
        body: "Контракты заморожены, две машины, подписанные образы SHA-256 и Ed25519 и 600-секундные сессии на x86-64, плате и host.",
        tag: "stable",
        planned: false,
      },
      {
        version: "1.1",
        title: "Плата, которую настраивает человек",
        body: "Настройки /etc, /bin как раздел программ, обновление по USB с откатом и первая фаза многих ядер.",
        tag: "стабильный",
        planned: false,
      },
      {
        version: "1.2",
        title: "Видно и можно кормить",
        body: "Настоящий экран на x86-64, поток и HTTPS, pkg с подписанными пакетами, BIOS ISO, tar, который и есть машина, sbase как канонический /bin и zlib, PCRE2, Lua и bc/dc.",
        tag: "стабильный",
        planned: false,
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
        body: "HTTP-клиент и страница httpd, NTP, публикация в MQTT, shell по telnet на порту 23. Плата идёт через lwIP и Wi-Fi; x86-64 приносит свой IPv4/TCP поверх virtio-net, потоковый wget, mbedTLS с HTTPS и pkg поверх подписанного индекса.",
        tag: "1.2",
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
        body: "Первая фаза в дереве: очередь на каждое ядро, host на двух ядрах под TSan и список процессоров ACPI на x86-64. AP bring-up — это 1.3.0, без обещаний до проверок.",
        tag: "дальше",
        planned: true,
      },
      {
        index: "09",
        title: "Настоящий экран",
        body: "x86-64 рисует в линейный framebuffer 1280x800: 160x50 ячеек шрифта 8x16, цвет на ячейку, SGR-последовательности и цвета /etc/console. Машина без интерфейса сохраняет текстовый режим VGA.",
        tag: "1.2",
        planned: false,
      },
      {
        index: "10",
        title: "Команды машины",
        body: "Инструменты sbase — это /bin/cat, grep, head, ls, tail, wc, sort, find, xargs и sed под своими именами, а shell ищет голое имя сначала в PATH; ls --color красит каталог синим, исполняемый файл — зелёным. bc и dc считают, Lua исполняет, а microos-progs публикует их с подписанным индексом.",
        tag: "1.2",
        planned: false,
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
        title: "v1.2.0",
        body: "Настоящий экран на x86-64, поток и HTTPS, pkg с подписанными пакетами, BIOS ISO, tar, который и есть вся машина, и zlib, sbase, PCRE2 и Lua в /bin. Внутри — фиксы оболочки из 1.1.2.",
        status: "стабильный",
        current: true,
      },
      {
        phase: "дальше",
        title: "1.3",
        body: "Второе ядро: AP bring-up на x86-64, local APIC timer, I/O APIC и блокировки аллокатора, VFS и консоли под двумя ядрами (ADR 0012), и порты, которые его ждут: SQLite, zstd, file и awk. План, без дат.",
        status: "план",
        current: false,
      },
      {
        phase: "2.0",
        title: "Машина пользователя",
        body: "Следующий мажор: машиной управляет пользователь. План, без дат.",
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
    date: "23 ноя 2026",
    lead: "Настоящий экран на x86-64, поток и установщик подписанных программ, загрузочный ISO, tar, который и есть машина, и первые порты чужих программ.",
    notes: [
      "Экран: линейный framebuffer 1280x800, 160x50 ячеек шрифта 8x16, font.line_gap из /etc/font, цвет на ячейку и SGR-последовательности терминала; машина без интерфейса сохраняет текстовый режим 80x25 (ADR 0023).",
      "Сеть: потоковый wget с продолжением по Range, pkg поверх подписанного индекса с атомарным rename и mbedTLS 3.6.2 с HTTPS, корнями /etc/ssl/certs.pem и часами NTP как частью доверия (ADR 0024).",
      "BIOS ISO (El Torito) с корневым образом как read-only модулем и make x86-user: tar релиза распаковывается и запускается, так что скачанный артефакт — это и есть работающая машина (ADR 0026).",
      "Порты: десять инструментов sbase — это канонические /bin/cat, grep, head, ls, tail, wc, sort, find, xargs и sed (PATH-first, ls --color), плюс /bin/zcat из zlib, /bin/pcre2grep из PCRE2, Lua 5.4.7 как /bin/lua и bc/dc 7.2.0 как /bin/bc и /bin/dc; образ программы теперь до 8 MiB.",
      "Программы публикуются в microos-progs — публичном репозитории с подписанным индексом и ключом microos-progs.pub. Внутри — фиксы оболочки из 1.1.2. Плата остаётся compatibility-портом ADR 0018; второе ядро, а также SQLite, zstd, file и awk — это 1.3.0, а не этот релиз.",
    ],
    download: "Скачать .bin",
    github: "Релиз на GitHub",
    progs: "Репозиторий программ",
    assets: [
      { name: "MicroOS-1.2.0.bin", note: "плата, один образ по адресу 0x0", size: "TBD" },
      { name: "MicroOS-x86_64-1.2.0.tar.gz", note: "вся машина x86-64: ядро, загрузчик, диск и run.sh", size: "TBD" },
      { name: "micro_os.bin", note: "образ приложения отдельно", size: "TBD" },
      { name: "progs.bin", note: "программы /bin, раздел", size: "TBD" },
      { name: "ota_usb.py", note: "обновление в другой слот, с откатом", size: "TBD" },
      { name: "MicroOS-1.2.0.bin.sig", note: "подпись Ed25519 образа платы", size: "TBD" },
      { name: "microos-sign.pub", note: "публичный ключ", size: "TBD" },
      { name: "flash.sh", note: "пишет образ; NVS остаётся", size: "TBD" },
      { name: "checksums.txt", note: "SHA-256 каждого бинарника", size: "TBD" },
    ],
    flash:
      "flash.sh пишет образ по адресу 0x0; NVS остаётся. Плата 1.0 теряет том MicroFS один раз при переезде: сделайте backup, затем --erase-volume или mkfs -y. В tar x86-64 лежат диск и run.sh; ISO собирается через make x86-iso. В релизе нет бита исполнения — сначала chmod +x.",
    license: "лицензия",
  },
  footer: {
    tagline:
      "Linux-подобное ядро для малых машин. Одно портируемое ядро, две машины, субстрат тестов и граница, которую проверяет сборка.",
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

export const REPO_URL = "https://github.com/TurboSosiska304/Micro_OS";
export const RELEASE_TAG = "v0.6.0-rc1";
export const RELEASE_URL = `${REPO_URL}/releases/tag/${RELEASE_TAG}`;
export const DOWNLOAD_URL = `${REPO_URL}/releases/download/${RELEASE_TAG}/MicroOS-0.6.0-rc1.bin`;
export const X86_URL = `${REPO_URL}/releases/download/${RELEASE_TAG}/MicroOS-x86_64-0.6.0-rc1.tar.gz`;
export const WIKI_URL = "https://wiki.microos.org";

export const version = "0.6.0-rc1";
export const stableVersion = "0.4.0";
export const releaseDate = "21 Nov 2026";
export const kernelContract = "1.6";

export const tagline = "A kernel for small machines.";

export const standfirst =
  "One portable C11 kernel — scheduler, syscall ABI, VFS, MicroFS and shell — " +
  "running as firmware on a board, bare metal in QEMU and as a Linux process.";

export const ports = [
  {
    id: "esp32",
    index: "01",
    name: "ESP32",
    kicker: "the board",
    machine: "M5Stack StickC Plus2",
    stack: "ESP-IDF 5.3 · FreeRTOS · lwIP · NVS",
    facts: ["240 MHz", "2 MB PSRAM", "8 MB flash", "135×240 TFT"],
    body: "The console on UART and on the TFT, MicroFS on the flash, WiFi, telnet on port 23, HTTP, NTP and MQTT. No MMU: fork shares the parent's memory.",
    tone: "green",
  },
  {
    id: "x86_64",
    index: "02",
    name: "x86-64",
    kicker: "the proof",
    machine: "bare metal in QEMU",
    stack: "own loader · no libc under the kernel",
    facts: ["ring 3 programs", "page tables", "copy-on-write fork", "virtio-net"],
    body: "The machine that proves portability. It loads MOX1 images into their own address space, runs them in ring 3, and has an IPv4/TCP stack of its own.",
    tone: "cyan",
  },
  {
    id: "host",
    index: "03",
    name: "host",
    kicker: "the loop",
    machine: "a Linux process",
    stack: "unit tests · simulator · MicroFS in a file",
    facts: ["make test", "make sim", "make ci", "no hardware"],
    body: "Where the kernel is developed and checked first: the test suite and the whole system on a file volume, with the same scheduler, VFS and shell as the board.",
    tone: "amber",
  },
] as const;

export const features = [
  {
    index: "01",
    title: "Tasks and a scheduler",
    body: "Priorities, a time slice, sleep, block and unblock, parents and children, waiting. /proc reads the task table from the same structures the scheduler runs on.",
    tag: "shipped",
  },
  {
    index: "02",
    title: "A syscall ABI, frozen",
    body: "kernel/ksys.h is the only door into the kernel and its numbers are never reused. Every argument is checked at the edge — EFAULT is an answer, not a crash.",
    tag: "shipped",
  },
  {
    index: "03",
    title: "MicroFS",
    body: "A filesystem of its own on a block device: the flash partition on the board, a file in the simulator. 0.6 keeps the moments of a change and statx reports them; version 1 volumes still mount.",
    tag: "shipped",
  },
  {
    index: "04",
    title: "MOX1, execve, ring 3, fork",
    body: "A program is a file: a 32-byte header, code and data. On x86-64 execve builds page tables, enters ring 3 and waits for the exit status; fork copies on write. A fault kills the program, not the shell.",
    tag: "x86-64",
  },
  {
    index: "05",
    title: "Features behind flags",
    body: "KERNEL_PSRAM, KERNEL_EXEC and the MICRO_OS_* switches decide what is compiled, per machine: no network and no PSRAM on x86-64, no executable flash on the board. make test-minimal keeps the small build honest.",
    tag: "shipped",
  },
  {
    index: "06",
    title: "Network on both machines",
    body: "HTTP client and the httpd page, NTP, MQTT publish, the shell over telnet on port 23. The board goes through lwIP and WiFi; x86-64 brings its own IPv4/TCP over virtio-net.",
    tag: "shipped",
  },
  {
    index: "07",
    title: "FAT12/16/32, read and written",
    body: "Long names, files and directories, mount and umount at the console, /etc/fstab at boot. MicroFS stays the root; a FAT volume is the second filesystem, not a replacement.",
    tag: "0.6",
  },
  {
    index: "08",
    title: "Many cores",
    body: "A run queue per core, the allocator, VFS and console safe under two cores, x86-64 AP bring-up, KERNEL_SMP. Planned, not claimed: the design is ADR 0012.",
    tag: "next",
  },
] as const;

export const release = {
  version,
  date: releaseDate,
  stable: stableVersion,
  tag: RELEASE_TAG,
  assets: [
    { name: "MicroOS-0.6.0-rc1.bin", note: "the board, one image at 0x0", size: "972 KiB" },
    { name: "MicroOS-x86_64-0.6.0-rc1.tar.gz", note: "the kernel and loader for QEMU", size: "78 KiB" },
    { name: "flash.sh", note: "writes the image; NVS and MicroFS stay", size: "2.3 KiB" },
    { name: "checksums.txt", note: "SHA-256 of every binary", size: "334 B" },
  ],
  notes: [
    "MicroFS keeps the moments of a change; statx reports them, and a version 1 volume still mounts.",
    "FAT12/16/32 is read and written, long names included; /etc/fstab and mount/umount are at the console.",
    "The x86-64 machine has a virtio-net card and its own IPv4/TCP stack.",
  ],
} as const;

export const footerLinks = {
  wiki: WIKI_URL,
  github: REPO_URL,
  releases: `${REPO_URL}/releases`,
  license: `${REPO_URL}/blob/mainline/LICENSE`,
  docs: `${REPO_URL}/tree/mainline/docs`,
};

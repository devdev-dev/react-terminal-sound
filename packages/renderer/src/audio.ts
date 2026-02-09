function beep() {
  process.stdout.write("\x07")
}

export { beep }

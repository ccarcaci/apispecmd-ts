const idGenerator = (): string => Math.random().toString(16)
  .substr(2, 5)

export { idGenerator }

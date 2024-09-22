export function pascalize(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[-_\s]/g)
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join("")
}

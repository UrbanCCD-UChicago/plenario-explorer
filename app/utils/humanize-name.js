export default function humanizeName(name) {
  return name.replace(/_/g, ' ')
    .replace(/(\w+)/g, match => match.charAt(0).toUpperCase() + match.slice(1));
}

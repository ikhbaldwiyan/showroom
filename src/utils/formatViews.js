export default function formatViews(str) {
  const nf = new Intl.NumberFormat();
  const formatView = nf.format(str);
  const views = formatView.replace(/,/g, ".");

  return views;
}

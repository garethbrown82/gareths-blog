export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('gb-EN', { year: 'numeric', month: 'long', day: 'numeric' });
}

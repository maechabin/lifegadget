export function formatDate(date: string): string {
  const dividedDate = date.split('T')[0].split('-');
  return `${dividedDate[0]}年${dividedDate[1]}月${dividedDate[2]}日`;
}
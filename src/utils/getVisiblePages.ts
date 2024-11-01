export const getVisiblePages = (pages: number, currentPage: number) => {
  const visiblePages = [];
  const maxVisiblePages = 5;

  if (pages <= maxVisiblePages) {
    for (let i = 1; i <= pages; i++) {
      visiblePages.push(i);
    }
  } else {
    if (currentPage === 1) {
      for (let i = 1; i <= 5; i++) {
        visiblePages.push(i);
      }
      visiblePages.push('...');
    } else if (currentPage === 2) {
      for (let i = 1; i <= 5; i++) {
        visiblePages.push(i);
      }
      visiblePages.push('...');
    } else if (currentPage <= 5) {
      for (let i = 1; i <= 5; i++) {
        visiblePages.push(i);
      }
      visiblePages.push('...');
    } else if (currentPage === 6) {
      visiblePages.push(1, '...', 3, 4, 5, 6);
    } else if (currentPage >= pages - 2) {
      visiblePages.push('...', pages - 4, pages - 3, pages - 2, pages - 1, pages);
    } else {
      visiblePages.push(1);
      visiblePages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        visiblePages.push(i);
      }
      visiblePages.push('...');
      visiblePages.push(pages);
    }
  }

  return visiblePages;
};

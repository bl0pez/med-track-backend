interface Props {
  page: number;
  rowsPerPage: number;
  count: number;
  totalCount: number;
}

export const createPagination = ({
  page = 1,
  rowsPerPage,
  count,
  totalCount,
}: Props) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const totalFilteredPages = Math.ceil(totalCount / rowsPerPage);

  return {
    totalPages: totalPages || 1,
    totalFilteredPages: totalFilteredPages || 1,
    currentPage: page,
    rowsPerPage,
    totalRows: count,
    totalItems: totalCount,
    nextPage: totalPages > page + 1 ? page + 1 : totalPages - 1,
    prevPage: page > 1 ? page - 1 : null,
  };
};

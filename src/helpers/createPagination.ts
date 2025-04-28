interface Props {
  page: number;
  rowsPerPage: number;
  count: number;
  totalCount: number;
}

export const createPagination = ({
  page,
  rowsPerPage,
  count,
  totalCount,
}: Props) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const totalFilteredPages = Math.ceil(count / rowsPerPage);

  console.log(page, totalPages);
  console.log(totalPages < page ? null : page + 1);

  return {
    totalPages: totalPages || 1,
    totalFilteredPages: totalFilteredPages || 1,
    currentPage: page,
    rowsPerPage,
    totalRows: count,
    totalItems: totalCount,
    nextPage: totalPages <= page ? null : page + 1,
    prevPage: page > 1 ? page - 1 : null,
  };
};

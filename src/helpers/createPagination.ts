interface Props {
    page: number;       
    rowsPerPage: number;
    count: number;
}

export const createPagination = ({ page = 0, rowsPerPage, count }: Props) => {
    const totalPages = Math.ceil(count / rowsPerPage);

    return {
        totalPages: totalPages || 1,
        currentPage: page,
        rowsPerPage,
        totalRows: count,
        nextPage: totalPages > page + 1 ? page + 1 : null,
        prevPage: page > 0 ? page - 1 : null,
    };
};
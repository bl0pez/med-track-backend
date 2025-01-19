interface Props {
    page: number;
    take: number;
    count: number;
    size: number;
}

export const createPagination = ({ page, take, count, size }: Props) => {
    const totalPages = Math.ceil(size / take);

    return {
        totalPages: totalPages,
        currentPage: page,
        size: size,
        count: count,
        nextPage: totalPages > page ? page + 1 : null,
        prevPage: page - 1 > 0 ? page - 1 : null,
    };
};
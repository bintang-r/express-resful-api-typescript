type Paging = {
  current_page: number;
  size: number;
  total_page: number;
};

type Pageable<T> = {
  data: Array<T>;
  paging: Paging;
};

export { Paging, Pageable };

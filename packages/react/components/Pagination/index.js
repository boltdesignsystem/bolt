import ReactPaginate from './react-paginate';
import './index.scss';

// @TODO: Add aria-live="polite" announcement on page changes
const Pagination = props => {
  return (
    <ReactPaginate
      containerClassName={`c-base-react-paginate c-base-react-paginate--align-${
        props.align || 'center'
      }`}
      pageClassName="c-base-react-paginate__item"
      pageLinkClassName="c-base-react-paginate__item-button"
      previousLinkClassName="c-base-react-paginate__item-button"
      previousClassName="c-base-react-paginate__item c-base-react-paginate__item--prev"
      nextLinkClassName="c-base-react-paginate__item-button"
      nextClassName="c-base-react-paginate__item c-base-react-paginate__item--next"
      breakClassName="c-base-react-paginate__item"
      breakLinkClassName="c-base-react-paginate__item-button"
      activeLinkClassName="is-active"
      disabledClassName="is-disabled"
      pageCount={props.pageCount || 5}
      renderOnZeroPageCount={null}
      // IMPORTANT! required for setting focus on paginated content, removing this can cause infinite loop
      disableInitialCallback={true}
      {...props}
    />
  );
};

export default Pagination;

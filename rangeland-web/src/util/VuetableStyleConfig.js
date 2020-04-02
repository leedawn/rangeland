// Bootstrap4 + FontAwesome Icon
// export default {
//   table: {
//     tableWrapper: '',
//     tableHeaderClass: 'mb-0',
//     tableBodyClass: 'mb-0',
//     tableClass: 'table table-bordered table-hover',
//     loadingClass: 'loading',
//     ascendingIcon: 'fa fa-chevron-up',
//     descendingIcon: 'fa fa-chevron-down',
//     ascendingClass: 'sorted-asc',
//     descendingClass: 'sorted-desc',
//     sortableIcon: 'fa fa-sort',
//     detailRowClass: 'vuetable-detail-row',
//     handleIcon: 'fa fa-bars text-secondary',
//     renderIcon (classes, options) {
//       return `<i class="${classes.join(' ')}"></span>`
//     }
//   },
//   pagination: {
//     wrapperClass: 'pagination float-right',
//     activeClass: 'active',
//     disabledClass: 'disabled',
//     pageClass: 'page-item',
//     linkClass: 'page-link',
//     paginationClass: 'pagination',
//     paginationInfoClass: 'float-left',
//     dropdownClass: 'form-control',
//     icons: {
//       first: 'fa fa-chevron-left',
//       prev: 'fa fa-chevron-left',
//       next: 'fa fa-chevron-right',
//       last: 'fa fa-chevron-right'
//     }
//   }
// }

// semantic
export default {
  table: {
    tableWrapper: '',
    tableHeaderClass: 'fixed',
    tableBodyClass: 'vuetable-semantic-no-top fixed',
    tableClass: 'ui blue selectable unstackable celled table',
    loadingClass: 'loading',
    ascendingIcon: 'blue chevron up icon',
    descendingIcon: 'blue chevron down icon',
    ascendingClass: 'sorted-asc',
    descendingClass: 'sorted-desc',
    sortableIcon: 'grey sort icon',
    handleIcon: 'grey sidebar icon'
  },

  pagination: {
    wrapperClass: 'ui right floated pagination menu',
    activeClass: 'active large',
    disabledClass: 'disabled',
    pageClass: 'item',
    linkClass: 'icon item',
    paginationClass: 'ui bottom attached segment grid',
    paginationInfoClass: 'left floated left aligned six wide column',
    dropdownClass: 'ui search dropdown',
    icons: {
      first: 'angle double left icon',
      prev: 'left chevron icon',
      next: 'right chevron icon',
      last: 'angle double right icon'
    }
  },

  paginationInfo: {
    infoClass: 'left floated left aligned six wide column'
  }
}
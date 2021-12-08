import React from "react";
import { Row, Col, Badge } from "reactstrap";
import { useTable, useSortBy, usePagination } from 'react-table';
import BTable from "react-bootstrap/Table";
import Widget from "../../components/Widget";
import makeData from './make-data';

const Typography = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
            sortable: true
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            sortable: true
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            sortable: true
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            sortable: true
          },
          {
            Header: 'Status',
            accessor: 'status',
            sortable: true
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
            sortable: true
          },
          {
            Header: 'Operation',
            id: "view",
            accessor: ()=> "view",

            Cell: (row) => (
              <div>
              <Badge color="danger">Online</Badge>
              <Badge color="warning" className="ml-2">
                        Delete
                      </Badge>
                      </div>
            )
          }
        ],
      },
    ],
    []
  )

  const data = React.useMemo(() => makeData(2000), [])
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data, initialState: { pageIndex: 2 }, }, useSortBy, usePagination)

  return (
  <div>
    <h1 className="page-title" style = {{color:"black"}}>
      Cheque Submissions
    </h1>
    <Row>
      <Col xs={12} lg={12}>
        <Widget>
        <div className="table-responsive">
					<BTable striped bordered {...getTableProps()} style = {{color:"black"}}>
						<thead>
							{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map(column => (
										<th className="width-150" {...column.getHeaderProps(column.getSortByToggleProps())}>
											<div class="d-flex" style={{minWidth: '150px'}}>
												<span>{column.render('Header')}</span>
												<span class="ml-auto">
													{column.sortable ?
														column.isSorted
															? column.isSortedDesc
																? <i className="fa fa-sort-down fa-fw f-s-14 text-blue"></i>
																: <i className="fa fa-sort-up fa-fw f-s-14 text-blue"></i>
															: <i className="fa fa-sort fa-fw f-s-14 opacity-3"></i>
														: ''}
												</span>
											</div>
										</th>
									))}
								</tr>
							))}
					 </thead>
					 <tbody {...getTableBodyProps()}>
							{page.map(
								(row, i) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}>
											{row.cells.map(cell => {
												return (
													<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
												)
											})}
										</tr>
									)}
							)}
					 </tbody>
				 </BTable>
			 </div>
			 <hr class="m-0" />
       <div class="d-flex align-items-center justify-content-center">
					<ul className="pagination mb-0">
						<li className="page-item"><button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}><i className="fa fa-angle-double-left"></i></button></li>
						<li className="page-item"><button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}><i className="fa fa-angle-left"></i></button></li>
						<li className="page-item d-flex align-items-center px-2">
							<div style = {{color:"black"}}>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></div>
						</li>
						<li className="page-item"><button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}><i className="fa fa-angle-right"></i></button></li>
						<li className="page-item"><button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><i className="fa fa-angle-double-right"></i></button></li>
					</ul>
					<div class="ml-3 mr-1" style = {{color: "black"}}>Go to page:</div>
					<div class="width-50 mx-2">
						<input className="form-control" type="number" defaultValue={pageIndex + 1}
								onChange={e => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0
									gotoPage(page)
								}}
							/>
					</div>
					<div>
						<select
							className="form-control"
							value={pageSize}
							onChange={e => {
								setPageSize(Number(e.target.value))
							}}
						>
							{[10, 20, 30, 40, 50].map(pageSize => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
					</div>
				</div>
          
        </Widget>
      </Col>
    </Row>
  </div>
  )
  };

export default Typography;

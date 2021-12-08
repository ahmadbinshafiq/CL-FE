import React from "react";
import { Row, Col } from "reactstrap";
import { useTable, useSortBy, usePagination } from 'react-table';
import BTable from "react-bootstrap/Table";
import Widget from "../../components/Widget/Widget";
import makeData from './make-data';

const Downtime = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Info',
        columns: [
          {
            Header: 'No',
            accessor: 'number',
			Cell: row => <div style={{ textAlign: "center", padding:'20px' }}>{row.value}</div>,
            sortable: true
          },
          {
            Header: 'Branch Code',
            accessor: 'branchCode',
			Cell: row => <div style={{ textAlign: "center", padding:'20px' }}>{row.value}</div>,
            sortable: true
          },
          {
            Header: 'Last Active',
            accessor: 'date',
			Cell: row => <div style={{ textAlign: "center", padding:'20px' }}>{row.value}</div>,
            sortable: true
          },
          {
            Header: 'Duration',
            accessor: 'duration',
			Cell: row => <div style={{ textAlign: "center", padding:'20px' }}>{row.value}</div>,
            sortable: true
          },
          {
            Header: 'Status',
            accessor: 'status',
			Cell: row => <div style={{ textAlign: "center", padding:'20px' }}>{row.value}</div>,
            sortable: true
          },
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
  } = useTable({ columns, data, initialState: { pageIndex: 0 }, }, useSortBy, usePagination)


 
    return (
      <div>
        <h2 className="page-title" style = {{color:"black"}}>
          Conversational Log
        </h2>
        <Row>
      <Col xs={12} lg={12}>
        <Widget style = {{backgroundColor: '#fff', boxShadow: '1px 1px 12px #55565c'}}>
        <div className="table-responsive">
					<BTable bordered {...getTableProps()} style = {{color:"black"}}>
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
    );
  }

export default Downtime;

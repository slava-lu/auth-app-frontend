import { Text, Flex } from '@chakra-ui/react'
import { useState, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'
import { getUserDetailed } from 'modules/admin'
import Pagination from './pagination'
import UserSearch from './userSearch'

const Users = ({
  setTabIndex,
  pageSize,
  currentPage,
  searchTerm,
  handlePageChange,
  handlePageSizeChange,
  handleUserSearch,
  isSuperAdmin,
}) => {
  const gridRef = useRef()
  const { users, totalNumberUsers } = useSelector((state) => state.admin)
  const onGridReady = () => gridRef.current.api.sizeColumnsToFit()
  const dispatch = useDispatch()

  const totalPages = Math.ceil(totalNumberUsers / pageSize)

  const cellClickedListener = useCallback((event) => {
    dispatch(getUserDetailed(event.data?.id))
    setTabIndex(2)
  }, [])

  const formatDateToLocal = (params) => {
    const dateValue = new Date(params.value)
    return dateValue.toLocaleString()
  }

  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', hide: true },
    { field: 'email', filter: true, minWidth: 180 },
    { field: 'firstName', filter: true },
    { field: 'lastName', filter: true },
    { field: 'roles', filter: true },
    { field: 'isEmailVerified', filter: true },
    { field: 'isTwoFaEnabled', filter: true },
    { field: 'lastLoginAt', filter: true, valueFormatter: formatDateToLocal },
    { field: 'lastLoginProvider', filter: true },
  ])

  const defaultColDef = {
    sortable: true,
    resizable: true,
    skipHeaderOnAutoSize: true,
  }

  return (
    <div style={{ width: '100%' }}>
      {!isSuperAdmin && (
        <Text mb='12px'>
          <b>N.B.</b> In the demo mode of this app, you can only see the currently signed-in user.
        </Text>
      )}
      {isSuperAdmin && (
        <Flex mb='12px' alignItems='center'>
          <Text mr='40px'>Total number of users: {totalNumberUsers}</Text>
          <UserSearch handleUserSearch={handleUserSearch} searchTerm={searchTerm} />
        </Flex>
      )}
      <div className='ag-theme-balham' style={{ width: '100%', height: isSuperAdmin ? 800 : 200 }}>
        <AgGridReact
          ref={gridRef}
          rowData={users}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection='multiple'
          skipHeaderOnAutoSize={false}
          onCellClicked={cellClickedListener}
          onGridReady={onGridReady}
        />
      </div>
      {isSuperAdmin && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          totalPages={totalPages}
        />
      )}
    </div>
  )
}

export default Users

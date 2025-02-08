import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import SearchBar from './SearchBar';

interface PaginatedTableProps<T> {
  columns: ColumnsType<T>;
  fetchData: (params: { page: number; pageSize: number, searchTerm?: string }) => Promise<{ items: T[]; totalItems: number }>;
}

const PaginatedTable = <T extends { id: number | string }>({ columns, fetchData }: PaginatedTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<{ current: number; pageSize: number; total: number }>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');

  const fetchTableData = async (params: { page: number; pageSize: number, searchTerm?: string }) => {
    setLoading(true);
    const response = await fetchData(params);

    if (Array.isArray(response.items)) {
      setData(response.items);
      setPagination((prev) => ({
        ...prev,
        total: response.totalItems,
        current: params.page,
        pageSize: params.pageSize,
      }));
    } else {
      console.error('Data is not an array:', response);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTableData({ page: pagination.current, pageSize: pagination.pageSize, searchTerm: searchText });
  }, [searchText]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    fetchTableData({ page: pagination.current ?? 1, pageSize: pagination.pageSize ?? 10, searchTerm: searchText });
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    fetchTableData({ page, pageSize: pageSize ?? pagination.pageSize, searchTerm: searchText });
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    setPagination({ ...pagination, current: 1 }); // Reset page to 1
    fetchTableData({ page: 1, pageSize: pagination.pageSize, searchTerm: value });
  };

  return (
    <>
    <SearchBar onSearch={handleSearch} />
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
      />
      <div style={{display:'flex', justifyContent:"flex-end", marginTop:'16px'}}>
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={handlePaginationChange}

          hideOnSinglePage={false}
          showSizeChanger={true}
          pageSizeOptions = {[2, 10, 20, 50, 100]}
          showTotal={(total) => `Total ${total} items`}
          //defaultPageSize={20}
          defaultCurrent={1}
        />
        </div>
    </>
  );
};

export default PaginatedTable;
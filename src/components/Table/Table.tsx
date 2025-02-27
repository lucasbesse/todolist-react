import { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import "./Table.css";

interface TableProps {
  produtcs: Product[]
}

interface Product {
  name: string,
  created_at: Date,
  price: number
}

function Table(props: TableProps){
  const columns = useMemo(()=>[
    {
      Header: 'Nome',
      accessor: 'name', // Chave do objeto para acessar o nome do produto
    },
    {
      Header: 'Data de Criação',
      accessor: 'created_at', // Chave do objeto para acessar a data de criação
      Cell: ({ value }: { value: Date }) => new Date(value).toLocaleDateString(), // Formata a data
    },
    {
      Header: 'Preço',
      accessor: 'price', // Chave do objeto para acessar o preço
      Cell: ({ value }: { value: number }) => `R$ ${value.toFixed(2)}`, // Formata o preço
    },
  ], [])

  const data = useMemo(() => props.produtcs, [props.produtcs]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
    getTableSortByToggleProps
  } = useTable({ columns, data }, useSortBy);

  return(
    <table className='table' {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                key={column.id}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                {/* Ícone de ordenação */}
                <span>
                  {sortBy.find((s) => s.id === column.id)?.desc ? ' 🔽' : ' 🔼'}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row); // Prepara a linha
          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td key={cell.id} {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  )
}

export default Table
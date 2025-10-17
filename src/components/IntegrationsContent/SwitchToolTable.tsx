import { useState } from "react";
import { Content, Switch } from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";

export const SwitchToolTable: React.FunctionComponent = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleRowToggle = (rowIndex: number, checked: boolean) => {
    if (checked) {
      setSelectedRows((prev) => [...prev, rowIndex]);
    } else {
      setSelectedRows((prev) => prev.filter((row) => row !== rowIndex));
    }
  };

  return (
    <Table aria-label="Clickable table">
      <Thead>
        <Tr>
          <Th>
            <Switch
              id={`row-toggle-all`}
              label=""
              isChecked={isAllSelected}
              onChange={(_event, checked) => {
                setIsAllSelected(checked);
                setSelectedRows(
                  checked ? Array.from({ length: 30 }, (_, i) => i) : []
                );
              }}
            />
          </Th>
          <Th>Name</Th>
        </Tr>
      </Thead>
      <Tbody>
        {(() => {
          const rows = [];
          for (let i = 0; i < 30; i++) {
            rows.push(
              <Tr
                key={i}
                // onRowClick={() => setSelectedRepoName(repoName)}
                isSelectable
                isClickable
                isRowSelected={isAllSelected || selectedRows.includes(i)}
              >
                <Td dataLabel="Name">
                  <Switch
                    id={`row-toggle-${i}`}
                    label=""
                    isChecked={isAllSelected || selectedRows.includes(i)}
                    onChange={(_event, checked) => handleRowToggle(i, checked)}
                  />
                </Td>
                <Td dataLabel="Name">
                  <Content component="p">Tool name</Content>
                  <Content component="small">Tool description</Content>
                </Td>
              </Tr>
            );
          }
          return rows;
        })()}
      </Tbody>
    </Table>
  );
};

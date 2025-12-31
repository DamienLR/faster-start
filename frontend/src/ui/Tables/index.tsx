import { Table } from "@mantine/core";
import styles from "./Tables.module.css";
import { type FormattedMiss } from "../../types/FormattedMiss";

type TablesProps = {
  formattedMisses: FormattedMiss[];
};

const Tables = ({ formattedMisses }: TablesProps) => {
  // TODO: add this block into formatUserInput and fix the breaking changes
  const p2Misses: FormattedMiss[] = [];
  const p3Misses: FormattedMiss[] = [];
  const p4Misses: FormattedMiss[] = [];

  if (formattedMisses.length > 0) {
    for (let i = 0; i < formattedMisses.length; i++) {
      const station = Number(formattedMisses[i].station);

      if (station < 3000 && station > 2000) {
        p2Misses.push(formattedMisses[i]);
      }

      if (station < 4000 && station > 3000) {
        p3Misses.push(formattedMisses[i]);
      }

      if (station < 5000 && station > 4000) {
        p4Misses.push(formattedMisses[i]);
      }
    }
  }

  const renderFloor = (floorName: string, misses: FormattedMiss[]) => {
    const rows = misses.map((miss) => (
      <Table.Tr key={miss.login}>
        <Table.Td>{miss.login}</Table.Td>
        <Table.Td>{miss.missTime}</Table.Td>
        <Table.Td></Table.Td>
        <Table.Td></Table.Td>
        {/* intentionally blank for quip comments */}
        <Table.Td>{miss.station}</Table.Td>
      </Table.Tr>
    ));

    return (
      <div>
        <h2>{floorName}</h2>
        <Table striped withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Login</Table.Th>
              <Table.Th>First stow</Table.Th>
              <Table.Th>Comment</Table.Th>
              <Table.Th>ADAPT needed?</Table.Th>
              <Table.Th>Station</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      <p>
        {formattedMisses.length > 0
          ? `FS updated. P2 misses: ${p2Misses.length} | P3 misses: ${p3Misses.length} | P4 misses: ${p4Misses.length}`
          : null}
      </p>

      {formattedMisses.length > 0 && (
        <div className={styles.tablesContainer}>
          {/* misses don't need to be sorted because they will already be sorted */}
          {renderFloor("P2", p2Misses)}
          {renderFloor("P3", p3Misses)}
          {renderFloor("P4", p4Misses)}
        </div>
      )}
    </div>
  );
};

export default Tables;

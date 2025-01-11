import { useEffect, useState } from 'react';
import { Container, Paper, Stack, Text, Title } from '@mantine/core';

interface ChangelogEntry {
  version: string;
  type: string;
  changes: string[];
}

function parseChangelog(content: string): ChangelogEntry[] {
  const lines = content.split('\n').filter((line) => line.trim() !== '');
  const entries: ChangelogEntry[] = [];
  let currentEntry: Partial<ChangelogEntry> = {};

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      if (currentEntry.version) {
        entries.push(currentEntry as ChangelogEntry);
      }
      currentEntry = {
        version: line.replace('## ', '').trim(),
        changes: [],
      };
    } else if (line.startsWith('### ')) {
      currentEntry.type = line.replace('### ', '').trim();
    } else if (line.startsWith('- ')) {
      currentEntry.changes = currentEntry.changes || [];
      currentEntry.changes.push(line.replace('- ', '').trim());
    }
  });

  if (currentEntry.version) {
    entries.push(currentEntry as ChangelogEntry);
  }

  return entries;
}

export function ChangelogPage() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);

  useEffect(() => {
    // Using Vite's dynamic import to load the changelog at runtime
    import('../../CHANGELOG.md?raw').then((module) => {
      const content = module.default;
      setEntries(parseChangelog(content));
    });
  }, []);

  return (
    <Container size="sm" py="xl">
      <Title order={1} mb="xl">
        Changelog
      </Title>
      <Stack gap="md">
        {entries.map((entry) => (
          <Paper key={entry.version} p="md" withBorder>
            <Title order={2} size="h3">
              {entry.version}
            </Title>
            <Title order={3} size="h4" c="dimmed" mb="sm">
              {entry.type}
            </Title>
            <Stack gap="xs">
              {entry.changes.map((change, index) => (
                <Text key={index}>{change}</Text>
              ))}
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

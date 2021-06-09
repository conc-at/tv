import React from 'react';
import { useTranslation } from 'react-i18next';
import { AutoSizer, Column } from 'react-virtualized';

import { Box, Table } from 'components';
import { empty, link } from 'components/table/renderer';

import { Playlist } from '../../../../types';

interface Props {
  playlists: Playlist[];
}

export function List({ playlists }: Props) {
  const { t } = useTranslation();

  return (
    <Box>
      <AutoSizer>
        {({ width, height }) => (
          <Table
            width={width}
            height={height}
            rowHeight={30}
            rowCount={playlists.length}
            noRowsRenderer={empty()}
            rowGetter={({ index }: { index: number }) => playlists[index]}
          >
            <Column label="#" dataKey="id" width={30} />
            <Column label="Name" dataKey="name" width={200} />
            <Column
              dataKey="id"
              width={60}
              cellRenderer={link({
                renderLink: (id) => `/playlists/${id}`,
                renderText: () => t('playlists.list.edit'),
              })}
            />
            <Column
              dataKey="id"
              width={150}
              cellRenderer={link({
                renderLink: (id) => `/playlists/${id}/channels`,
                renderText: () => t('playlists.list.open'),
              })}
            />
            <Column
              dataKey="id"
              width={150}
              cellRenderer={link({
                external: true,
                renderLink: (id) => `/export/${id}`,
                renderText: () => t('playlists.list.download'),
              })}
            />
          </Table>
        )}
      </AutoSizer>
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Heading, Hr, Page } from 'components';
import { gql, useQuery } from '@apollo/client';



export default function Playlists() {

  const { t } = useTranslation();

  const {data,loading,error, fetchMore} = usePlaylistsQuery({
    variables: {
      n: 4
    },
  });

  const [playlists, setPlaylists] = useState(undefined)

  useEffect(() => {
    setPlaylists(data)
  }, [data]);

  const handleClick = () => {

    fetchMore({
      variables: {
        n: 4,
        after: data?.playlists?.pageInfo.endCursor,
      }
    }).then((result: { data: React.SetStateAction<undefined>; }) => {
      setPlaylists(result.data)
    })

  }

  return (
    <Page>
      <Heading variant="h1">{t('playlists.title')}</Heading>
      <Hr />
      <Button onClick={() => {handleClick()}}></Button>

      {playlists?.playlists?.edges?.forEach((edge) => {
        return <div>{edge?.node?.name}</div>
      })}

    </Page>
  );
}

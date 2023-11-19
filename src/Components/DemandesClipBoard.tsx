import { ReactNode, useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Dashboard/Title';
import { AppBar, Button, Container, IconButton, Paper, Stack, Toolbar, Typography } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../useFirebase';
import { useHandleLoading } from '../Utils/useHandleLoading';
import { DeplacementFormModel } from './Demandes/Deplacement';
import moment from 'moment';

const StyledTableRow = styled(TableRow)`
  && {
    td {
      border: none; /* Remove borders for all other rows */
    }
  }
`;

interface DemandeDeplacement extends DeplacementFormModel {
  readonly firstName: string;
  readonly email: string;
  readonly department: string;
  readonly requestDate: string;
  readonly absenceStartTime: string;
  readonly absenceEndTime: string;
}

export const DemandesClipBoard = () => {
  const [demandes, setDemandes] = useState<DemandeDeplacement[]>([]);
  const { isLoading, setIsLoading, LoadingSpinner } = useHandleLoading();
  const { db } = useFirebase();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const deplacementRef = collection(db, 'Admin', 'Demande', 'Deplacement');
        const querySnapshot = await getDocs(deplacementRef);
        const fetchedDemandes: DemandeDeplacement[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          fetchedDemandes.push(doc.data() as DemandeDeplacement);
        });
        setDemandes(fetchedDemandes);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [db, setIsLoading]);

  return (
    <Stack>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Demandes de deplacement
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Paper
          elevation={0}
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <Stack justifyContent="center" alignItems="center">
            {isLoading ? (
              <LoadingSpinner variant={{ my: 5 }} />
            ) : (
              <>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox" />
                      <TableCell>Date</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell>Service</TableCell>
                      <TableCell>A partir de</TableCell>
                      <TableCell>Terminé au</TableCell>
                      <TableCell>Motif</TableCell>
                      <TableCell>Destination</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {demandes.map((row, index) => (
                      <ExpandableTableRow
                        key={index}
                        expandComponent={
                          <TableCell sx={{ border: 'none' }} colSpan={6}>
                            {row.motif}
                          </TableCell>
                        }
                      >
                        <TableCell>{moment(row.requestDate).format('DD.MM.YYYY HH:mm')}</TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.department}</TableCell>
                        <TableCell>{moment(row.absenceStartTime).format('DD.MM.YYYY HH:mm')}</TableCell>
                        <TableCell>{moment(row.absenceEndTime).format('DD.MM.YYYY HH:mm')}</TableCell>
                        <TableCell>{row.motif}</TableCell>
                        <TableCell>{row.destination}</TableCell>
                      </ExpandableTableRow>
                    ))}
                  </TableBody>
                </Table>
                {/* <Link color="primary" href="#" sx={{ mt: 3 }}>
              en voir plus ...
            </Link> */}
              </>
            )}
          </Stack>
        </Paper>
      </Container>
    </Stack>
  );
};

const ExpandableTableRow = ({
  children,
  expandComponent,
  ...otherProps
}: {
  children: ReactNode;
  expandComponent: ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <StyledTableRow>
        <TableCell>
          <IconButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </TableCell>
        {children}
      </StyledTableRow>
      {isExpanded && (
        <StyledTableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell></TableCell>
          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" color="error">
                cancel
              </Button>
              <Button variant="contained">save</Button>
            </Stack>
          </TableCell>
        </StyledTableRow>
      )}
    </>
  );
};

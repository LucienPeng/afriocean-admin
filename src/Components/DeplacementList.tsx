import { DATE_TIME_FORMAT } from '../model/model';
import { ReactNode, useEffect, useState } from 'react';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { useFirebase } from '../useFirebase';
import { useHandleLoading } from '../Utils/useHandleLoading';
import { StyledTextField } from './Common/StyledUI/StyledTextField';
import { DeplacementFormModel } from './Demandes/DeplacementForm';
import styled from '@emotion/styled';
import moment, { Moment } from 'moment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const StyledTableRow = styled(TableRow)`
  && {
    td {
      border: none; /* Remove borders for all other rows */
    }
  }
`;

interface DemandeDeplacement extends DeplacementFormModel {
  readonly id: string;
  readonly isProcessed: boolean;
  readonly isApproved: boolean | null;
  readonly firstName: string;
  readonly email: string;
  readonly department: string;
  readonly requestDate: string;
  readonly absenceStartTime: string;
  readonly absenceEndTime: string;
}

export const DeplacementList = () => {
  const [deplacementApplication, setDeplacementApplication] = useState<DemandeDeplacement[]>([]);
  const { isLoading, setIsLoading, LoadingSpinner } = useHandleLoading();
  const { db } = useFirebase();

  const getDuration = (endDateTime: Moment, startDateTime: Moment) => moment.duration(endDateTime.diff(startDateTime));

  const approveHander = (application: DemandeDeplacement) => {
    setDeplacementApplication((preApplication) => {
      return preApplication.map((row) => {
        if (application.id === row.id) {
          return { ...row, isApproved: true, isProcessed: true };
        } else {
          return row;
        }
      });
    });
  };

  const rejectHandler = (application: DemandeDeplacement) => {
    setDeplacementApplication((preApplication) => {
      return preApplication.map((row) => {
        if (application.id === row.id) {
          return { ...row, isApproved: false, isProcessed: true };
        } else {
          return row;
        }
      });
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const deplacementRef = collection(db, 'Admin', 'Demande', 'Deplacement');
        const querySnapshot = await getDocs(deplacementRef);
        const fetchedDemandes: DemandeDeplacement[] = [];
        querySnapshot.forEach((doc) => {
          const fetchedData = {
            id: doc.id,
            ...doc.data(),
          };
          fetchedDemandes.push(fetchedData as DemandeDeplacement);
        });
        setDeplacementApplication(fetchedDemandes);
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
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell align="center">Etat</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Nom</TableCell>
                    <TableCell align="center">Service</TableCell>
                    <TableCell align="center">A partir de</TableCell>
                    <TableCell align="center">Terminé au</TableCell>
                    <TableCell align="center">Temps absence</TableCell>
                    <TableCell align="center">Motif</TableCell>
                    <TableCell align="center">Destination</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deplacementApplication.map((row, index) => (
                    <ExpandableTableRow
                      key={index}
                      row={row}
                      approveHander={approveHander}
                      rejectHandler={rejectHandler}
                    >
                      <TableCell>
                        {row.isProcessed ? (
                          row.isApproved ? (
                            <CheckCircleIcon color="success" />
                          ) : (
                            <CancelIcon color="error" />
                          )
                        ) : (
                          <PendingActionsIcon color="secondary" />
                        )}
                      </TableCell>
                      <TableCell align="center">{moment(row.requestDate).format(DATE_TIME_FORMAT)}</TableCell>
                      <TableCell align="center">{row.firstName}</TableCell>
                      <TableCell align="center">{row.department}</TableCell>
                      <TableCell align="center">{moment(row.absenceStartTime).format(DATE_TIME_FORMAT)}</TableCell>
                      <TableCell align="center">{moment(row.absenceEndTime).format(DATE_TIME_FORMAT)}</TableCell>
                      <TableCell align="center">
                        {getDuration(moment(row.absenceEndTime), moment(row.absenceStartTime)).asHours().toFixed(1)}
                      </TableCell>
                      <TableCell align="center">{row.motif}</TableCell>
                      <TableCell align="center">{row.destination}</TableCell>
                    </ExpandableTableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Stack>
        </Paper>
      </Container>
    </Stack>
  );
};

interface ExpandableTableRowtProps {
  readonly children: ReactNode;
  readonly row: DemandeDeplacement;
  readonly rejectHandler: (row: DemandeDeplacement) => void;
  readonly approveHander: (row: DemandeDeplacement) => void;
}

const ExpandableTableRow = ({ children, row, rejectHandler, approveHander }: ExpandableTableRowtProps) => {
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
          <TableCell colSpan={3}>
            <StyledTextField size="small" placeholder="comment" fullWidth />
          </TableCell>
          <TableCell>
            <Stack direction="row" spacing={1}>
              <Button variant="contained" color="error" onClick={() => rejectHandler(row)}>
                Reject
              </Button>
              <Button variant="contained" onClick={() => approveHander(row)}>
                Approve
              </Button>
            </Stack>
          </TableCell>
        </StyledTableRow>
      )}
    </>
  );
};

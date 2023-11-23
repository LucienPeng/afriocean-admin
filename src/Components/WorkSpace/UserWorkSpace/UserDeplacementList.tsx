import { Applications, DATE_TIME_FORMAT } from '../../../model/application.model';
import { useState } from 'react';
import {
  CircularProgress,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { Collections, useFirebaseDB } from '../../../useFirebaseDB';
import { DeplacementFormModel } from '../../Application/DeplacementForm';
import { StyledPaper } from '../../Common/StyledUI/StyledPaper';
import { StyledAppBar } from '../../Common/StyledUI/StyledAppBar';
import { useUserRedux } from '../../../useUserRedux';
import { StyledTableRow } from '../../Common/StyledUI/StyledTable';
import moment, { Moment } from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

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

export const UserDeplacementList = () => {
  const [deplacementRecord, setDeplacementRecord] = useState<DemandeDeplacement[]>([]);
  const { profile } = useUserRedux();
  const { getFirebaseMultiConditionQueryData } = useFirebaseDB();

  const { isLoading } = useQuery({
    queryKey: 'userDeplacementList',
    queryFn: () =>
      getFirebaseMultiConditionQueryData(
        Collections.Application,
        { firstKey: 'uid', firstOperator: '==', firstValue: profile?.uid },
        { secondKey: 'applicationType', secondOperator: '==', secondValue: Applications.Deplacement },
      ),
    onSuccess: (res) => setDeplacementRecord(res as DemandeDeplacement[]),
  });

  const getDuration = (endDateTime: Moment, startDateTime: Moment) => moment.duration(endDateTime.diff(startDateTime));

  return (
    <Stack>
      <StyledAppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Histoire des demandes de deplacement
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth="lg">
        <StyledPaper
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
              <CircularProgress color="secondary" sx={{ my: 5 }} />
            ) : (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox" />
                    <TableCell align="center">Etat</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">A partir de</TableCell>
                    <TableCell align="center">Terminé au</TableCell>
                    <TableCell align="center">Temps absence</TableCell>
                    <TableCell align="center">Motif</TableCell>
                    <TableCell align="center">Destination</TableCell>
                    <TableCell align="center">Note</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deplacementRecord.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell />
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
                      <TableCell align="center">{moment(row.absenceStartTime).format(DATE_TIME_FORMAT)}</TableCell>
                      <TableCell align="center">{moment(row.absenceEndTime).format(DATE_TIME_FORMAT)}</TableCell>
                      <TableCell align="center">
                        {getDuration(moment(row.absenceEndTime), moment(row.absenceStartTime)).asHours().toFixed(1)}
                      </TableCell>
                      <TableCell align="center">{row.motif}</TableCell>
                      <TableCell align="center">{row.destination}</TableCell>
                      <TableCell align="center">{row.comment}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Stack>
        </StyledPaper>
      </Container>
    </Stack>
  );
};

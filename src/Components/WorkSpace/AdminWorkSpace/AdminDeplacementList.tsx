import { DATE_TIME_FORMAT } from '../../../model/application.model';
import { ChangeEvent, ReactNode, useState } from 'react';
import {
  Button,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { useMutation, useQuery } from 'react-query';
import { Collections, MutationFunction, useFirebaseDB } from '../../../Utils/Firebase/useFirebaseDB';
import { StyledTextField } from '../../Common/StyledUI/StyledTextField';
import { DeplacementFormModel } from '../../Application/Form/DeplacementForm';
import { StyledPaper } from '../../Common/StyledUI/StyledPaper';
import { StyledAppBar } from '../../Common/StyledUI/StyledAppBar';
import { StyledTableRow } from '../../Common/StyledUI/StyledTable';
import moment, { Moment } from 'moment';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

export const AdminDeplacementList = () => {
  const [deplacementApplications, setDeplacementApplications] = useState<DemandeDeplacement[]>([]);
  const [comment, setComment] = useState('');
  const { getFirebaseCollectionData, updateFirebaseData } = useFirebaseDB();

  const setApplicationResult: MutationFunction = async ({ collection, id, newData }) => {
    await updateFirebaseData(collection, id, newData);
  };

  const { mutate, isLoading: isUpdating } = useMutation(setApplicationResult);

  const { refetch, isLoading } = useQuery({
    queryKey: 'deplacementList',
    queryFn: () => getFirebaseCollectionData('Application'),
    onSuccess: (fetchedData) => setDeplacementApplications(fetchedData as DemandeDeplacement[]),
  });

  const getDuration = (endDateTime: Moment, startDateTime: Moment) => moment.duration(endDateTime.diff(startDateTime));

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => setComment(event.target.value);

  const approveHander = async (application: DemandeDeplacement) => {
    mutate({
      collection: Collections.Application,
      id: application.id,
      newData: {
        ...application,
        isApproved: true,
        isProcessed: true,
        comment,
      },
    });
    refetch();
    setComment('');
  };

  const rejectHandler = (application: DemandeDeplacement) => {
    mutate({
      collection: Collections.Application,
      id: application.id,
      newData: {
        ...application,
        isApproved: false,
        isProcessed: true,
        comment,
      },
    });
    refetch();
    setComment('');
  };

  return (
    <Stack>
      <StyledAppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Demandes de deplacement
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
                  {deplacementApplications.map((row, index) => (
                    <ExpandableTableRow
                      key={index}
                      row={row}
                      comment={comment}
                      isUpdating={isUpdating}
                      approveHander={approveHander}
                      rejectHandler={rejectHandler}
                      onChangeHandler={onChangeHandler}
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
        </StyledPaper>
      </Container>
    </Stack>
  );
};

interface ExpandableTableRowtProps {
  readonly children: ReactNode;
  readonly row: DemandeDeplacement;
  readonly isUpdating: boolean;
  readonly comment: string;
  readonly rejectHandler: (row: DemandeDeplacement) => void;
  readonly approveHander: (row: DemandeDeplacement) => void;
  readonly onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ExpandableTableRow = ({
  children,
  row,
  isUpdating,
  comment,
  rejectHandler,
  approveHander,
  onChangeHandler,
}: ExpandableTableRowtProps) => {
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
          <TableCell align="right">{isUpdating && <CircularProgress color="secondary" size="20px" />}</TableCell>
          <TableCell colSpan={3}>
            <StyledTextField
              value={comment || row.comment}
              size="small"
              placeholder="comment"
              fullWidth
              onChange={onChangeHandler}
            />
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

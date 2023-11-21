import {
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useFirebase } from '../../useFirebase';
import { useQuery } from 'react-query';
import { ApplicationModel, DATE_TIME_FORMAT } from '../../model/application.model';
import moment from 'moment';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

export const UserDashboardComponent = () => {
  const { getFirebaseConditionQueryData } = useFirebase();
  const { data: pendingApplications, isLoading } = useQuery({
    queryKey: 'pendingApplications',
    queryFn: () => getFirebaseConditionQueryData('Application', 'isProcessed', '==', false),
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 350,
            }}
          >
            <Stack spacing={2} justifyContent="center">
              <Typography color="text.primary" fontWeight="bold" fontSize="30px" lineHeight={1.5}>
                Demandes en attentes
              </Typography>
              <Stack width={1} justifyContent="center" alignItems="center">
                {/* {isLoading ? (
                  <CircularProgress color="secondary" sx={{ mt: 10 }} />
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Nom</TableCell>
                        <TableCell align="center">Service</TableCell>
                        <TableCell align="center">Demandes en attente</TableCell>
                        <TableCell padding="checkbox" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(pendingApplications as ApplicationModel[])?.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell align="center">
                            {moment(application.requestDate).format(DATE_TIME_FORMAT)}
                          </TableCell>
                          <TableCell align="center">{application.firstName}</TableCell>
                          <TableCell align="center">{application.department}</TableCell>
                          <TableCell align="center">{application.applicationType}</TableCell>
                          <TableCell align="left">
                            <IconButton aria-label="">
                              <KeyboardDoubleArrowRightIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )} */}
              </Stack>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          ></Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          ></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

import {
  Avatar,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Collections, useFirebaseDB } from '../../Utils/Firebase/useFirebaseDB';
import { ApplicationModel, Applications, DATE_TIME_FORMAT } from '../../model/application.model';
import { StyledPaper } from '../Common/StyledUI/StyledPaper';
import { StyledTitle } from '../Common/StyledUI/StyledTitle';
import { useNavigate } from 'react-router-dom';
import { useUserRedux } from '../../useUserRedux';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AssignmentIcon from '@mui/icons-material/Assignment';

const mapApplicationLink = (applicationType: Applications) => {
  switch (applicationType) {
    case Applications.Deplacement:
      return '/user/application/deplacement';
    case Applications.Absence:
      return '/user/application/deplacement';
    case Applications.HeuresSupplementaires:
      return '/user/application/deplacement';
    default:
      return '/';
  }
};

export const UserDashboardComponent = () => {
  const { profile } = useUserRedux();
  const { getFirebaseMultiConditionQueryData } = useFirebaseDB();
  const { data: pendingApplications, isLoading } = useQuery({
    queryKey: ['pendingApplications'],
    queryFn: () =>
      getFirebaseMultiConditionQueryData(
        Collections.Application,
        { firstKey: 'isProcessed', firstOperator: '==', firstValue: false },
        { secondKey: 'uid', secondOperator: '==', secondValue: profile?.uid },
      ),
  });
  const recentApplications = pendingApplications as ApplicationModel[];
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <StyledPaper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 350,
            }}
          >
            <Stack spacing={2} justifyContent="center">
              <Stack direction="row" spacing={3} alignItems="center">
                <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white' }} variant="rounded">
                  <AssignmentIcon />
                </Avatar>
                <StyledTitle fontWeight={700} fontSize="30px" lineHeight={1.5}>
                  Mes demandes recentes
                </StyledTitle>
              </Stack>

              <Stack width={1} justifyContent="center" alignItems="center">
                {isLoading ? (
                  <CircularProgress color="secondary" sx={{ mt: 10 }} />
                ) : (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Date de demande</TableCell>
                        <TableCell align="center">Genre</TableCell>
                        <TableCell align="center">Etat</TableCell>
                        <TableCell align="center">Résultat</TableCell>
                        <TableCell align="center" padding="checkbox" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentApplications?.map((application) => (
                        <TableRow key={application.id}>
                          <TableCell align="center">
                            {moment(application.requestDate).format(DATE_TIME_FORMAT)}
                          </TableCell>
                          <TableCell align="center">{application.applicationType}</TableCell>
                          <TableCell align="center">{!application.isProcessed ? 'En cours' : 'Finit'}</TableCell>
                          <TableCell align="center">
                            {application.isProcessed && application.isApproved ? 'Apprové' : 'Rejecté'}
                          </TableCell>
                          <TableCell align="left">
                            <IconButton
                              aria-label="application-navigation"
                              onClick={() => navigate(mapApplicationLink(application.applicationType as Applications))}
                            >
                              <KeyboardDoubleArrowRightIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Stack>
            </Stack>
          </StyledPaper>
        </Grid>
        <Grid item xs={6}>
          <StyledPaper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 350,
            }}
          ></StyledPaper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <StyledPaper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          ></StyledPaper>
        </Grid>

        <Grid item xs={12} md={4} lg={3}>
          <StyledPaper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          ></StyledPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

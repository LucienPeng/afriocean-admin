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
import { useFirebaseDB } from '../../useFirebaseDB';
import { useQuery } from 'react-query';
import { ApplicationModel, Applications, DATE_TIME_FORMAT } from '../../model/application.model';
import { StyledPaper } from '../Common/StyledUI/StyledPaper';
import { StyledTitle } from '../Common/StyledUI/StyledTitle';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AssignmentIcon from '@mui/icons-material/Assignment';

const mapApplicationLink = (applicationType: Applications) => {
  switch (applicationType) {
    case Applications.Deplacement:
      return '/admin/application/deplacement';
    case Applications.Absence:
      return '/admin/application/deplacement';
    case Applications.HeuresSupplementaires:
      return '/admin/application/deplacement';
    default:
      return '/';
  }
};

export const AdminDashboardComponent = () => {
  const { getFirebaseConditionQueryData } = useFirebaseDB();
  const { data: pendingApplications, isLoading } = useQuery({
    queryKey: 'pendingApplications',
    queryFn: () => getFirebaseConditionQueryData('Application', 'isProcessed', '==', false),
  });

  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                  Demandes en attentes
                </StyledTitle>
              </Stack>

              <Stack width={1} justifyContent="center" alignItems="center">
                {isLoading ? (
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

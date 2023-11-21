import { Avatar, CardActionArea, Container, Grid, Stack, Toolbar, Typography } from '@mui/material';
import { StyledPaper } from '../Common/StyledUI/StyledPaper';
import { StyledTitle } from '../Common/StyledUI/StyledTitle';
import { StyledAppBar } from '../Common/StyledUI/StyledAppBar';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { useNavigate } from 'react-router-dom';

const APPLICATION_LINKS = [
  { title: 'Déplacement', icon: <DriveEtaIcon />, url: '/admin/application/deplacement' },
  { title: 'Absence', icon: <EmojiFoodBeverageIcon />, url: '#' },
  { title: 'Heures Supplementaires', icon: <MoreTimeIcon />, url: '#' },
];

export const ApplicationsPortal = () => {
  const navigate = useNavigate();
  return (
    <Stack>
      <StyledAppBar>
        <Toolbar>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white' }} variant="rounded">
              <AssignmentIcon />
            </Avatar>
            <StyledTitle>Demandes</StyledTitle>
          </Stack>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth="lg">
        <StyledPaper //TBR
          sx={{
            my: { xs: 3, md: 6 },
            p: { xs: 2, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            minHeight: 350,
          }}
        >
          <Grid container spacing={3}>
            {APPLICATION_LINKS.map((link) => (
              <Grid item key={link.title} xs={12} sm={6}>
                <CardActionArea sx={{ borderRadius: '16px' }} onClick={() => navigate(link.url)}>
                  <StyledPaper
                    sx={{
                      py: 3,
                      px: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 1,
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography fontWeight={500} color="text.primary">
                      {link.title}
                    </Typography>
                    <Avatar sx={{ bgcolor: 'custom.iconAvatar', color: 'common.white' }} variant="rounded">
                      {link.icon}
                    </Avatar>
                  </StyledPaper>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </Container>
    </Stack>
  );
};

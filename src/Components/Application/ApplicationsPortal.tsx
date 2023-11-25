import { PageWrapper } from '../Common/PageWrapper';
import { Avatar, CardActionArea, Grid, Typography } from '@mui/material';
import { Roles } from '../../model/company.model';
import { StyledPaper } from '../Common/StyledUI/StyledPaper';
import { useNavigate } from 'react-router-dom';
import { useUserRedux } from '../../useUserRedux';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { PageSection } from '../Common/PageSection';

const ADMIN_APPLICATION_LINKS = [
  { title: 'Déplacement', icon: <DriveEtaIcon />, url: '/admin/application/deplacement' },
  { title: 'Absence', icon: <EmojiFoodBeverageIcon />, url: '#' },
  { title: 'Heures Supplementaires', icon: <MoreTimeIcon />, url: '#' },
];

const USER_APPLICATION_LINKS = [
  { title: 'Déplacement', icon: <DriveEtaIcon />, url: '/user/application/deplacement' },
  { title: 'Absence', icon: <EmojiFoodBeverageIcon />, url: '#' },
  { title: 'Heures Supplementaires', icon: <MoreTimeIcon />, url: '#' },
];

export const ApplicationsPortal = () => {
  const { role } = useUserRedux();
  const portalLinks = role === Roles.ADMIN ? ADMIN_APPLICATION_LINKS : USER_APPLICATION_LINKS;
  const portalTitle = role === Roles.ADMIN ? 'Demande Contrôl' : 'Mes Demandes';
  const portalIcon = role === Roles.ADMIN ? <RemoveRedEyeIcon /> : <AssignmentIcon />;
  const navigate = useNavigate();

  return (
    <PageWrapper icon={portalIcon} componentName={portalTitle} containerMaxWidth="lg">
      <PageSection>
        <Grid container spacing={3}>
          {portalLinks.map((link) => (
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
      </PageSection>
    </PageWrapper>
  );
};

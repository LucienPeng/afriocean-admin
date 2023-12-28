import { Avatar, CardActionArea, Container, Grid } from '@mui/material';
import { StyledPaper } from '../Common/StyledUI/StyledPaper';
import { StyledTitle } from '../Common/StyledUI/StyledTitle';
import { useNavigate } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

export const UserDashboardComponent = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <CardActionArea onClick={() => navigate('/local-sales/orders')}>
            <StyledPaper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 240,
                gap: 1,
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', color: 'common.white' }} variant="rounded">
                <LocalShippingIcon />
              </Avatar>
              <StyledTitle fontWeight={700} fontSize="30px" lineHeight={1.5}>
                Commandes à livrer
              </StyledTitle>
            </StyledPaper>
          </CardActionArea>
        </Grid>
      </Grid>
    </Container>
  );
};

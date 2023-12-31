import { AppBar, Container, Stack, Toolbar, Typography } from '@mui/material';

export const HeuresSupplementaires = () => {
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
            Demande des Heures Supplémentaires
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        {/* <Paper
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
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First name"
                    autoComplete="given-name"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last name"
                    autoComplete="family-name"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    onChange={onChange}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    autoComplete="email"
                    value={value}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="defaultPassword"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    variant="standard"
                    margin="normal"
                    required
                    fullWidth
                    id="defaultPassword"
                    label="Default Password"
                    autoComplete="password"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="role"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select variant="outlined" fullWidth labelId="role" id="role" onChange={onChange} value={value}>
                      <MenuItem value="" disabled>
                        Select your role
                      </MenuItem>
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="department"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Department</InputLabel>
                    <Select
                      variant="outlined"
                      fullWidth
                      labelId="role-label"
                      id="role"
                      onChange={onChange}
                      value={value}
                      label="Department"
                    >
                      <MenuItem value="" disabled>
                        Select Department
                      </MenuItem>
                      {departments.map((department) => (
                        <MenuItem key={department} value={department}>
                          {department}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              />
            </Grid>
          </Grid>
          {isLoading ? (
            <LoadingSpinner />
          ) : successMessage.length !== 0 ? (
            <ActionSuccessAlert />
          ) : errorMessage.length !== 0 ? (
            <ErrorMessageAlert />
          ) : null}
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleCancel} color="error">
              cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit(createUserHandler)}>
              save
            </Button>
          </Stack>
        </Paper> */}
      </Container>
    </Stack>
  );
};

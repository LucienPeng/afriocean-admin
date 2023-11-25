import { PageWrapper } from '../Common/PageWrapper';
import QueueIcon from '@mui/icons-material/Queue';
import { PageSection } from '../Common/PageSection';

export const MaterialDetail = () => {
  return (
    <PageWrapper icon={<QueueIcon />} componentName="DETAIL" containerMaxWidth="lg">
      <PageSection>123</PageSection>
      <PageSection>456</PageSection>
    </PageWrapper>
  );
};

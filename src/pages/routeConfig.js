import { Path } from 'routes';

import { CreateProposal, Proposals } from './grant_proposal';
import { EditPendingProposal } from './pending_proposal';
import { 
    CreateParticipant, 
    Participants, 
    UpdateParticipant, 
} from './participant';
import { ParticipantAnalysis } from './participant_analysis';
import { TargetGroups } from './target_group';
import { KeyProgrammes } from './key_programme';
import { Regions } from './target_region';
import { EventPlan } from './event';
import { ActivityPlans  } from './plan';
import { Narrative } from './narative_report';
import { Agenda } from './agenda';
import { Users } from './user';
import { Donors } from './donor';
import { DonorContact } from './donor_contact';
import { Settings } from './setting';
import { Home } from './home';
import { Objectives, Activities } from '../components/dashboard/ObjActWrapper';
import { Bargraph } from './graphs';
import { ActivityReport } from './activity_report';
import { 
    PendingActivity, 
    PlanParticipant, 
    PendingReport 
} from './pending_action';

export const homeRoutes = Object.entries({
    [Path.pendingActivityReport]: PendingReport,
    [Path.pendingPlans]: PlanParticipant,
    [Path.pendingActivities]: PendingActivity,
    [Path.settings]: Settings,
    [Path.graphs]: Bargraph,
    [Path.home]: Home,
    [Path.users]: Users,
    [Path.objectives]: Objectives,
    [Path.proposals]: Proposals,
    [Path.createProposal]: CreateProposal,
    [Path.updateProposal]: EditPendingProposal,
    [Path.donors]: Donors,
    [Path.donorContacts]: DonorContact,
    [Path.participants]: Participants,
    [Path.createParticipant]: CreateParticipant,
    [Path.planParticipant]: CreateParticipant,
    [Path.implementParticipant]: CreateParticipant,
    [Path.updateParticipant]: UpdateParticipant,
    [Path.eventCalendar]: EventPlan,
    [Path.participantAnalysis]: ParticipantAnalysis,
    [Path.programmes]: KeyProgrammes,
    [Path.groups]: TargetGroups,
    [Path.regions]: Regions,
    [Path.activityPlans]: ActivityPlans,
    [Path.activityReport]: ActivityReport,
    [Path.activities]: Activities,
    [Path.agenda]: Agenda,
    [Path.updatePendingAgenda]: Agenda,
    [Path.narrativeReport]: Narrative,
    [Path.updatePendingReport]: Narrative
});

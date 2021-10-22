// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {withRouter} from 'react-router-dom';

import {getTeams} from 'mattermost-redux/actions/teams';

import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {
    getCurrentTeamId,
    getJoinableTeamIds,
    getMyTeams,
    getTeamMemberships,
} from 'mattermost-redux/selectors/entities/teams';
import {get, isCollapsedThreadsEnabled} from 'mattermost-redux/selectors/entities/preferences';

import {ClientConfig} from 'mattermost-redux/types/config';

import {GenericAction} from 'mattermost-redux/types/actions';

import {getCurrentLocale} from 'selectors/i18n';
import {getIsLhsOpen} from 'selectors/lhs';
import {switchTeam, updateTeamsOrderForUser} from 'actions/team_actions.jsx';
import {Preferences} from 'utils/constants.jsx';
import {GlobalState} from 'types/store';

import {getThreadCounts} from 'mattermost-redux/selectors/entities/threads';

import TeamSidebar, {Props} from './team_sidebar';
import {getCurrentProductId} from '../../utils/products';

function mapStateToProps(state: GlobalState, props: any) {
    const config: Partial<ClientConfig> = getConfig(state);

    const experimentalPrimaryTeam: string | undefined = config.ExperimentalPrimaryTeam;
    const joinableTeams: string[] = getJoinableTeamIds(state);
    const moreTeamsToJoin: boolean = joinableTeams && joinableTeams.length > 0;
    const products = state.plugins.components.Product;

    console.log(props);

    const currentProductID = getCurrentProductId(products, props.location);
    const currentProduct = products?.find((product) => product.id === currentProductID);

    console.log(currentProduct);
    console.log(currentProduct?.getCurrentTeam);

    let teamIdByProduct = null;
    if (currentProduct && currentProduct.getCurrentTeam && currentProduct.getCurrentTeam()) {
        teamIdByProduct = currentProduct.getCurrentTeam()();
    }

    return {
        currentTeamId: getCurrentTeamId(state),
        myTeams: getMyTeams(state),
        myTeamMembers: getTeamMemberships(state),
        isOpen: getIsLhsOpen(state),
        collapsedThreads: isCollapsedThreadsEnabled(state),
        experimentalPrimaryTeam,
        locale: getCurrentLocale(state),
        moreTeamsToJoin,
        userTeamsOrderPreference: get(state, Preferences.TEAMS_ORDER, '', ''),
        threadCounts: getThreadCounts(state),
        products,
        teamIdByProduct,
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            getTeams,
            switchTeam,
            updateTeamsOrderForUser,
        }, dispatch),
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamSidebar));

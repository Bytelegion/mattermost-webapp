// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

import {getChannel} from 'mattermost-redux/selectors/entities/channels';
import {makeGetReactionsForPost} from 'mattermost-redux/selectors/entities/posts';
import {canAddReactions} from 'mattermost-redux/selectors/entities/reactions';

import {GenericAction} from 'mattermost-redux/types/actions';
import {Post} from 'mattermost-redux/types/posts';
import {Reaction} from 'mattermost-redux/types/reactions';
import {GlobalState} from 'mattermost-redux/types/store';

import {addReaction} from 'actions/post_actions.jsx';

import ReactionList from './reaction_list';

type Props = {
    enableEmojiPicker: boolean;
    isReadOnly: boolean;
    post: Post;
    reactions: { [x: string]: Reaction } | undefined | null;
};

function makeMapStateToProps() {
    const getReactionsForPost = makeGetReactionsForPost();

    return function mapStateToProps(state: GlobalState, ownProps: Props) {
        const channelId = ownProps.post.channel_id;

        const channel = getChannel(state, channelId);
        const teamId = channel?.team_id ?? '';

        return {
            teamId,
            reactions: getReactionsForPost(state, ownProps.post.id),
            canAddReactions: canAddReactions(state, channelId),
        };
    };
}

function mapDispatchToProps(dispatch: Dispatch<GenericAction>) {
    return {
        actions: bindActionCreators({
            addReaction,
        }, dispatch),
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(ReactionList);

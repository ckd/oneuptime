import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RenderIfAdmin from '../basic/RenderIfAdmin';
import RenderIfOwner from '../basic/RenderIfOwner';
import RenderIfMember from '../basic/RenderIfMember';
import RenderIfViewer from '../basic/RenderIfViewer';

export default class RenderBasedOnRole extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        const {
            visibleForOwner,
            visibleForAdmin,
            visibleForViewer,
            visibleForMember,
            visibleForAll,
            children
        } = this.props;

        if(visibleForAll){
            return children; 
        }

        if (visibleForAdmin) {
            return <RenderIfAdmin>{children}</RenderIfAdmin>;
        }

        if (visibleForViewer) {
            return <RenderIfViewer>{children}</RenderIfViewer>;
        }

        if (visibleForMember) {
            return <RenderIfMember>{children}</RenderIfMember>;
        }

        if (visibleForOwner) {
            return <RenderIfOwner>{children}</RenderIfOwner>;
        }
    }
}

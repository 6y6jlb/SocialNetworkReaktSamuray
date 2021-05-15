import React, {Component} from 'react';
import {NavigationBar} from "./NavigationBar";
import {connect} from "react-redux";
import {FriendIconsFromNAvBArType, NavLinkBarFromNAvBArType} from "../../../Redux/navBarReducer";
import {AppStateType} from "../../../Redux/reduxStore";
import {Dispatch} from "redux";


type MapStateToPropsType = {
    friendsIcons:Array<FriendIconsFromNAvBArType>
    navLinkBar: Array<NavLinkBarFromNAvBArType>
    profileName:string|null
}
type MapDispatchToProps = {}
type NavigationBarAPIContainerPropsType = MapStateToPropsType&MapDispatchToProps




class NavigationBarAPIContainer extends Component<NavigationBarAPIContainerPropsType> {
    render() {
        return <NavigationBar navLinkBar={this.props.navLinkBar} friendsIcons={this.props.friendsIcons} profileName={this.props.profileName}/>
    }
}



let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        navLinkBar: state.navBarReducer.navLinkBar,
        friendsIcons: state.navBarReducer.friendsIcons,
        profileName:state.auth.data.login
    }
}
let mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
    return {}
}

const NavigationBarContainer = connect ( mapStateToProps, mapDispatchToProps ) ( NavigationBarAPIContainer )
export default NavigationBarContainer;

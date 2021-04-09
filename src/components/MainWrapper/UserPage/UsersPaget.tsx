import React from "react";
import style from './UserPage.module.css'
import Preloader from "../../common/preloader/Preloader";
import {UserType} from "../../../Redux/usersReducer";


type UsersPagePropsType = {
    emptyPhoto: string
    users: UserType[]
    totalCount: number,
    pageSize: number
    currentPage: number,
    isFetching: boolean
    followCallBack: (id: number) => void
    unFollowCallBack: (id: number) => void
    setUsers: (users: UserType[]) => void
    changeCurrentPage: (currentPage: number) => void
    changeTotalCount: (currentPage: number) => void
    changeIsFetching: (isFetching: boolean) => void
    onPageChanged: (pageNumber: number) => void

}

const Users: React.FC<UsersPagePropsType> = (props) => {

    const {
        users,
        totalCount,
        pageSize,
        isFetching,
        followCallBack,
        unFollowCallBack,
        onPageChanged,
        emptyPhoto
    } = props;


    const pagesCount = Math.ceil ( totalCount / pageSize ) // pages:number
    let pages: number[] = [];
    for (let i = 1; i < pagesCount + 1; i++) {
        pages = [...pages, i]
    }

    const mappedUsers = users.map ( user => {
        return (
            <div className={ style.user } key={ user.id }>
                <div className={ style.photoZone }>
                    <img src={ user.photos.small || emptyPhoto } alt={ "еблет" }/>
                    { user.followed
                        ? <span className={ style.followed }
                                onClick={ () => unFollowCallBack ( user.id ) }>друх</span>
                        : <span className={ style.followed }
                                onClick={ () => followCallBack ( user.id ) }>не друх</span> }
                </div>
                <div className={ style.description }>
                    <div className={ style.info }>
                        <div className={ style.userStatus }>{ user.status || 'Человечный человек' }</div>
                        <div className={ style.name }>{ user.name }</div>
                    </div>
                    <div className={ style.location }>
                        <span className={ style.country }>"user.location.country"</span>
                        <span className={ style.city }>"user.location.city"</span></div>
                </div>
            </div>
        )
    } ) //users items mapped for page

    const mappedPages = pages.map ( p => <span onClick={ () => onPageChanged ( p ) }
                                               className={ props.currentPage === p ? style.activeNumber : style.normalNumber }>{ p }</span>
    )

    return (
        <>{ isFetching ?
            <Preloader/>
            : <div className={ style.usersFrame }>
                <div className={ style.pages }>{ mappedPages }</div>
                { mappedUsers }
            </div> }
        </>
    );
}
export default Users;
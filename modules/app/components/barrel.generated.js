
import AppContainer from './App/AppContainer';
import {
    LeftPanel
} from './App/LeftPanel/LeftPanel';
import {
    Menu
} from './App/LeftPanel/Menu/Menu';
import ManageUsersContainer from './App/ManageUsers/ManageUsersContainer';
import {
    UsersFilters
} from './App/ManageUsers/UsersFilters/UsersFilters';
import {
    UsersGrid
} from './App/ManageUsers/UsersGrid/UsersGrid';

export {
    AppContainer as App,
    LeftPanel,
    Menu,
    ManageUsersContainer as ManageUsers,
    UsersFilters,
    UsersGrid,

};
export const components = {
    App: AppContainer,
    LeftPanel,
    Menu,
    ManageUsers: ManageUsersContainer,
    UsersFilters,
    UsersGrid,

};
